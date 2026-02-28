import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Truck, Award, Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Shield,
    title: "Unmatched Quality",
    desc: "Every plank is hand-selected by our experts. We reject more wood than we accept — that's our standard.",
    stat: "99.5%",
    statLabel: "Quality Rate",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    desc: "On-time delivery across India with specialized packaging. Your materials arrive exactly as they left our warehouse.",
    stat: "48hrs",
    statLabel: "Avg. Delivery",
  },
  {
    icon: Award,
    title: "Trusted Legacy",
    desc: "50+ years of reputation built on honesty, fair pricing, and genuine long-term relationships with our clients.",
    stat: "5000+",
    statLabel: "Happy Clients",
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    desc: "We partner with certified forests and sustainable suppliers. Quality wood doesn't have to cost the earth.",
    stat: "100%",
    statLabel: "Certified Wood",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "url('/images/wood-texture.jpg')",
          backgroundSize: "500px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Our Promise
              </span>
            </div>
            <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-[3.2rem] font-bold leading-tight">
              Why Thousands<br />
              <span className="text-primary">Choose Us</span>
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-base max-w-md leading-relaxed mt-6 md:mt-0">
            We don't just sell wood. We build relationships. Every client gets the same
            care whether they're buying a single sheet or furnishing an entire project.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              ref={(el) => (itemRefs.current[i] = el)}
              className="group relative bg-card border border-border p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center border border-primary/20 text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <r.icon size={20} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="font-serif text-foreground text-lg font-bold mb-3">{r.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-[1.8] mb-8">{r.desc}</p>

              {/* Stat */}
              <div className="pt-6 border-t border-border">
                <span className="font-serif text-primary text-2xl font-bold">{r.stat}</span>
                <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase font-body mt-1">
                  {r.statLabel}
                </p>
              </div>

              {/* Hover corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-primary/0 border-l-[40px] border-l-transparent group-hover:border-t-primary/10 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
