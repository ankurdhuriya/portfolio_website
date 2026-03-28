import multilingualInvoiceCaseStudy from '../content/case-studies/multilingual-invoice-intelligence-engine.md?raw';
import semanticCacheCaseStudy from '../content/case-studies/semantic-cache-agentic-workflows.md?raw';

export type WorkProject = {
  /** Present when a dedicated case study route exists */
  slug?: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
  /** Full case study body (Markdown); optional per project */
  caseStudyMarkdown?: string;
};

export const workProjects: WorkProject[] = [
  {
    slug: 'multilingual-invoice-intelligence-engine',
    title: 'Multilingual Invoice Intelligence Engine',
    tags: [
      'Intelligent Document Processing',
      'RAG',
      'Cross-Lingual NLP',
      'Azure AI',
      'Procurement Automation',
    ],
    description:
      'Production RAG for IDP across procurement: 450K+ invoices/year, 12 languages, NL spend analytics, 3-way matching, and duplicate detection. ~81% faster processing, ~$1.9M annual cost avoidance, sub-second hybrid retrieval at scale.',
    image: '/case-study-invoice.jpg',
    caseStudyMarkdown: multilingualInvoiceCaseStudy,
  },
  {
    slug: 'semantic-cache-agentic-workflows',
    title: 'Semantic Cache Architecture for Agent Workflows',
    tags: ['LangChain', 'RedisVL', 'A2A Protocol', 'Change Data Capture', 'LangGraph'],
    description:
      'Three-tier semantic cache (exact → vector → cold storage) for a multi-agent B2B analytics stack. CDC/Kafka invalidation, A2A agent cards, LangGraph-style orchestration. ~8.5s → ~1.2s average response, ~80% hit rate, model spend ~27% of baseline.',
    image: '/case-study-caching.jpg',
    caseStudyMarkdown: semanticCacheCaseStudy,
  },
  {
    title: 'Indic ASR at Scale',
    tags: ['Whisper', 'PyTorch', 'MLOps'],
    description:
      'Delivered 18-language STT outperforming cloud baselines. Built end-to-end speech recognition pipeline with production deployment.',
    image: '/case-study-asr.jpg',
  },
  {
    title: 'Agentic Code Assistant',
    tags: ['CrewAI', 'LangGraph', 'FastAPI'],
    description:
      'Decomposed complex tasks into verified subtasks for developers. Enhanced productivity with autonomous multi-agent AI systems.',
    image: '/case-study-agentic.jpg',
  },
];

export function getWorkProjectBySlug(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug);
}
