> **Focus:** Intelligent Document Processing (IDP) for enterprise procurement

Built and deployed a production-grade **retrieval-augmented generation (RAG)** system for intelligent document processing across procurement workflows. The solution processes **450,000+ annual invoices** across **40+ countries and 12 languages**, enabling real-time spend analytics, automated 3-way matching, and duplicate payment detection through natural language queries. Achieved an **81% reduction in processing time** and **$1.9M annual cost avoidance** through precision line-item reconciliation.

## The challenge

A global manufacturing enterprise with **$12B+ annual procurement spend** faced critical inefficiencies in accounts payable operations:

| Pain point | Business impact |
|------------|-----------------|
| **Manual 3-way matching** | 12 minutes per invoice; 450K invoices ≈ 90,000 hours/year |
| **Fragmented data silos** | Invoices in SAP, POs in Oracle, contracts in SharePoint — no unified query layer |
| **Multi-language complexity** | 15,000+ unique invoice templates across 12 languages (EN, DE, FR, ES, CN, JP, etc.) |
| **Duplicate payment leakage** | $2.3M annually due to re-submissions across regional AP centers |
| **Spend visibility lag** | 3-week manual aggregation for variance analysis; decisions on stale data |

**Core technical problem:** Traditional OCR plus rule-based extraction failed on semi-structured documents, could not handle semantic relationships across document types (invoice ↔ PO ↔ contract), and offered no natural language interface for business users.

## Solution architecture

### 1. Document ingestion and intelligent extraction

**Technology stack**

- **Azure Document Intelligence** (custom-trained models)
- **AWS Textract** (backup for handwritten annotations)
- **LayoutLMv3** (few-shot learning on novel templates)

**Implementation**

```text
Document ingestion pipeline:
├─ Email/PDF/EDI/XML ingestion (15,000+ template variants)
├─ Pre-processing: deskewing, noise reduction, rotation correction
├─ Custom model inference (94.5% field-level accuracy)
│   ├─ Vendor identification (fuzzy matching against 85K master records)
│   ├─ Line-item extraction (SKU, quantity, unit price, tax codes)
│   ├─ PO reference linking (handling partial/missing references)
│   └─ Confidence scoring per field
└─ Human-in-the-loop queue for <0.85 confidence documents
```

**Key innovation:** Few-shot template adaptation using **LayoutLMv3** with 5–10 examples per new vendor format, reducing onboarding time from ~2 weeks to ~4 hours.

### 2. Semantic chunking and cross-lingual embeddings

**Design goal:** Semantic search across languages **without translation** (avoiding latency, cost, and error propagation).

**Chunking strategy**

| Document type | Chunking logic | Metadata tags |
|---------------|----------------|---------------|
| **Invoices** | Header (vendor, date, total) + line items (individual embeddings) + footer (payment terms) | Country, BU, category, fiscal year, risk score |
| **Purchase orders** | Header + line items + amendment history | PO status, buyer, project code |
| **Contracts** | Clause-level chunks (pricing, SLAs, liability, termination) | Contract type, effective date, spend threshold |
| **Vendor master** | Profile snapshots + performance scorecards | Tier, category, risk rating |

**Embedding architecture**

- **Model:** `multilingual-e5-large` (1024-dim, Microsoft)
- **Domain adaptation:** Fine-tuned on ~200,000 procurement-specific text pairs (vendor names, material codes, Incoterms)
- **Cross-lingual behavior:** e.g. German “Rechnungsnummer” and English “Invoice number” map into a shared vector space
- **Storage:** Azure AI Search (hybrid dense + sparse indexing)

```text
Embedding pipeline:
Raw text → subword tokenization (XLM-R) →
domain-adapted E5 encoder →
L2 normalization →
3072-dim vector (OpenAI) or 1024-dim (E5) →
Azure AI Search index with metadata filtering
```

**Performance:** ~94.2% cross-lingual retrieval accuracy vs. ~87% with translate-then-embed.

