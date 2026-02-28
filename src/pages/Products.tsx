import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, X, MessageCircle, ArrowRight, Filter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { slug: "all", label: "All Products" },
  { slug: "teak-wood", label: "Teak Wood" },
  { slug: "plywood", label: "Plywood" },
  { slug: "timber", label: "Timber" },
  { slug: "laminates", label: "Laminates" },
  { slug: "mica", label: "Mica" },
];

const allProducts = [
  { id: 1, name: "Burma Teak Plank", category: "teak-wood", image: "/images/teak-card.jpg", specs: "Grade A | 6ft x 12in | Kiln Dried", available: true, desc: "Premium Burma teak with rich grain patterns, ideal for luxury furniture and flooring." },
  { id: 2, name: "Premium Teak Log", category: "teak-wood", image: "/images/teak-card.jpg", specs: "Grade A | 8ft Length | Natural", available: true, desc: "Hand-selected teak logs with natural golden-brown hue and superior durability." },
  { id: 3, name: "Marine Plywood", category: "plywood", image: "/images/plywood-card.jpg", specs: "BWP Grade | 8x4 ft | 19mm", available: true, desc: "Boiling waterproof grade plywood for marine and exterior applications." },
  { id: 4, name: "Commercial Plywood", category: "plywood", image: "/images/plywood-card.jpg", specs: "MR Grade | 8x4 ft | 12mm", available: true, desc: "Moisture resistant plywood for interior furniture and partitions." },
  { id: 5, name: "Sal Wood Timber", category: "timber", image: "/images/timber-card.jpg", specs: "Structural Grade | Custom Sizes", available: true, desc: "Heavy-duty Sal wood timber for structural applications and construction." },
  { id: 6, name: "Pine Timber Beam", category: "timber", image: "/images/timber-card.jpg", specs: "Treated | 4x4 in | 10ft", available: false, desc: "Pressure-treated pine beams for outdoor structures and framing." },
  { id: 7, name: "Sunmica Glossy Finish", category: "laminates", image: "/images/laminates-card.jpg", specs: "1mm | 8x4 ft | 100+ Colors", available: true, desc: "High-gloss decorative laminates with scratch-resistant surface finish." },
  { id: 8, name: "Wood Grain Laminate", category: "laminates", image: "/images/laminates-card.jpg", specs: "0.8mm | 8x4 ft | Matt Finish", available: true, desc: "Natural wood grain texture laminates for premium interior designs." },
  { id: 9, name: "Mica Sheet Natural", category: "mica", image: "/images/mica-card.jpg", specs: "V1 Grade | Custom Sizes", available: true, desc: "Natural mica sheets with excellent insulation and heat resistance." },
  { id: 10, name: "Mica Insulation Board", category: "mica", image: "/images/mica-card.jpg", specs: "Industrial Grade | 4x4 ft", available: true, desc: "Industrial grade mica boards for electrical and thermal insulation." },
];

