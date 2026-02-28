import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LegacySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      const img = imageRef.current?.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Gold line expansion
      gsap.fromTo(
        lineRef.current,
        { width: "0px" },
        {
          width: "100px",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // Text fade in
      const children = textRef.current?.children;
      if (children) {
        gsap.fromTo(
          children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          }
        );
      }

      // Year counter
      if (counterRef.current) {
        const obj = { val: 1975 };
        gsap.to(obj, {
          val: 2025,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counterRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            if (counterRef.current) counterRef.current.textContent = Math.floor(obj.val).toString();
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "url('/images/wood-texture.jpg')",
          backgroundSize: "600px",
        }}
      />

      <div className="section-padding bg-background relative">
        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-px bg-primary" />
            <span className="text-primary text-xs tracking-[0.3em] uppercase font-body font-semibold">
              Our Legacy
            </span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
            {/* Image Column */}
            <div className="md:col-span-5 relative">
              <div ref={imageRef} className="relative overflow-hidden">
                <img
                  src="/images/workshop.jpg"
                  alt="Kunjbihari Lal & Sons timber workshop"
                  className="w-full h-[500px] md:h-[650px] object-cover will-change-transform"
                  style={{ transform: "scale(1.15)" }}
                />
              </div>

              {/* Floating year badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-wood-brown p-6 md:p-8 shadow-2xl">
                <span
                  ref={counterRef}
                  className="font-serif text-primary text-4xl md:text-5xl font-bold block"
                >
                  1975
                </span>
                <span className="text-cream/50 text-[10px] tracking-[0.3em] uppercase font-body mt-1 block">
                  Established
                </span>
              </div>

              {/* Decorative corner border */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-primary/30" />
            </div>

            {/* Text Column */}
            <div ref={textRef} className="md:col-span-7 md:pt-12">
              <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-[3.2rem] font-bold leading-[1.15] mb-5">
                Three Generations<br />
                <span className="text-primary">of Excellence</span>
              </h2>

              <div ref={lineRef} className="gold-line mb-10" style={{ width: 0 }} />

              <p className="text-muted-foreground text-lg md:text-xl leading-[1.9] mb-8 font-body">
                Founded in 1975 by Shri Kunjbihari Lal ji, our family business has grown from a
                modest timber shop in Old Delhi into one of the most <span className="text-foreground font-medium">respected names
                in India's wood industry</span>. Our legacy spans three generations of master
                craftsmen who understand wood at its deepest grain.
              </p>

              <p className="text-muted-foreground text-base leading-[1.9] mb-10 font-body">
                We supply premium teak, plywood, timber, laminates, and mica to builders, architects,
                interior designers, and homeowners across the nation. Every plank, every sheet, every
                panel carries our family's unwavering promise of quality.
              </p>

              {/* Key highlights */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                <div>
                  <span className="font-serif text-primary text-3xl font-bold">50+</span>
                  <p className="text-muted-foreground text-sm font-body mt-1 tracking-wide">Years of Trust</p>
                </div>
                <div>
                  <span className="font-serif text-primary text-3xl font-bold">3</span>
                  <p className="text-muted-foreground text-sm font-body mt-1 tracking-wide">Generations Strong</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
