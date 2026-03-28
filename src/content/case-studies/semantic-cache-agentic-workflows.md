> **Focus:** Intelligent semantic caching for a multi-agent B2B analytics platform — cost, latency, and correctness.

## The challenge

A B2B analytics platform needed to make AI-assisted data exploration affordable and responsive. Users asked natural language questions — e.g. “Why did Q3 revenue drop?” — and the system routed these to specialized AI agents: SQL generators, document analysts, chart creators, and presentation builders.

**The problem:** Every question triggered multiple AI model calls. Costs scaled linearly with usage. Response times stretched to 8–10 seconds. At ~400 user sessions daily, the economics were unsustainable for a growing SaaS product.

**Role:** Lead architect for agent orchestration and intelligent caching infrastructure.

## The solution

Built a **three-tier semantic caching system** that understood *meaning*, not just text matching. The architecture treats cache as a core system component — designed for invalidation, optimized for cost, and transparent to users.

### System architecture

![High-level system architecture for an AI-driven multi-agent chat and analytics platform](semantic-cache-agentic-workflows.png)

### The three tiers

| Tier | Purpose | Speed | Intelligence |
|------|---------|-------|--------------|
| **L1** | Exact matches with context awareness | &lt;1 ms | Literal match on normalized query + user permissions |
| **L2** | Semantic similarity for paraphrases | ~80 ms | Vector embedding comparison (cosine similarity ≥ 0.88) |
| **L3** | Cold artifact storage | Minutes | Batch analytics and model training data |

**Key insight:** Most enterprise users ask variations of the same core questions. “Q3 revenue,” “third quarter sales,” and “how did we do in Q3” are semantically similar but lexically different. **L2** catches these without expensive model calls.

## Agent orchestration and contracts

Standardized how agents communicate using the **Agent2Agent (A2A)** protocol — an emerging pattern for autonomous agent interoperability.

**Agent cards:** Each agent publishes a capability manifest describing inputs, outputs, estimated cost, and execution time. The chat manager uses this to route intelligently.

**Streaming workflows:** Long-running tasks like presentation generation stream progress updates — e.g. “Analyzing data… Generating slide 3 of 8…” instead of a long silent spinner.

**State management:** Implemented **LangGraph-style** state machines where agent execution is a graph of nodes — classification, cache check, tool use, synthesis — rather than only imperative code. That enables observability, replay, and graceful failure recovery.

## Cache invalidation

Database changes must invalidate cache immediately; stale analytics answers are unacceptable.

**Approach:** Event-driven architecture using **change data capture (CDC)**.

Database write-ahead logs stream changes through **Kafka** to cache workers. Each cached query is tagged with its source tables. When the `orders` table updates, only `orders`-related cache entries flush — **targeted** invalidation, not blanket clearing.

**Graceful degradation:** If the invalidation pipeline lags, the system temporarily narrows to **exact-match (L1) cache only**, avoiding stale semantic matches. Users may see slightly slower responses, not incorrect data.

## Results

| Metric | Before | After |
|--------|--------|-------|
| **Average response time** | 8.5 s | 1.2 s |
| **Typical cached response** | — | ~85 ms |
| **AI model costs** | 100% baseline | ~27% of baseline |
| **Cache hit rate** | 0% | ~80% of queries |
| **Infrastructure (cache layer)** | — | ~$200/month |

**Business impact:** The caching layer pays for itself in roughly **48 hours** of operation at the modeled load. Sub-second responses for routine questions improved engagement — longer sessions, deeper exploration, higher feature adoption.

## Technical philosophy

- **Cache as architecture, not optimization** — Dependency tracking, multi-tenant isolation, and observability designed in upfront, not bolted on later.
- **Semantic over lexical** — Meaning-based matching reflects user intent better than raw string comparison; embedding cost is mitigated by the **L1** fast path.
- **Protocol-driven agents** — A2A-style contracts support swapping implementations, multi-vendor models, and future autonomous workflows without a full rewrite.
- **Cost engineering** — Caching intermediate artifacts (query outlines, chart configs) compounds savings across the agent pipeline.

## Technologies

Python · FastAPI · Redis (vector and key-value) · Apache Kafka · Debezium (CDC) · LangGraph-style workflows · A2A protocol · ONNX Runtime (local embeddings) · S3 · Kubernetes · Terraform

## Applicable to

- **SaaS platforms** with repetitive AI queries (analytics, support, legal research)
- **Multi-agent systems** that need cost control and latency guarantees
- **Regulated environments** where audit trails and consistency matter — invalidation as a compliance feature
