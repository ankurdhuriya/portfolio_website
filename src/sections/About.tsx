import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          portraitRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          labelRef.current,
          { y: '-6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          headlineRef.current,
          { y: '10vh', opacity: 0 },
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
          statsRef.current,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          portraitRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [labelRef.current, headlineRef.current, bodyRef.current],
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          statsRef.current,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0.2, ease: 'power2.in' },
          0.75
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '5+', label: 'Years' },
    { value: '18', label: 'Languages' },
    { value: 'Production', label: 'First' },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark flex items-center z-20"
    >
      <div className="w-full h-full px-6 lg:px-[6vw] py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left portrait */}
        <div
          ref={portraitRef}
          className="hidden lg:block relative flex-shrink-0"
          style={{
            width: '30vw',
            maxWidth: '480px',
            height: '52vh',
            maxHeight: '560px',
          }}
        >
          <img
            src="/portrait-about.jpg"
            alt="Ankur Dhuriya"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right content */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <span
            ref={labelRef}
            className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4"
          >
            Profile
          </span>

          <h2
            ref={headlineRef}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6"
          >
            I turn research into reliable products.
          </h2>

          <p
            ref={bodyRef}
            className="text-base text-text-secondary leading-relaxed mb-10"
          >
            I've spent the last five years shipping speech and language systems—from
            low-resource ASR to LLM-powered agents. My focus is always the outcome:
            lower latency, lower cost, higher accuracy, and teams that can maintain
            what we build.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex items-center gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <div className="hairline-accent w-full mb-3 animate-pulse-opacity" />
                <span className="font-heading text-2xl lg:text-3xl font-bold text-text-primary">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-text-secondary tracking-wider uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
