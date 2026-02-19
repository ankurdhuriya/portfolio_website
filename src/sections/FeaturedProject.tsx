import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProject = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
          [bodyRef.current, ctaRef.current],
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18
        )
        .fromTo(
          imageRef.current,
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          [labelRef.current, headlineRef.current, bodyRef.current, ctaRef.current],
          { x: 0, opacity: 1 },
          { x: '-14vw', opacity: 0.25, ease: 'power2.in' },
          0.7
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

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark flex items-center z-[60]"
    >
      <div className="w-full h-full px-6 lg:px-[8vw] py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <span
            ref={labelRef}
            className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4"
          >
            Featured Project
          </span>

          <h2
            ref={headlineRef}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6"
          >
            Invoice Intelligence
          </h2>

          <p ref={bodyRef} className="text-base text-text-secondary leading-relaxed mb-8">
            A RAG-based system that reads invoices, POs, and contracts, then
            answers spend and compliance questions with line-item
            precision—integrated into an NLQ chatbot for finance teams.
          </p>

          <button
            ref={ctaRef}
            className="self-start flex items-center gap-2 text-sm text-lime hover:text-lime-dark transition-colors group"
          >
            Read the case study
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Right image */}
        <div
          ref={imageRef}
          className="hidden lg:block relative flex-shrink-0 animate-slow-drift"
          style={{
            width: '38vw',
            maxWidth: '600px',
            height: '56vh',
            maxHeight: '680px',
          }}
        >
          <img
            src="/image-featured.jpg"
            alt="Invoice Intelligence"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
