import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { text: "Inicio", href: "#hero" },
  { text: "Nosotros", href: "#about" },
  { text: "Servicios", href: "#services" },
  { text: "Cobertura", href: "#coverage" },
  { text: "Contacto", href: "#contact" },
];

const scrollToSection = (href) => {
  const targetId = href.substring(1);
  document.getElementById(targetId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const FlipNavWrapper = () => <FlipNav />;

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 ${
          scrolled
            ? "border-slate-200/80 bg-white backdrop-blur-xl"
            : "border-slate-200/60 bg-white/95 backdrop-blur-xl"
        }`}
      >
        <Logo scrolled={scrolled} />

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map(({ text, href }) => (
            <NavLink
              key={text}
              text={text}
              href={href}
              onClick={(e) => handleLinkClick(e, href)}
            />
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, "#contact")}
          className="hidden items-center gap-2 rounded-full bg-[#1f3644] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#346079] lg:inline-flex"
        >
          Hablemos
          <FiArrowUpRight />
        </a>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block text-2xl text-slate-900 transition-colors duration-300 ease-in-out lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      {isOpen && <NavMenu navItems={navItems} onLinkClick={handleLinkClick} />}
    </nav>
  );
};

const Logo = ({ scrolled }) => (
  <a
    href="#hero"
    className="flex items-center gap-3"
    onClick={(e) => {
      e.preventDefault();
      scrollToSection("#hero");
    }}
  >
    <img
      src="/bls_logo.webp"
      alt="BLS - Best Logistics Solutions"
      className="h-12 w-auto object-contain"
    />
  </a>
);

const NavLink = ({ text, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:text-[#1f3644]"
  >
    {text}
  </a>
);

const NavMenu = ({ navItems, onLinkClick }) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.2 }}
    className="mx-auto mt-3 w-full max-w-7xl rounded-[2rem] border border-white/70 bg-white/92 p-4 shadow-[0_24px_60px_rgba(31,54,68,0.18)] backdrop-blur-xl lg:hidden"
  >
    {navItems.map(({ text, href }) => (
      <MenuLink
        key={text}
        text={text}
        href={href}
        onClick={(e) => onLinkClick(e, href)}
      />
    ))}
  </motion.div>
);

const MenuLink = ({ text, href, onClick }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#1f3644]"
    initial={{ y: -6, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
  >
    {text}
    <FiArrowUpRight />
  </motion.a>
);

export default FlipNavWrapper;
