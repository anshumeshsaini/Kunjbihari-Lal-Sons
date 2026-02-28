import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);

    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll.current && current > 300) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-500"
      style={{
        transform: visible ? "translateX(0)" : "translateX(100px)",
        opacity: visible ? 1 : 0,
      }}
    >
      {hovered && (
        <div className="absolute bottom-full right-0 mb-3 bg-charcoal text-cream text-sm px-4 py-2 rounded-sm whitespace-nowrap font-body shadow-lg">
          Need Help? Chat Now
        </div>
      )}
      <a
        href="https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-cream shadow-lg hover:scale-105 transition-transform duration-300 whatsapp-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} fill="currentColor" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
