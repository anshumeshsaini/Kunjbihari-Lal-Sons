import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 25,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Overlay darkens on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Badge entrance
      gsap.fromTo(
        badgeRef.current,
        { y: -30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 }
      );

      // Headline reveal word by word
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { y: 100, opacity: 0, rotateX: -45 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.08,
            delay: 0.4,
          }
        );
      }

      // Gold decorative line
      const goldLine = sectionRef.current?.querySelector(".hero-gold-line");
      if (goldLine) {
        gsap.fromTo(
          goldLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power2.out", delay: 1 }
        );
      }

      // Subtext fade
      gsap.fromTo(
        subtextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.1 }
      );

      // CTA slide up
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.3 }
      );

      // Scroll indicator
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2 }
      );

      // Hide scroll indicator on scroll
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineText = "Crafting Trust in Wood for 50+ Years";
  const words = headlineText.split(" ");

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-end pb-24 md:pb-32">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('/images/showroom-bg.jpg')" }}
      />

      {/* Gradient Overlay - cinematic */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              hsl(var(--wood-brown) / 0.3) 0%, 
              hsl(var(--wood-brown) / 0.5) 30%,
              hsl(var(--wood-brown) / 0.75) 70%,
              hsl(var(--wood-brown) / 0.95) 100%
            )
          `,
        }}
      />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/images/wood-texture.jpg')",
          backgroundSize: "400px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Vertical decorative lines */}
      <div className="absolute top-0 left-[15%] w-px h-full bg-cream/[0.04] hidden lg:block" />
      <div className="absolute top-0 right-[15%] w-px h-full bg-cream/[0.04] hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-5xl w-full">
        {/* Heritage badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-3 mb-8">
          <span className="w-10 h-px bg-primary" />
          <span className="text-primary text-xs tracking-[0.35em] uppercase font-body font-semibold">
            Est. 1975 · New Delhi
          </span>
          <span className="w-10 h-px bg-primary" />
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-cream text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6"
          style={{ perspective: "800px" }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.25em] will-change-transform"
              style={{ transformOrigin: "center bottom" }}
            >
              {word === "Trust" || word === "Wood" ? (
                <span className="text-primary">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Gold decorative line */}
        <div className="hero-gold-line h-[3px] w-24 bg-primary mb-8 origin-left" />

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-cream/60 text-base md:text-lg max-w-lg mb-12 font-body leading-[1.8] tracking-wide"
        >
          Premium Teak Wood · Plywood · Timber · Laminates · Mica —
          <span className="text-cream/80 font-medium"> hand-selected materials</span> trusted
          by architects, builders & homeowners across India.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-5 items-center">
          <Link
            to="/products"
            className="group relative bg-primary text-wood-brown px-10 py-4 font-body text-sm tracking-[0.2em] uppercase font-semibold overflow-hidden transition-all duration-500"
          >
            <span className="relative z-10">Explore Products</span>
            <div className="absolute inset-0 bg-cream translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-cream/30 text-cream px-10 py-4 font-body text-sm tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-all duration-500"
          >
            Chat on WhatsApp
          </a>
          <span className="hidden md:inline-block text-cream/30 text-xs font-body tracking-widest ml-4">
            ← Start Here
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-cream/30 text-[10px] tracking-[0.4em] uppercase font-body">
          Discover
        </span>
        <div className="w-px h-14 bg-cream/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-primary animate-[scrollDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-32 right-8 md:right-20 hidden lg:flex flex-col items-end gap-2">
        <div className="w-px h-20 bg-primary/30" />
        <span className="text-primary/40 text-[10px] tracking-[0.3em] uppercase font-body writing-vertical"
              style={{ writingMode: "vertical-rl" }}>
          Premium Wood
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
