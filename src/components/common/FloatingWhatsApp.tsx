import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = 'https://wa.me/919876543210?text=Namaste!%20I%20would%20like%20to%20inquire%20about%20Sattva%20Yoga%20classes%20and%20memberships.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 hover:shadow-green-500/20 transition-all flex items-center gap-2 group border-2 border-white/20"
      aria-label="Chat on WhatsApp"
      title="Chat with Sattva Concierge on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current text-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold pr-1">
        Concierge Chat
      </span>
    </a>
  );
};
