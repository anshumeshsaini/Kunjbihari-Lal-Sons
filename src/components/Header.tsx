import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X } from "lucide-react";
import gsap from "gsap";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        backgroundColor: scrolled || !isHome ? "hsl(20,43%,12%)" : "transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.15)" : "none",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [scrolled, isHome]);

  return (
    <>
      {/* Top Strip */}
      <div className="fixed top-0 left-0 right-0 z-50 h-10 bg-wood-brown flex items-center justify-between px-6 md:px-12 lg:px-20 text-sm">
        <span className="text-cream font-body tracking-wider opacity-80">Since 1975</span>
        <div className="hidden md:flex items-center gap-6 text-cream opacity-80">
          <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity">
            <Phone size={13} />
            <span>+91 98765 43210</span>
          </a>
          <a href="https://wa.me/919876543210" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity">
            <span>WhatsApp</span>
          </a>
          <a href="mailto:info@kblsons.com" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity">
            <Mail size={13} />
            <span>info@kblsons.com</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        ref={headerRef}
        className="fixed top-10 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 lg:px-20 transition-colors"
        style={{ backgroundColor: isHome && !scrolled ? "transparent" : undefined }}
      >
        <Link to="/" className="font-serif text-cream text-2xl md:text-3xl font-bold tracking-tight">
          Kunjbihari Lal <span className="text-teak-gold">&</span> Sons
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-cream text-sm tracking-widest uppercase transition-colors hover:text-teak-gold ${
                location.pathname === item.path ? "text-teak-gold" : "opacity-80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="border border-teak-gold text-teak-gold px-6 py-2.5 text-sm tracking-widest uppercase hover:bg-teak-gold hover:text-wood-brown transition-all duration-300"
          >
            Get Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-cream"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-wood-brown pt-32 px-8 flex flex-col gap-8 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-cream text-3xl hover:text-teak-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="border border-teak-gold text-teak-gold px-6 py-3 text-center text-lg tracking-widest uppercase mt-4"
          >
            Get Quote
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
