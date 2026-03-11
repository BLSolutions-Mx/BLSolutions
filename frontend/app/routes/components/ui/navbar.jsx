import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { text: "Inicio", href: "#hero" },
  { text: "Nosotros", href: "#about" },
  { text: "Servicios", href: "#services" },
  { text: "Metodo", href: "#approach" },
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
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handler = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (isOpen) {
        setIsHidden(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 24) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 overflow-x-clip px-3 py-4 transition-transform duration-300 sm:px-4 md:px-6 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`section-shell grid min-w-0 w-full grid-cols-[auto_1fr_auto] items-center rounded-full px-4 py-3 sm:px-5 lg:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 ${
          scrolled
            ? "border-[rgba(94,104,120,0.18)] bg-white backdrop-blur-xl"
            : "border-[rgba(94,104,120,0.14)] bg-white/95 backdrop-blur-xl"
        }`}
      >
        <Logo scrolled={scrolled} />

        <div className="hidden items-center justify-self-center gap-7 lg:flex">
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
          className="hidden items-center justify-self-end gap-2 rounded-full bg-[#202F4C] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#015095] hover:shadow-lg lg:inline-flex"
        >
          Hablemos
          <FiArrowUpRight className="text-lg" />
        </a>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="col-start-3 block justify-self-end text-2xl text-[#202F4C] transition-colors duration-300 ease-in-out lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && <NavMenu navItems={navItems} onLinkClick={handleLinkClick} />}
      </AnimatePresence>
    </nav>
  );
};

const Logo = ({ scrolled }) => (
  <a
    href="#hero"
    className="min-w-0 flex items-center gap-3"
    onClick={(e) => {
      e.preventDefault();
      scrollToSection("#hero");
    }}
  >
    <img
      src="/bls_logo.webp"
      alt="BLS - Best Logistics Solutions"
      className="h-10 w-auto object-contain transition-all duration-300 lg:h-12"
    />
  </a>
);

const NavLink = ({ text, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-colors hover:text-[#202F4C]"
  >
    {text}
  </a>
);

const NavMenu = ({ navItems, onLinkClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="section-shell mt-4 w-full max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-[2rem] border border-[rgba(94,104,120,0.14)] bg-white/95 p-3 shadow-[0_32px_72px_rgba(32,47,76,0.20)] backdrop-blur-2xl lg:hidden sm:max-w-[calc(100vw-2rem)]"
  >
    <div className="flex flex-col space-y-1">
      {navItems.map(({ text, href }) => (
        <MenuLink
          key={text}
          text={text}
          href={href}
          onClick={(e) => onLinkClick(e, href)}
        />
      ))}
      <motion.a
        href="#contact"
        onClick={(e) => onLinkClick(e, "#contact")}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#202F4C] px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all active:scale-[0.98]"
      >
        Hablemos
        <FiArrowUpRight className="text-xl" />
      </motion.a>
    </div>
  </motion.div>
);

const MenuLink = ({ text, href, onClick }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className="group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-all hover:bg-slate-100 hover:text-[#202F4C] active:scale-[0.98]"
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {text}
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/50 text-slate-400 transition-colors group-hover:bg-[#015095]/10 group-hover:text-[#202F4C]">
      <FiArrowUpRight className="text-lg" />
    </span>
  </motion.a>
);

export default FlipNavWrapper;
