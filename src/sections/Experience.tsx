import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Timeline line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 0.5,
          },
        }
      );

      // Role items animation
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.role-content');

        gsap.fromTo(
          content,
          { x: '-6vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              end: 'top 55%',
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      title: 'Senior Data Scientist',
      company: 'Thoughtworks',
      location: 'Gurugram, India',
      period: 'Jul 2025 – Present',
      description:
        'Engineered semantic caching layer in NLQ chatbot using LangChain, Redis, and OpenAI embeddings. Achieved 65% cache hit rate, slashing LLM inference costs by 50% and response latency from 6s to 100ms.',
    },
    {
      title: 'Senior Data Scientist',
      company: 'GEP',
      location: 'Hyderabad, India',
      period: 'Dec 2024 – Jul 2025',
      description:
        'Built a RAG-based invoice intelligence solution integrating OCR/IDP, semantic chunking, and embedding-powered retrieval. Exposed insights via NLQ chatbot for spend analytics and compliance queries.',
    },
    {
      title: 'Data Scientist',
      company: 'Builder.ai',
      location: 'Gurugram, India',
      period: 'Dec 2022 – Dec 2024',
      description:
        'Developed LLM applications with RAG and Azure OpenAI, integrated guardrails for secure QA on call transcriptions. Built Agentic LLM framework for code development task decomposition.',
    },
    {
      title: 'Data Scientist',
      company: 'Thoughtworks',
      location: 'Pune, India',
      period: 'Sep 2020 – Dec 2022',
      description:
        'Delivered Automatic Speech Recognition across 18 Indian languages, outperforming major cloud STT services. Built efficient TTS solution in 8 Indian languages using publicly available data.',
    },
    {
      title: 'Data Science Intern',
      company: 'ThoughtWorks',
      location: 'Gurugram, India',
      period: 'Feb 2020 – Aug 2020',
      description:
        'Implemented robust speech-based gender classification (SVM, 98% accuracy) and voice clustering models for internal AI research.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-flowing bg-dark-light py-20 lg:py-32 z-50"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <span className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4 block">
            Experience
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
            Where I've shipped
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-[7px] lg:left-[11px] top-0 w-px h-full bg-[rgba(244,246,250,0.14)] origin-top"
          />

          {/* Roles */}
          <div className="space-y-10 lg:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="relative pl-8 lg:pl-14"
              >
                {/* Dot */}
                <div className="timeline-dot absolute left-0 top-1 w-3.5 h-3.5 lg:w-5 lg:h-5 rounded-full bg-lime border-4 border-dark-light" />

                {/* Content */}
                <div className="role-content">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-2">
                    <h3 className="font-heading text-lg lg:text-xl font-bold text-text-primary">
                      {exp.title}
                      <span className="text-text-secondary font-normal">
                        {' '}
                        — {exp.company}
                      </span>
                    </h3>
                    <span className="font-mono text-xs text-text-secondary tracking-wider">
                      {exp.period}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-text-secondary tracking-wider mb-3 block">
                    {exp.location}
                  </span>

                  <p className="text-sm lg:text-base text-text-secondary leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
