import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

function resolvePublicAssetUrl(src: string): string {
  if (src.startsWith('http') || src.startsWith('data:')) return src;
  const path = src.replace(/^\//, '');
  const base = import.meta.env.BASE_URL;
  // With base: './', `${base}${path}` is route-relative (e.g. on /work/slug it becomes
  // /work/foo.png). Public files live at site root, so use a path from the origin root.
  if (base.startsWith('/')) {
    const prefix = base === '/' ? '' : base.endsWith('/') ? base.slice(0, -1) : base;
    return `${prefix}/${path}`;
  }
  return `/${path}`;
}

const components: Components = {
  h2: ({ children }) => (
    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-14 mb-5 first:mt-0 scroll-mt-28 border-b border-[rgba(244,246,250,0.1)] pb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-text-primary mt-10 mb-3 scroll-mt-28">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-heading text-lg font-semibold text-text-primary mt-8 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-base text-text-secondary leading-relaxed my-4">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-text-secondary">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="my-4 pl-5 space-y-2 list-disc text-text-secondary marker:text-lime/80">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 pl-5 space-y-2 list-decimal text-text-secondary marker:text-lime/80">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-lime/70 pl-5 py-1 text-text-secondary italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-0 h-px bg-[rgba(244,246,250,0.14)]" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-lime hover:text-lime-dark underline underline-offset-2 transition-colors"
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => {
    if (!src) return null;
    return (
      <figure className="my-8">
        <img
          src={resolvePublicAssetUrl(src)}
          alt={alt ?? ''}
          className="w-full rounded-lg border border-[rgba(244,246,250,0.1)]"
          loading="lazy"
          decoding="async"
        />
      </figure>
    );
  },
  code: ({ className, children }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="font-mono text-[0.9em] text-lime bg-[rgba(182,255,46,0.08)] px-1.5 py-0.5 rounded-sm">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-6 p-4 lg:p-5 rounded-lg bg-dark-light border border-[rgba(244,246,250,0.1)] text-xs sm:text-sm text-text-secondary overflow-x-auto leading-relaxed font-mono">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-8 w-full overflow-x-auto rounded-lg border border-[rgba(244,246,250,0.12)]">
      <table className="w-full min-w-[32rem] text-sm text-left border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[rgba(244,246,250,0.06)] font-heading text-text-primary">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-[rgba(244,246,250,0.08)]">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold border-b border-[rgba(244,246,250,0.12)] align-top">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-text-secondary align-top">{children}</td>
  ),
};

type CaseStudyMarkdownProps = {
  markdown: string;
};

export function CaseStudyMarkdown({ markdown }: CaseStudyMarkdownProps) {
  return (
    <div className="case-study-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
