import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../App.css';

import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Capabilities from '../sections/Capabilities';
import SelectedWork from '../sections/SelectedWork';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Blogs from '../sections/Blogs';
import FeaturedProject from '../sections/FeaturedProject';
import Consultation from '../sections/Consultation';
import Principles from '../sections/Principles';
import Contact from '../sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => {
        const start = st.start / maxScroll;
        const end = (st.end ?? st.start) / maxScroll;
        const center = start + (end - start) * 0.5;
        return { start, end, center };
      });

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-dark text-text-primary">
      <div className="noise-overlay" />

      <Navigation />

      <main className="relative">
        <Hero />
        <About />
        <Capabilities />
        <SelectedWork />
        <Experience />
        <Education />
        <Blogs />
        <FeaturedProject />
        <Consultation />
        <Principles />
        <Contact />
      </main>
    </div>
  );
}

export default HomePage;
