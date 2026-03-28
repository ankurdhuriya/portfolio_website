import { Navigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../sections/Navigation';
import { CaseStudyMarkdown } from '../components/CaseStudyMarkdown';
import { getWorkProjectBySlug } from '../data/projects';

function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getWorkProjectBySlug(slug) : undefined;

  if (!project?.slug) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen bg-dark text-text-primary">
      <div className="noise-overlay" />
      <Navigation />

      <main className="relative pt-28 pb-20 lg:pt-32 lg:pb-28 px-6 lg:px-[8vw]">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-lime transition-colors mb-10 lg:mb-14"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to selected work
        </Link>

        <article className="max-w-3xl lg:max-w-4xl">
          <p className="font-mono text-xs text-text-secondary tracking-wider uppercase mb-4">
            Case study
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-text-secondary tracking-wider uppercase px-3 py-1 border border-[rgba(244,246,250,0.14)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="aspect-video w-full overflow-hidden mb-10 lg:mb-12 border border-[rgba(244,246,250,0.08)]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {!project.caseStudyMarkdown ? (
            <p className="text-base text-text-secondary leading-relaxed">
              {project.description}
            </p>
          ) : (
            <CaseStudyMarkdown markdown={project.caseStudyMarkdown} />
          )}
        </article>
      </main>
    </div>
  );
}

export default CaseStudyPage;
