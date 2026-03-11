import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/525582323839?text=Hola%2C%20quisiera%20mas%20informacion."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-[#25D366] text-white shadow-[0_20px_50px_rgba(37,211,102,0.35)] transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:bg-[#20ba59]"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppFloatingButton;