### 3. Hybrid retrieval

**Approach:** Dense vector retrieval + BM25 sparse retrieval with **reciprocal rank fusion (RRF)**.

```text
Query processing flow:
User NLQ → intent classifier (DistilBERT) →
query expansion (synonym injection for procurement terms) →
parallel retrieval:
  ├─ Dense: top-K semantic similarity (multilingual-e5)
  ├─ Sparse: BM25 on SKU codes, PO numbers, vendor IDs
  └─ Metadata pre-filter (e.g. country, year, category)
→ RRF re-ranking (k=60) →
cross-encoder re-ranking (ms-marco-MiniLM, top-10) →
context assembly (max 8K tokens) →
LLM generation
```

**Multi-hop retrieval (examples)**

- **Variance analysis:** PO → contract (pricing) → historical invoices (benchmarks) → current invoice (line comparison)
- **Duplicate detection:** Same vendor + amount + date ±3 days across indices

### 4. LLM orchestration and natural language interface

**Model:** GPT-4 Turbo (128K context) via **Azure OpenAI Service**.

**Safety architecture**

```text
Deterministic layer (financial calculations):
├─ Variance %: (invoice amount − PO amount) / PO amount
├─ Duplicate scoring: fuzzy match on vendor + amount + date
└─ Compliance: unit price vs. contracted price

LLM layer (natural language):
├─ Explanation of variance drivers
├─ Sourcing recommendations from contract terms
└─ Narrative summary for stakeholders
```

**Prompting**

- **System:** Procurement analyst assistant; answers strictly from retrieved documents; cite document IDs; show work for calculations.
- **Few-shot:** ~10 curated spend queries with chain-of-thought patterns.
- **Output:** Structured JSON with `answer`, `sources`, `confidence_score`, `calculation_steps`.

**Example NLQ patterns**

| Query type | Example | Implementation sketch |
|------------|---------|-------------------------|
| **Spend analytics** | “Q3 2024 spend with strategic vendor Acme for machined parts >$50K” | Metadata filters + aggregation |
| **Variance analysis** | “Invoices exceeding PO value by >10% in packaging last month” | PO → invoice match → variance filter |
| **Duplicate detection** | “Potential duplicate payments for vendor XYZ around March 15, 2024” | Fuzzy clustering on vendor fingerprint, amount, date window |
| **Contract compliance** | “Which office supply invoices violated contracted unit price of $45/case?” | Contract clause → line items → flag violations |

### 5. SME collaboration and continuous optimization

**Three-tier validation**

1. **AP operations SMEs** — Processing accuracy (credit/debit memos, partial receipts, consignment); targets such as 99.5% on amounts, 100% vendor match; weekly rating of 500+ LLM responses; low-confidence outputs fed into improvement loops.
2. **Category management SMEs** — Taxonomy / UNSPSC alignment, chunking validation, spend-cube integrity vs. financial reporting.
3. **Finance / compliance SMEs** — Variance thresholds by category, duplicate rules, audit trails and citation chains.

**Examples of tuning**

- Chunk overlap increased from 20% → 30% for context continuity
- Explicit chain-of-thought for variance math after ambiguous explanations
- Re-ranking boosts for contract clauses on compliance queries

## Technical challenges and solutions

### Multi-language invoice complexity

- **Problem:** 15,000+ templates with mixed languages (e.g. English headers, German lines, Chinese bank details).
- **Solution:** Native multilingual embeddings (`multilingual-e5-large`) with subword tokenization; language-agnostic retrieval; query-language-specific prompt templates.
- **Result:** ~94.2% accuracy across languages; no translation latency or cost.

### Line-level reconciliation hallucination

- **Problem:** LLM mis-matching invoice lines to PO lines under partial delivery.
- **Solution:** Deterministic fuzzy matching (SKU + quantity ±5%) as pre-filter; RAG limited to **exception explanations** with strict citations.
- **Result:** ~99.5% line-item reconciliation accuracy; hallucination rate &lt;0.3%.

