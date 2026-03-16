import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiMenu,
  FiTruck,
  FiGitBranch,
  FiPackage,
  FiThermometer,
  FiLayers,
  FiBriefcase,
  FiUsers,
  FiX,
} from "react-icons/fi";

type NestedDropdownItem = {
  text: string;
  href: string;
  icon: typeof FiTruck;
};

type DropdownItem = {
  text: string;
  href: string;
  icon: typeof FiTruck;
  children?: NestedDropdownItem[];
};

type NavItem = {
  text: string;
  href: string;
  hasDropdown?: boolean;
};

type NavLinkProps = {
  text: string;
  href: string;
};

type NavMenuProps = {
  navItems: NavItem[];
  mobileServicesOpen: boolean;
  mobileRoadOpen: boolean;
  setMobileServicesOpen: Dispatch<SetStateAction<boolean>>;
  setMobileRoadOpen: Dispatch<SetStateAction<boolean>>;
};

const serviceDropdownItems: DropdownItem[] = [
  {
    text: "On the Road",
    href: "/servicios",
    icon: FiTruck,
    children: [
      { text: "Caja Seca", href: "/servicios/caja-seca", icon: FiPackage },
      { text: "Plataforma", href: "/servicios/plataforma", icon: FiLayers },
      { text: "Caja Refrigerada", href: "/servicios/caja-refrigerada", icon: FiThermometer },
    ],
  },
  {
    text: "Intermodal",
    href: "/servicios/intermodal",
    icon: FiGitBranch,
  },
];

const navItems: NavItem[] = [
  { text: "Inicio", href: "/" },
  { text: "Servicios Logísticos", href: "/servicios", hasDropdown: true },
  { text: "Consultoría", href: "/consultoria" },
  { text: "Nosotros", href: "/nosotros" },
];

