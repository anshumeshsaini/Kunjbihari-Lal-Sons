import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name}. ${form.message} (Phone: ${form.phone})`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <>
      {/* Banner */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/wood-texture.jpg')" }} />
        <div className="absolute inset-0 bg-wood-brown/80" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-serif text-cream text-4xl md:text-5xl font-bold">Get in Touch</h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-foreground text-3xl font-bold mb-8">Contact Information</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-1">Address</h4>
                  <p className="text-muted-foreground font-body text-sm">Main Market, Timber Road, New Delhi, India</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={20} className="text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-1">Phone</h4>
                  <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary font-body text-sm transition-colors">+91 98765 43210</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-1">Email</h4>
                  <a href="mailto:info@kblsons.com" className="text-muted-foreground hover:text-primary font-body text-sm transition-colors">info@kblsons.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MessageCircle size={20} className="text-whatsapp mt-1 shrink-0" />
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-1">WhatsApp</h4>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-whatsapp font-body text-sm transition-colors">Chat with us instantly</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-serif text-foreground text-3xl font-bold mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-muted border-0 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-muted border-0 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-muted border-0 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Tell us what you need..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 font-body text-sm tracking-widest uppercase font-semibold hover:brightness-110 transition-all"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
