import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, BookOpen, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.1
      )
        .fromTo(
          subheadlineRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.35
        )
        .fromTo(
          ctaRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.45
        )
        .fromTo(
          metaRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.55
        )
        .fromTo(
          portraitRef.current,
          { x: '10vw', scale: 0.98, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, duration: 0.7 },
          0.25
        )
        .fromTo(
          ruleRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, transformOrigin: 'top' },
          0.4
        )
        .fromTo(
          socialRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, metaRef.current, portraitRef.current, ruleRef.current, socialRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scaleY: 1,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          portraitRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          ruleRef.current,
          { scaleY: 1, opacity: 1 },
          { scaleY: 0, opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [subheadlineRef.current, ctaRef.current],
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0.2, ease: 'power2.in' },
          0.75
        )
        .fromTo(
          metaRef.current,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0.2, ease: 'power2.in' },
          0.8
        )
        .fromTo(
          socialRef.current,
          { y: 0, opacity: 1 },
          { y: '4vh', opacity: 0.2, ease: 'power2.in' },
          0.8
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark flex items-center justify-center z-10"
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 28% 45%, rgba(182,255,46,0.05), transparent 55%)',
        }}
      />

      <div className="w-full h-full px-6 lg:px-[8vw] py-20 flex flex-col lg:flex-row items-center justify-between relative">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center z-10 max-w-3xl">
          <h1
            ref={headlineRef}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-[0.95] tracking-tight mb-6 lg:mb-8"
          >
            Building intelligent systems that speak, reason, and scale.
          </h1>

          <p
            ref={subheadlineRef}
            className="text-base lg:text-lg text-text-secondary max-w-xl mb-6 lg:mb-8 leading-relaxed"
          >
            AI/ML engineer focused on Generative AI, NLP, and production-grade
            speech systems.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-8 lg:mb-12">
            <button
              onClick={scrollToWork}
              className="group px-6 py-3 bg-lime text-dark font-heading font-bold text-sm flex items-center gap-2 hover:bg-lime-dark transition-colors"
            >
              Explore my work
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <a
              href="https://drive.google.com/file/d/1-ERswC6aIPuPd940_AML_4t0aqqcrvxa/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary flex items-center gap-2 transition-colors"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          <p
            ref={metaRef}
            className="font-mono text-xs text-text-secondary tracking-widest uppercase"
          >
            Based in India — Available for Contract & Full-Time
          </p>
        </div>

        {/* Vertical rule */}
        <div
          ref={ruleRef}
          className="hidden lg:block absolute left-[58%] top-[14vh] w-px h-[72vh] bg-[rgba(244,246,250,0.14)]"
        />

        {/* Right portrait */}
        <div
          ref={portraitRef}
          className="hidden lg:block relative mt-8 lg:mt-0"
          style={{
            width: '34vw',
            maxWidth: '520px',
            height: '42vh',
            maxHeight: '420px',
          }}
        >
          <img
            src="/profile.jpg"
            alt="Ankur Dhuriya"
            className="w-full h-full object-contain shadow-portrait"
          />
        </div>

        {/* Social links */}
        <div
          ref={socialRef}
          className="absolute bottom-8 left-6 lg:left-[8vw] flex items-center gap-6"
        >
          <a
            href="https://github.com/ankurdhuriya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-lime transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/ankur-dhuriya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-lime transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://medium.com/@ankurdhuriya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-lime transition-colors"
            aria-label="Medium"
          >
            <BookOpen size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