const FlipNavWrapper = () => <FlipNav />;

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roadDropdownOpen, setRoadDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileRoadOpen, setMobileRoadOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const roadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setRoadDropdownOpen(false);
    setMobileServicesOpen(false);
    setMobileRoadOpen(false);
  }, [location.pathname, location.hash]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setRoadDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current !== null) clearTimeout(dropdownTimeoutRef.current);
      if (roadTimeoutRef.current !== null) clearTimeout(roadTimeoutRef.current);
    };
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current !== null) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
      setRoadDropdownOpen(false);
    }, 200);
  };

  const handleRoadEnter = () => {
    if (roadTimeoutRef.current !== null) clearTimeout(roadTimeoutRef.current);
    setRoadDropdownOpen(true);
  };

  const handleRoadLeave = () => {
    roadTimeoutRef.current = setTimeout(() => {
      setRoadDropdownOpen(false);
    }, 180);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 px-3 py-4 transition-transform duration-300 sm:px-4 md:px-6 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`section-shell grid min-w-0 w-full grid-cols-[auto_1fr_auto] items-center rounded-full px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 sm:px-5 lg:px-6 ${
          scrolled
            ? "border-[rgba(94,104,120,0.18)] bg-white backdrop-blur-xl"
            : "border-[rgba(94,104,120,0.14)] bg-white/95 backdrop-blur-xl"
        }`}
      >
        <Logo />

        <div className="hidden items-center justify-self-center gap-7 lg:flex">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.text}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className="relative flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-colors hover:text-[#202F4C]"
                >
                  {item.text}
                  <FiChevronDown
                    className={`text-xs transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full z-50 mt-4 w-80 -translate-x-1/2 overflow-visible rounded-2xl border border-[rgba(94,104,120,0.14)] bg-white p-2 shadow-[0_20px_60px_rgba(32,47,76,0.18)]"
                    >
                      {serviceDropdownItems.map((dropdownItem) => {
                        const Icon = dropdownItem.icon;
                        const hasChildren = Boolean(dropdownItem.children?.length);

                        return (
                          <div
                            key={dropdownItem.text}
                            className="relative"
                            onMouseEnter={hasChildren ? handleRoadEnter : undefined}
                            onMouseLeave={hasChildren ? handleRoadLeave : undefined}
                          >
                            <Link
                              to={dropdownItem.href}
                              className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5E6878] transition-all hover:bg-[#f5f8fc] hover:text-[#202F4C]"
                            >
                              <span className="flex items-center gap-3">
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#015095]/8">
                                  <Icon className="text-[#015095]" />
                                </span>
                                {dropdownItem.text}
                              </span>
                              {hasChildren ? <FiChevronDown className="-rotate-90 text-xs" /> : null}
                            </Link>

                            <AnimatePresence>
                              {hasChildren && roadDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, x: 8, scale: 0.98 }}
                                  animate={{ opacity: 1, x: 0, scale: 1 }}
                                  exit={{ opacity: 0, x: 8, scale: 0.98 }}
                                  transition={{ duration: 0.18, ease: "easeOut" }}
                                  className="absolute left-full top-0 ml-3 w-80 rounded-2xl border border-[rgba(94,104,120,0.14)] bg-white p-2 shadow-[0_20px_60px_rgba(32,47,76,0.18)]"
                                >
                                  {dropdownItem.children?.map((child) => {
                                    const ChildIcon = child.icon;
                                    return (
                                      <Link
                                        key={child.text}
                                        to={child.href}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5E6878] transition-all hover:bg-[#f5f8fc] hover:text-[#202F4C]"
                                      >
                                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#015095]/8">
                                          <ChildIcon className="text-[#015095]" />
                                        </span>
                                        {child.text}
                                      </Link>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink key={item.text} text={item.text} href={item.href} />
            ),
          )}
        </div>

        <Link
          to="/contacto"
          className="hidden items-center justify-self-end gap-2 rounded-full bg-[#202F4C] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#015095] hover:shadow-lg lg:inline-flex"
        >
          Contactános
          <FiArrowUpRight className="text-lg" />
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="col-start-3 block justify-self-end text-2xl text-[#202F4C] transition-colors duration-300 ease-in-out lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <NavMenu
            navItems={navItems}
            mobileServicesOpen={mobileServicesOpen}
            mobileRoadOpen={mobileRoadOpen}
            setMobileServicesOpen={setMobileServicesOpen}
            setMobileRoadOpen={setMobileRoadOpen}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

const Logo = () => (
  <Link to="/" className="min-w-0 flex items-center gap-3">
    <img
      src="/bls_logo.webp"
      alt="BLS - Best Logistics Solutions"
      className="h-10 w-auto object-contain transition-all duration-300 lg:h-12"
    />
  </Link>
);

const NavLink = ({ text, href }: NavLinkProps) => (
  <Link
    to={href}
    className="relative text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-colors hover:text-[#202F4C]"
  >
    {text}
  </Link>
);

const NavMenu = ({
  navItems: navMenuItems,
  mobileServicesOpen,
  mobileRoadOpen,
  setMobileServicesOpen,
  setMobileRoadOpen,
}: NavMenuProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="section-shell mt-4 w-full max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-[2rem] border border-[rgba(94,104,120,0.14)] bg-white/95 p-3 shadow-[0_32px_72px_rgba(32,47,76,0.20)] backdrop-blur-2xl sm:max-w-[calc(100vw-2rem)] lg:hidden"
  >
    <div className="flex flex-col space-y-1">
      {navMenuItems.map((item) =>
        item.hasDropdown ? (
          <div key={item.text}>
            <motion.button
              className="group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-all hover:bg-slate-100 hover:text-[#202F4C] active:scale-[0.98]"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {item.text}
              <FiChevronDown
                className={`text-sm transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>
            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 pb-2 pl-4">
                    <button
                      onClick={() => setMobileRoadOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.18em] text-[#5E6878] transition-all hover:bg-slate-100 hover:text-[#202F4C]"
                    >
                      <span className="flex items-center gap-3">
                        <FiTruck className="text-[#015095]" />
                        On the Road
                      </span>
                      <FiChevronDown
                        className={`text-sm transition-transform duration-200 ${
                          mobileRoadOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileRoadOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4"
                        >
                          {serviceDropdownItems[0].children?.map((child) => {
                            const ChildIcon = child.icon;
                            return (
                              <Link
                                key={child.text}
                                to={child.href}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold tracking-[0.08em] text-[#5E6878] transition-all hover:bg-slate-100 hover:text-[#202F4C]"
                              >
                                <ChildIcon className="text-[#015095]" />
                                {child.text}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Link
                      to="/servicios/intermodal"
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#5E6878] transition-all hover:bg-slate-100 hover:text-[#202F4C]"
                    >
                      <FiGitBranch className="text-[#015095]" />
                      Intermodal
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <MenuLink key={item.text} text={item.text} href={item.href} />
        ),
      )}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Link
          to="/contacto"
          className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#202F4C] px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all active:scale-[0.98]"
        >
          Contactános
          <FiArrowUpRight className="text-xl" />
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

const MenuLink = ({ text, href }: NavLinkProps) => {
  const icon =
    text === "Consultoría" ? <FiBriefcase className="text-lg" /> : <FiUsers className="text-lg" />;

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={href}
        className="group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-all hover:bg-slate-100 hover:text-[#202F4C] active:scale-[0.98]"
      >
        {text}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/50 text-slate-400 transition-colors group-hover:bg-[#015095]/10 group-hover:text-[#202F4C]">
          {icon}
        </span>
      </Link>
    </motion.div>
  );
};

export default FlipNavWrapper;
