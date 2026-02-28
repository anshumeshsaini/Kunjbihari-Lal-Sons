import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "1975", title: "The Beginning", desc: "Kunjbihari Lal founded a small timber shop in the heart of Delhi." },
  { year: "1995", title: "Expansion", desc: "Second generation joined, expanding into plywood and laminates." },
  { year: "2010", title: "Modernization", desc: "Adopted modern warehousing and supply chain practices." },
  { year: "2024", title: "Legacy Continues", desc: "Third generation leads with 5000+ clients nationwide." },
];

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );

      // Animate each milestone
      const items = timelineRef.current?.querySelectorAll(".milestone");
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/wood-texture.jpg')" }}
        />
        <div className="absolute inset-0 bg-wood-brown/80" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-serif text-cream text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our Journey Since 1975
          </h1>
          <p className="text-cream/60 font-body text-lg max-w-xl mx-auto">
            Three generations of trust, quality, and wood craftsmanship.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-foreground text-3xl md:text-4xl font-bold text-center mb-20">
            Our Milestones
          </h2>

          <div ref={timelineRef} className="relative">
            {/* Horizontal line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border">
              <div
                ref={lineRef}
                className="absolute inset-0 bg-teak-gold origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {milestones.map((m) => (
                <div key={m.year} className="milestone text-center md:text-left">
                  <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-teak-gold mx-auto md:mx-0 mb-6 relative z-10" />
                  <span className="font-serif text-primary text-2xl font-bold">{m.year}</span>
                  <h3 className="font-serif text-foreground text-lg font-semibold mt-2 mb-2">{m.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
