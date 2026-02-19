import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Video, CheckCircle, X, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Consultation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        optionsRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: optionsRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        calendarRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: calendarRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const consultationTypes = [
    {
      icon: <Video size={24} />,
      title: 'AI Strategy Call',
      duration: '30 min',
      description: 'Discuss your AI/ML project requirements and explore solutions.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Technical Deep Dive',
      duration: '60 min',
      description: 'In-depth technical consultation on architecture and implementation.',
    },
    {
      icon: <Calendar size={24} />,
      title: 'Project Assessment',
      duration: '45 min',
      description: 'Comprehensive review of your existing AI systems and roadmap.',
    },
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const handleBookSlot = (slot: string) => {
    setSelectedSlot(slot);
    toast.success(`Slot ${slot} selected! Redirecting to calendar...`);
    // Open Calendly in new tab
    window.open('https://calendly.com/mail-ankurdhuriya/30min', '_blank');
    setShowBookingModal(false);
  };

  return (
    <section
      ref={sectionRef}
      id="consultation"
      className="section-flowing bg-dark py-20 lg:py-32 z-[70]"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <span className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4 block">
            Book a Call
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Let's discuss your project
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            Schedule a free consultation to explore how I can help you build intelligent systems.
          </p>
        </div>

        {/* Consultation Types */}
        <div ref={optionsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12 lg:mb-16">
          {consultationTypes.map((type, index) => (
            <div
              key={index}
              className="p-6 lg:p-8 border border-[rgba(244,246,250,0.10)] hover:border-lime/30 transition-all group cursor-pointer"
              onClick={() => setShowBookingModal(true)}
            >
              <div className="text-lime mb-4 group-hover:scale-110 transition-transform">
                {type.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                {type.title}
              </h3>
              <span className="font-mono text-xs text-lime tracking-wider mb-3 block">
                {type.duration}
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>

        {/* Calendar CTA */}
        <div ref={calendarRef} className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 lg:p-8 border border-[rgba(244,246,250,0.10)] bg-dark-light">
            <div className="flex items-center gap-3">
              <Calendar className="text-lime" size={24} />
              <div className="text-left">
                <p className="font-heading text-sm font-bold text-text-primary">
                  Available this week
                </p>
                <p className="font-mono text-xs text-text-secondary">
                  Mon - Fri, 9:00 AM - 5:00 PM IST
                </p>
              </div>
            </div>
            <button
              onClick={() => window.open('https://calendly.com/mail-ankurdhuriya/30min', '_blank')}
              className="px-6 py-3 bg-lime text-dark font-heading font-bold text-sm flex items-center gap-2 hover:bg-lime-dark transition-colors group whitespace-nowrap"
            >
              Book a slot
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          {/* Quick time slots preview */}
          <div className="mt-8">
            <p className="font-mono text-xs text-text-secondary tracking-wider uppercase mb-4">
              Popular time slots
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => window.open('https://calendly.com/mail-ankurdhuriya/30min', '_blank')}
                  className="px-4 py-2 border border-[rgba(244,246,250,0.14)] text-text-secondary hover:text-lime hover:border-lime transition-colors font-mono text-sm"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 lg:mt-16 flex flex-wrap justify-center gap-6 lg:gap-10">
          {[
            'Free 30-min consultation',
            'No commitment required',
            'NDA available on request',
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-text-secondary">
              <CheckCircle size={16} className="text-lime" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/95 backdrop-blur-lg">
          <div className="relative w-full max-w-lg bg-dark-light border border-[rgba(244,246,250,0.14)] p-6 lg:p-8">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
              Book Your Consultation
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Select a time slot that works for you. You'll be redirected to Calendly to confirm.
            </p>

            <div className="space-y-3">
              <p className="font-mono text-xs text-text-secondary tracking-wider uppercase">
                Available slots (IST)
              </p>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleBookSlot(slot)}
                    className={`p-3 border text-left transition-all ${
                      selectedSlot === slot
                        ? 'border-lime bg-lime/10 text-lime'
                        : 'border-[rgba(244,246,250,0.14)] text-text-secondary hover:text-lime hover:border-lime'
                    }`}
                  >
                    <span className="font-mono text-sm">{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[rgba(244,246,250,0.14)]">
              <p className="text-xs text-text-secondary text-center">
                Or book directly via{' '}
                <a
                  href="https://calendly.com/mail-ankurdhuriya/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:underline"
                >
                  Calendly
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Consultation;