const ProductCard = ({
  product,
  index,
  onSelect,
}: {
  product: (typeof allProducts)[0];
  index: number;
  onSelect: (p: typeof allProducts[0]) => void;
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
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden cursor-pointer h-[420px] md:h-[480px]"
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
            hsl(var(--wood-brown) / 0.15) 30%,
            hsl(var(--wood-brown) / 0.85) 100%
          )`,
        }}
      />
      <div className="absolute inset-0 bg-wood-brown/0 group-hover:bg-wood-brown/20 transition-colors duration-500" />

      {/* Availability badge */}
      <div className="absolute top-6 left-6">
        <span
          className={`text-[10px] tracking-[0.2em] uppercase font-body font-semibold px-3 py-1.5 ${
            product.available
              ? "bg-whatsapp/90 text-cream"
              : "bg-destructive/90 text-cream"
          }`}
        >
          {product.available ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Index number */}
      <span className="text-cream/10 font-serif text-7xl font-bold absolute top-6 right-6 group-hover:text-cream/20 transition-colors duration-500">
        0{index + 1}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="relative">
          {/* Category tag */}
          <span className="text-primary text-[10px] tracking-[0.25em] uppercase font-body font-semibold mb-2 block">
            {categories.find((c) => c.slug === product.category)?.label}
          </span>

          <h3 className="font-serif text-cream text-2xl md:text-3xl font-bold transition-transform duration-500 group-hover:-translate-y-1">
            {product.name}
          </h3>

          <p className="text-cream/40 text-sm font-body mt-1 tracking-wide">
            {product.specs}
          </p>

          <p className="text-cream/50 text-sm font-body mt-3 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-2">
            {product.desc}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <div className="gold-line w-0 group-hover:w-10 transition-all duration-500" />
            <span className="text-primary text-xs tracking-[0.2em] uppercase font-body opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
              View Details <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof allProducts)[0] | null>(null);
  const activeCategory = searchParams.get("category") || "all";
  const headingRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        filterRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: filterRef.current, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const filtered = allProducts.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeCategoryLabel =
    categories.find((c) => c.slug === activeCategory)?.label || "All Products";

  return (
    <>
      {/* Cinematic Banner */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/images/showroom-bg.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              hsl(var(--wood-brown) / 0.4) 0%, 
              hsl(var(--wood-brown) / 0.7) 60%,
              hsl(var(--wood-brown) / 0.95) 100%
            )`,
          }}
        />

        <div ref={headingRef} className="relative z-10 section-padding !pb-16 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-body font-semibold">
                Our Collection
              </span>
            </div>
            <h1 className="font-serif text-cream text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Premium<br />
              <span className="text-primary">Product Range</span>
            </h1>
            <p className="text-cream/50 font-body text-base md:text-lg mt-4 max-w-lg">
              Explore our curated selection of finest wood products, handpicked
              for quality and crafted for excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "url('/images/wood-texture.jpg')",
            backgroundSize: "500px",
          }}
        />

        <div ref={filterRef} className="max-w-7xl mx-auto section-padding !py-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() =>
                    setSearchParams(c.slug === "all" ? {} : { category: c.slug })
                  }
                  className={`px-5 py-2.5 text-xs font-body tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeCategory === c.slug
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3 bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Result Count */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto section-padding !py-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground font-body text-sm">
              Showing{" "}
              <span className="text-foreground font-semibold">
                {filtered.length}
              </span>{" "}
              products in{" "}
              <span className="text-primary font-semibold">
                {activeCategoryLabel}
              </span>
            </p>
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <Filter size={14} />
              <span className="text-xs font-body tracking-wider uppercase">
                Grid View
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid — Homepage style */}
      <section className="section-padding bg-background !pt-0">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <>
              {/* First row: asymmetric like homepage */}
              {filtered.length >= 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
                  <div className="md:col-span-7">
                    <ProductCard
                      product={filtered[0]}
                      index={0}
                      onSelect={setSelected}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <ProductCard
                      product={filtered[1]}
                      index={1}
                      onSelect={setSelected}
                    />
                  </div>
                </div>
              )}

              {/* Remaining products in 3-col grid */}
              {filtered.length > 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.slice(2).map((p, i) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      index={i + 2}
                      onSelect={setSelected}
                    />
                  ))}
                </div>
              )}

              {/* Single product fallback */}
              {filtered.length === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <ProductCard
                    product={filtered[0]}
                    index={0}
                    onSelect={setSelected}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-32">
              <span className="text-muted-foreground/20 font-serif text-8xl font-bold block mb-4">
                ∅
              </span>
              <p className="text-muted-foreground font-body text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-wood-brown/85 backdrop-blur-sm" />

          <div
            className="relative bg-card max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Image side */}
              <div className="relative h-72 md:h-auto overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 md:hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, hsl(var(--card)) 100%)",
                  }}
                />
              </div>

              {/* Content side */}
              <div className="p-8 md:p-10 relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <X size={18} />
                </button>

                {/* Category */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-primary" />
                  <span className="text-primary text-[10px] tracking-[0.25em] uppercase font-body font-semibold">
                    {
                      categories.find((c) => c.slug === selected.category)
                        ?.label
                    }
                  </span>
                </div>

                <h2 className="font-serif text-foreground text-2xl md:text-3xl font-bold mb-3">
                  {selected.name}
                </h2>

                <span
                  className={`inline-block px-3 py-1 text-[10px] font-body tracking-[0.2em] uppercase mb-6 ${
                    selected.available
                      ? "bg-whatsapp/10 text-whatsapp"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {selected.available ? "Available in Stock" : "Currently Out of Stock"}
                </span>

                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
                  {selected.desc}
                </p>

                {/* Specs table */}
                <table className="w-full text-sm font-body mb-8">
                  <tbody>
                    {selected.specs.split(" | ").map((spec, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="py-3 text-muted-foreground">
                          Specification {i + 1}
                        </td>
                        <td className="py-3 text-foreground text-right font-medium">
                          {spec}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <a
                  href={`https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                    selected.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-whatsapp text-cream py-3.5 font-body text-sm tracking-[0.15em] uppercase hover:brightness-110 transition-all"
                >
                  <MessageCircle size={16} />
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