### Temporal contract reasoning

- **Problem:** Master agreements and amendments (“pricing valid until Q2 unless volume exceeds 10K units”).
- **Solution:** Temporal metadata (`effective_date`, `expiration_date`, `amendment_sequence`); retrieval filtered by query date context; explicit temporal bounds in prompts.
- **Result:** Consistent use of **active** contract terms; reduced retroactive pricing errors.

### Scale and latency

- **Problem:** ~2.3M historical documents, 450K new/year, P95 query latency target &lt;1s.
- **Solution:** Azure AI Search partitioning by fiscal year and geography; caching for frequent queries; async embedding for new documents.
- **Result:** P95 ~780ms; ingestion ~1,200 documents/minute.

## Business outcomes

| Metric | Baseline | After | Improvement |
|--------|----------|--------|-------------|
| **3-way match time** | 12 min/invoice | 2.3 min/invoice | **~81% reduction** |
| **Manual review rate** | 35% | 8% | **~77% reduction** |
| **Duplicate leakage** | $2.3M/year | $0.4M (caught pre-payment) | **~$1.9M avoidance** |
| **Spend query response** | ~3 weeks | &lt;30 seconds (NLQ) | **Near real-time** |
| **Variance detection** | Monthly | Daily alerts | **~30× faster** |
| **AP cycle time** | 14.2 days | 6.8 days | **~52% reduction** |
| **Adoption** | — | 2,400+ MAU | ~89% of target base |

**Qualitative impact:** Self-service spend visibility for procurement managers; AP analysts focused on exceptions and vendors; stronger audit posture via provenance (query → retrieval → answer → feedback).

## Architecture diagram

![Layered architecture for multilingual IDP procurement: UI, orchestration, hybrid RAG retrieval, Azure OpenAI generation, and data/embedding sources](idp-procurement.png)

## Technology stack summary

| Layer | Technologies | Purpose |
|-------|--------------|---------|
| **Cloud** | Microsoft Azure (+ selective AWS) | Primary infra and redundancy |
| **OCR / IDP** | Azure Document Intelligence, LayoutLMv3 | Extraction + few-shot adaptation |
| **Embeddings** | `multilingual-e5-large` (fine-tuned) | Cross-lingual semantics |
| **Vector / search** | Azure AI Search | Hybrid dense + sparse at scale |
| **LLM** | GPT-4 Turbo (Azure OpenAI) | Generation with guardrails |
| **Orchestration** | Python, FastAPI, Azure Functions | APIs and pipelines |
| **Frontend** | React, TypeScript | Chat and analytics UI |
| **MLOps** | Azure ML, MLflow | Versioning, experiments, feedback |

## Key learnings

1. **Translation is often an anti-pattern** — Native multilingual embeddings (E5, BGE-M3-class models) can beat translate-then-embed on speed, cost, and accuracy for procurement documents.
2. **Hybrid architecture for financial data** — Deterministic math + LLM explanations reduces hallucination on critical metrics.
3. **SME feedback loops** — Weekly expert ratings on hundreds of responses create a continuous improvement flywheel; low-confidence outputs become training signal.
4. **Metadata-first design** — Rich tags at index time enable fast filtered retrieval at scale.
5. **Chunking is product design** — Header / line-item / footer separation was co-designed with AP SMEs to match operational mental models.

## Roadmap

- **Multi-modal:** Image regions (charts, handwriting) via CLIP-style embeddings for visual reasoning.
- **Agentic workflows:** PO amendment suggestions grounded in contracts and spend patterns.
- **Federated RAG:** Supplier-side documents (insurance certs, sustainability reports) for ESG and compliance.

---

**Role:** Lead AI Engineer — architecture, RAG pipeline, SME collaboration, production deployment, and performance optimization.

*Production-scale implementation: ~$12B+ annual procurement spend, high reconciliation accuracy targets, sub-second query latency across 12 languages.*
