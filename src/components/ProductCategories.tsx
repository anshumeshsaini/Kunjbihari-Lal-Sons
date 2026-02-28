import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Teak Wood",
    image: "/images/teak-card.jpg",
    slug: "teak-wood",
    desc: "Premium Burma & Indian teak for lasting beauty",
    tag: "Most Popular",
  },
  {
    name: "Plywood",
    image: "/images/plywood-card.jpg",
    slug: "plywood",
    desc: "Commercial & marine grade plywood sheets",
    tag: "Best Seller",
  },
  {
    name: "Timber",
    image: "/images/timber-card.jpg",
    slug: "timber",
    desc: "Seasoned hardwood & softwood timber supply",
    tag: "Bulk Available",
  },
  {
    name: "Laminates",
    image: "/images/laminates-card.jpg",
    slug: "laminates",
    desc: "Decorative & industrial laminate finishes",
    tag: "300+ Designs",
  },
  {
    name: "Mica",
    image: "/images/mica-card.jpg",
    slug: "mica",
    desc: "High-gloss mica for modern interiors",
    tag: "New Arrivals",
  },
];

const ProductCard = ({
  product,
  index,
  featured = false,
}: {
  product: (typeof products)[0];
  index: number;
  featured?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <Link to={`/products?category=${product.slug}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative overflow-hidden cursor-pointer ${
          featured ? "h-[500px] md:h-[600px]" : "h-[380px] md:h-[450px]"
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `linear-gradient(180deg, 
              transparent 0%, 
              hsl(var(--wood-brown) / 0.2) 40%,
              hsl(var(--wood-brown) / 0.85) 100%
            )`,
          }}
        />
        <div className="absolute inset-0 bg-wood-brown/0 group-hover:bg-wood-brown/20 transition-colors duration-500" />

        {/* Tag */}
        <div className="absolute top-6 left-6">
          <span className="bg-primary/90 text-wood-brown text-[10px] tracking-[0.2em] uppercase font-body font-semibold px-3 py-1.5">
            {product.tag}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          {/* Index number */}
          <span className="text-cream/10 font-serif text-7xl font-bold absolute -top-16 right-6 group-hover:text-cream/20 transition-colors duration-500">
            0{index + 1}
          </span>

          <div className="relative">
            <h3 className="font-serif text-cream text-2xl md:text-3xl font-bold transition-transform duration-500 group-hover:-translate-y-2">
              {product.name}
            </h3>
            <p className="text-cream/50 text-sm font-body mt-2 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
              {product.desc}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="gold-line w-0 group-hover:w-10 transition-all duration-500" />
              <span className="text-primary text-xs tracking-[0.2em] uppercase font-body opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                View Range <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductCategories = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
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
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-body font-semibold">
                What We Offer
              </span>
            </div>
            <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-[3.2rem] font-bold leading-tight">
              Our Premium<br />
              <span className="text-primary">Product Range</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm tracking-widest uppercase mt-6 md:mt-0"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Featured large card */}
          <div className="md:col-span-7">
            <ProductCard product={products[0]} index={0} featured />
          </div>
          {/* Second card */}
          <div className="md:col-span-5">
            <ProductCard product={products[1]} index={1} featured />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {products.slice(2).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i + 2} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="md:hidden mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 text-primary font-body text-sm tracking-widest uppercase border border-primary px-8 py-3"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
