import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/showroom-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-wood-brown/85" />

      <div className="section-padding relative">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <span className="text-primary text-xs tracking-[0.4em] uppercase font-body block mb-6">
            Get Started Today
          </span>
          <h2 className="font-serif text-cream text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Ready to Build Something{" "}
            <span className="text-primary">Beautiful?</span>
          </h2>
          <p className="text-cream/50 font-body text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you need premium teak for a luxury project or bulk plywood for construction,
            we're here to help. Get a personalized quote in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              to="/contact"
              className="group bg-primary text-wood-brown px-10 py-4 font-body text-sm tracking-[0.2em] uppercase font-semibold inline-flex items-center gap-3 hover:gap-5 transition-all duration-500"
            >
              Get Free Quote <ArrowRight size={14} />
            </Link>
            <a
              href="tel:+919876543210"
              className="border border-cream/30 text-cream px-10 py-4 font-body text-sm tracking-[0.2em] uppercase inline-flex items-center gap-3 hover:border-primary hover:text-primary transition-all duration-500"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
