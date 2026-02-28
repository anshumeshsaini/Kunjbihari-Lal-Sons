import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, suffix: "+", label: "Years of Legacy", detail: "Since 1975" },
  { value: 5000, suffix: "+", label: "Happy Clients", detail: "Pan India" },
  { value: 100, suffix: "+", label: "Product Types", detail: "All Categories" },
  { value: 15, suffix: "K+", label: "Projects Delivered", detail: "And Counting" },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const parent = el.closest(".stat-item");

        gsap.fromTo(
          parent,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          delay: i * 0.12 + 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          onUpdate: () => {
            if (el) el.textContent = Math.floor(obj.val).toLocaleString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/hero-wood-panels.jpg')" }}
      />
      <div className="absolute inset-0 bg-charcoal/90" />

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <div className="text-center mb-16">
            <span className="text-primary/60 text-xs tracking-[0.4em] uppercase font-body">
              Numbers That Speak
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item text-center relative group"
              >
                {/* Vertical divider */}
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-cream/10 hidden md:block" />
                )}

                <div className="font-serif text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 tracking-tight">
                  <span ref={(el) => (counterRefs.current[i] = el)}>0</span>
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <p className="text-cream/50 text-xs tracking-[0.25em] uppercase font-body mb-1">
                  {stat.label}
                </p>
                <p className="text-cream/25 text-[10px] tracking-widest uppercase font-body">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default StatsSection;
