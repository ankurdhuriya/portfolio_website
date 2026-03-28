import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { workProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const SelectedWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      // Card animations
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const image = card.querySelector('.card-image');
        const text = card.querySelector('.card-text');
        const rule = card.querySelector('.card-rule');

        gsap.fromTo(
          image,
          { x: card.classList.contains('even') ? '8vw' : '-8vw', opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          text,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: 'top 65%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-flowing bg-dark py-20 lg:py-32 z-40"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Selected Work
          </h2>
          <p className="text-base text-text-secondary max-w-xl mx-auto">
            A few systems I've designed, built, and shipped—with metrics that
            matter.
          </p>
        </div>

        {/* Project cards */}
        <div className="space-y-16 lg:space-y-24">
          {workProjects.map((project, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`flex flex-col ${
                index % 2 === 1 ? 'lg:flex-row-reverse even' : 'lg:flex-row'
              } items-center gap-8 lg:gap-12 max-w-5xl mx-auto`}
            >
              {/* Image */}
              <div className="card-image w-full lg:w-[45%] aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text */}
              <div className="card-text w-full lg:w-[55%] flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="font-mono text-xs text-text-secondary tracking-wider uppercase px-3 py-1 border border-[rgba(244,246,250,0.14)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-heading text-xl lg:text-2xl font-bold text-text-primary mb-3 group">
                  <span className="relative">
                    {project.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-lime transition-all duration-300 group-hover:w-full" />
                  </span>
                </h3>

                <p className="text-base text-text-secondary leading-relaxed mb-4">
                  {project.description}
                </p>

                {project.slug ? (
                  <Link
                    to={`/work/${project.slug}`}
                    className="self-start flex items-center gap-2 text-sm text-lime hover:text-lime-dark transition-colors group"
                  >
                    View case study
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      aria-hidden
                    />
                  </Link>
                ) : (
                  <span className="self-start text-sm text-text-secondary/70 cursor-default">
                    Case study soon
                  </span>
                )}

                <div className="card-rule h-px w-full bg-[rgba(244,246,250,0.14)] mt-6 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
