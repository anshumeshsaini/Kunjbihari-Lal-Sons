import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal relative overflow-hidden">
    {/* Gold top line */}
    <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

    {/* Background texture */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: "url('/images/wood-texture.jpg')",
        backgroundSize: "400px",
      }}
    />

    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24 relative">
      {/* Top area - Brand */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-20">
        <div className="max-w-sm">
          <h3 className="font-serif text-cream text-2xl md:text-3xl font-bold mb-2">
            Kunjbihari Lal <span className="text-primary">&</span> Sons
          </h3>
          <div className="w-12 h-[2px] bg-primary mb-6" />
          <p className="text-cream/40 font-body text-sm leading-[1.9]">
            Premium wood, plywood, timber, laminates, and mica. Serving India with quality
            and trust since 1975. Three generations of excellence in the wood industry.
          </p>
        </div>

        {/* Newsletter / CTA */}
        <div className="flex flex-col items-start md:items-end">
          <span className="text-cream/30 text-[10px] tracking-[0.3em] uppercase font-body mb-4">
            Need a quote?
          </span>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-wood-brown px-8 py-3 font-body text-sm tracking-[0.2em] uppercase font-semibold hover:brightness-110 transition-all"
          >
            WhatsApp Us Now
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        {/* Products */}
        <div>
          <h4 className="text-cream/30 text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-8">
            Products
          </h4>
          <ul className="space-y-4">
            {["Teak Wood", "Plywood", "Timber", "Laminates", "Mica"].map((p) => (
              <li key={p}>
                <Link
                  to="/products"
                  className="text-cream/50 hover:text-primary transition-colors font-body text-sm flex items-center gap-1 group"
                >
                  {p}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-cream/30 text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-8">
            Company
          </h4>
          <ul className="space-y-4">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about" },
              { label: "Products", path: "/products" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="text-cream/50 hover:text-primary transition-colors font-body text-sm flex items-center gap-1 group"
                >
                  {l.label}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-2">
          <h4 className="text-cream/30 text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-8">
            Get in Touch
          </h4>
          <ul className="space-y-5">
            <li className="flex items-start gap-4 text-cream/50 text-sm font-body">
              <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
              <span className="leading-relaxed">
                Main Market, Timber Road,<br />
                New Delhi, India — 110006
              </span>
            </li>
            <li>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 text-cream/50 hover:text-primary transition-colors text-sm font-body"
              >
                <Phone size={16} className="text-primary shrink-0" />
                +91 98765 43210
              </a>
            </li>
            <li>
              <a
                href="mailto:info@kblsons.com"
                className="flex items-center gap-4 text-cream/50 hover:text-primary transition-colors text-sm font-body"
              >
                <Mail size={16} className="text-primary shrink-0" />
                info@kblsons.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-cream/[0.06] mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-cream/20 text-xs font-body tracking-wider">
          © {new Date().getFullYear()} Kunjbihari Lal & Sons. All rights reserved.
        </p>
        <p className="text-cream/15 text-[10px] font-body tracking-widest uppercase">
          Crafted with pride in India
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
