import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type MediumArticle = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  description?: string;
  author?: string;
};

const MEDIUM_RSS_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ankurdhuriya';

const MediumCard = ({ article }: { article: MediumArticle }) => {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-[rgba(244,246,250,0.14)] bg-dark-light/50 hover:border-lime/30 transition-colors overflow-hidden"
    >
      {article.thumbnail && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5 lg:p-6">
        <p className="font-mono text-xs text-text-secondary tracking-wider uppercase mb-2">
          {new Date(article.pubDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-lime transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-sm text-text-secondary line-clamp-2 mb-4">
            {article.description.replace(/<[^>]*>/g, '').slice(0, 120)}…
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-sm text-lime group-hover:gap-3 transition-all">
          Read more
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </span>
      </div>
    </a>
  );
};

const Blogs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(MEDIUM_RSS_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok' && Array.isArray(data.items)) {
          setArticles(data.items);
        } else {
          setError('Could not load articles.');
        }
      })
      .catch(() => setError('Failed to fetch Medium articles.'))
      .finally(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 65%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        introRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 82%',
            end: 'top 62%',
            scrub: 0.5,
          },
        }
      );

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      });

      gsap.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            end: 'top 65%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [articles]);

  return (
    <section
      ref={sectionRef}
      id="blogs"
      className="section-flowing bg-dark py-20 lg:py-32 z-[45]"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        <div ref={headerRef} className="mb-10 lg:mb-12">
          <span className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4 block">
            Blog
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            Writing on Medium
          </h2>
        </div>

        <div ref={introRef}>
          <p className="text-text-secondary max-w-2xl mb-8 lg:mb-10">
            I write about AI/ML, data science, and software engineering. Read
            articles and tutorials on Medium.
          </p>

          {loading && (
            <p className="text-text-secondary mb-8">Loading articles…</p>
          )}
          {error && (
            <p className="text-text-secondary mb-8">{error}</p>
          )}
        </div>

        {!loading && !error && articles.length > 0 && (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-14"
          >
            {articles.map((article, index) => (
              <div
                key={`${article.link}-${index}`}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
              >
                <MediumCard article={article} />
              </div>
            ))}
          </div>
        )}

        <a
          ref={ctaRef}
          href="https://medium.com/@ankurdhuriya"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 group font-heading font-bold text-lime hover:text-lime/90 transition-colors"
        >
          View my Medium profile
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
      </div>
    </section>
  );
};

export default Blogs;
