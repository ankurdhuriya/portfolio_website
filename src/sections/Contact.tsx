import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, BookOpen, Send, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 75%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-flowing bg-dark py-20 lg:py-32 z-[90]"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 lg:mb-24">
          {/* Left contact info */}
          <div ref={leftRef} className="flex-1 max-w-xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Let's build something useful.
            </h2>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:mail.ankurdhuriya@gmail.com"
                className="flex items-center gap-3 text-text-secondary hover:text-lime transition-colors group"
              >
                <Mail size={18} />
                <span className="relative">
                  mail.ankurdhuriya@gmail.com
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lime transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              <a
                href="tel:+918266809006"
                className="flex items-center gap-3 text-text-secondary hover:text-lime transition-colors group"
              >
                <Phone size={18} />
                <span className="relative">
                  +91 82668 09006
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lime transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin size={18} />
                <span>India (remote-friendly)</span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div ref={formRef} className="flex-1 max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs text-text-secondary tracking-wider uppercase mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-dark-light border border-[rgba(244,246,250,0.14)] text-text-primary placeholder:text-text-secondary/50 focus:border-lime focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs text-text-secondary tracking-wider uppercase mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-dark-light border border-[rgba(244,246,250,0.14)] text-text-primary placeholder:text-text-secondary/50 focus:border-lime focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs text-text-secondary tracking-wider uppercase mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-light border border-[rgba(244,246,250,0.14)] text-text-primary placeholder:text-text-secondary/50 focus:border-lime focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-lime text-dark font-heading font-bold text-sm flex items-center justify-center gap-2 hover:bg-lime-dark transition-colors group"
              >
                Send message
                <Send
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="pt-8 border-t border-[rgba(244,246,250,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6">
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

          <p className="font-mono text-xs text-text-secondary tracking-wider">
            © Ankur Dhuriya. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
