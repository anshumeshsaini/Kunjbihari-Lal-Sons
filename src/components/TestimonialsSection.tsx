import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "We've been sourcing all our teak from Kunjbihari Lal & Sons for over 15 years. The consistency in quality is unmatched in the market.",
    name: "Rajesh Sharma",
    role: "Interior Designer, Delhi",
    initials: "RS",
  },
  {
    quote: "Their plywood quality saved us thousands in a commercial project. Zero defects, zero delays. That's rare in this industry.",
    name: "Amit Verma",
    role: "Builder & Contractor",
    initials: "AV",
  },
  {
    quote: "From selection to delivery, everything is handled with care. They treat every order — big or small — with the same seriousness.",
    name: "Priya Kapoor",
    role: "Homeowner, Noida",
    initials: "PK",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-wood-brown relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('/images/wood-texture.jpg')",
          backgroundSize: "400px",
          mixBlendMode: "overlay",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-primary/50" />
            <span className="text-primary/70 text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Client Stories
            </span>
            <span className="w-12 h-px bg-primary/50" />
          </div>
          <h2 className="font-serif text-cream text-3xl md:text-4xl lg:text-[3.2rem] font-bold leading-tight">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`relative p-8 md:p-10 border transition-all duration-700 cursor-pointer ${
                active === i
                  ? "border-primary/30 bg-cream/[0.04]"
                  : "border-cream/[0.06] hover:border-cream/10"
              }`}
              onClick={() => setActive(i)}
            >
              <Quote size={28} className="text-primary/20 mb-6" />
              <p className="text-cream/70 font-body text-sm leading-[2] mb-8">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-primary/20 flex items-center justify-center font-serif text-primary text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-cream text-sm font-body font-medium">{t.name}</p>
                  <p className="text-cream/40 text-xs font-body">{t.role}</p>
                </div>
              </div>

              {/* Active indicator */}
              {active === i && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                active === i ? "bg-primary w-8" : "bg-cream/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
