import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Principles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          headlineRef.current,
          { y: '12vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          bodyRef.current,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.16
        )
        .fromTo(
          ctaRef.current,
          { y: '4vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.2
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          headlineRef.current,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [bodyRef.current, ctaRef.current],
          { opacity: 1 },
          { opacity: 0.2, ease: 'power2.in' },
          0.75
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark flex items-center justify-center z-[80]"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(182,255,46,0.04), transparent 60%)',
        }}
      />

      <div className="w-full px-6 lg:px-[8vw] py-20 flex flex-col items-center text-center relative z-10">
        <h2
          ref={headlineRef}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight mb-6 max-w-4xl"
        >
          Start with the real problem.
        </h2>

        <p
          ref={bodyRef}
          className="text-base lg:text-lg text-text-secondary max-w-2xl mb-10"
        >
          I ship systems that are measurable, maintainable, and human-centered.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="group px-6 py-3 bg-lime text-dark font-heading font-bold text-sm flex items-center gap-2 hover:bg-lime-dark transition-colors"
          >
            Request a consultation
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <a
            href="mailto:mail.ankurdhuriya@gmail.com"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <Mail size={16} />
            Email me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Principles;
