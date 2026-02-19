import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Capabilities = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          labelRef.current,
          { y: '-4vh', opacity: 0 },
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
          introRef.current,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        );

      // List items with stagger
      const listItems = listRef.current?.querySelectorAll('li');
      if (listItems) {
        listItems.forEach((item, index) => {
          scrollTl.fromTo(
            item,
            { x: '-10vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.16 + index * 0.035
          );
        });
      }

      // Underline rules
      const rules = listRef.current?.querySelectorAll('.rule-line');
      if (rules) {
        rules.forEach((rule, index) => {
          scrollTl.fromTo(
            rule,
            { scaleX: 0 },
            { scaleX: 1, ease: 'none' },
            0.2 + index * 0.025
          );
        });
      }

      scrollTl.fromTo(
        imageRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          [labelRef.current, headlineRef.current, introRef.current],
          { x: 0, opacity: 1 },
          { x: '-14vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          listRef.current,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0.2, ease: 'power2.in' },
          0.72
        )
        .fromTo(
          imageRef.current,
          { x: 0, opacity: 1 },
          { x: '14vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    'Generative AI & LLMs',
    'Speech Systems (ASR/TTS)',
    'Retrieval & Agents',
    'MLOps & Production',
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark flex items-center z-30"
    >
      <div className="w-full h-full px-6 lg:px-[8vw] py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <span
            ref={labelRef}
            className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4"
          >
            Capabilities
          </span>

          <h2
            ref={headlineRef}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4"
          >
            What I do
          </h2>

          <p ref={introRef} className="text-base text-text-secondary leading-relaxed mb-8">
            End-to-end AI systems: design, training, evaluation, and production
            operations.
          </p>

          {/* Capability list */}
          <ul ref={listRef} className="space-y-0">
            {capabilities.map((capability, index) => (
              <li key={index} className="py-4">
                <span className="font-heading text-lg lg:text-xl font-semibold text-text-primary">
                  {capability}
                </span>
                <div
                  className="rule-line h-px w-full bg-[rgba(244,246,250,0.14)] mt-4 origin-left"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Right image */}
        <div
          ref={imageRef}
          className="hidden lg:block relative flex-shrink-0 animate-slow-drift"
          style={{
            width: '36vw',
            maxWidth: '560px',
            height: '56vh',
            maxHeight: '640px',
          }}
        >
          <img
            src="/image-capabilities.jpg"
            alt="Capabilities"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
