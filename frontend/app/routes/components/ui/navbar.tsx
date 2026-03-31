import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { IoMdAirplane } from "react-icons/io";
import {
  FiArchive,
  FiArrowUpRight,
  FiBriefcase,
  FiChevronDown,
  FiGitBranch,
  FiHome,
  FiMenu,
  FiTruck,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { getLocalizedPath, getLocaleFromPath, type Locale } from "../../../lib/i18n";
import { LanguageSwitch } from "./language-selector";

type DropdownItem = {
  text: string;
  href: string;
  icon: typeof FiTruck;
};

type NavItem = {
  text: string;
  href: string;
  hasDropdown?: boolean;
};

type NavLinkProps = {
  text: string;
  href: string;
  onClick?: () => void;
};

type NavMenuProps = {
  locale: Locale;
  navItems: NavItem[];
  mobileServicesOpen: boolean;
  toggleMobileServices: () => void;
  closeMobileMenu: () => void;
};

type NavUiState = {
  routeKey: string;
  isOpen: boolean;
  dropdownOpen: boolean;
  mobileServicesOpen: boolean;
};

const copyByLocale = {
  "es-MX": {
    home: "Inicio",
    services: "Servicios Logísticos",
    consulting: "Consultoría",
    about: "Nosotros",
    contact: "Contáctanos",
    closeServices: "Cerrar submenú de servicios",
    openServices: "Abrir submenú de servicios",
    closeMenu: "Cerrar menú",
    openMenu: "Abrir menú",
    viewAllServices: "Ver todos los servicios",
    ground: "Terrestre",
    air: "Aéreo",
    intermodal: "Intermodal",
    warehousing: "Almacenamiento",
  },
  "en-US": {
    home: "Home",
    services: "Logistics Services",
    consulting: "Consulting",
    about: "About",
    contact: "Contact us",
    closeServices: "Close services submenu",
    openServices: "Open services submenu",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    viewAllServices: "View all services",
    ground: "On The Road",
    air: "Air",
    intermodal: "Intermodal",
    warehousing: "Warehousing",
  },
} satisfies Record<
  Locale,
  Record<
    | "home"
    | "services"
    | "consulting"
    | "about"
    | "contact"
    | "closeServices"
    | "openServices"
    | "closeMenu"
    | "openMenu"
    | "viewAllServices"
    | "ground"
    | "air"
    | "intermodal"
    | "warehousing",
    string
  >
>;

const createNavUiState = (routeKey: string): NavUiState => ({
  routeKey,
  isOpen: false,
  dropdownOpen: false,
  mobileServicesOpen: false,
});

const getRouteKey = (location: ReturnType<typeof useLocation>) =>
  location.key || `${location.pathname}${location.search}${location.hash}`;

const FlipNav = () => {
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);
  const copy = copyByLocale[locale];
  const serviceDropdownItems: DropdownItem[] = [
    {
      text: copy.ground,
      href: getLocalizedPath("ground", locale),
      icon: FiTruck,
    },
    {
      text: copy.air,
      href: getLocalizedPath("air", locale),
      icon: IoMdAirplane,
    },
    {
      text: copy.intermodal,
      href: getLocalizedPath("intermodal", locale),
      icon: FiGitBranch,
    },
    {
      text: copy.warehousing,
      href: getLocalizedPath("warehousing", locale),
      icon: FiArchive,
    },
  ];
  const navItems: NavItem[] = [
    { text: copy.home, href: getLocalizedPath("home", locale) },
    { text: copy.services, href: getLocalizedPath("services", locale), hasDropdown: true },
    { text: copy.consulting, href: getLocalizedPath("consulting", locale) },
    { text: copy.about, href: getLocalizedPath("about", locale) },
  ];
  const routeKey = getRouteKey(location);
  const [navState, setNavState] = useState(() => createNavUiState(routeKey));
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resolvedNavState =
    navState.routeKey === routeKey ? navState : createNavUiState(routeKey);
  const { isOpen, dropdownOpen, mobileServicesOpen } = resolvedNavState;

  const updateNavState = (updater: (state: NavUiState) => NavUiState) => {
    setNavState((previousState) => {
      const currentState =
        previousState.routeKey === routeKey ? previousState : createNavUiState(routeKey);

      return updater(currentState);
    });
  };

  const clearDropdownTimeout = () => {
    if (dropdownTimeoutRef.current !== null) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const closeDesktopDropdown = () => {
    clearDropdownTimeout();
    updateNavState((state) => ({ ...state, dropdownOpen: false }));
  };

  const closeMobileMenu = () => {
    updateNavState((state) => ({
      ...state,
      isOpen: false,
      mobileServicesOpen: false,
    }));
  };

  const closeNavOverlays = () => {
    clearDropdownTimeout();
    updateNavState((state) => ({
      ...state,
      isOpen: false,
      dropdownOpen: false,
      mobileServicesOpen: false,
    }));
  };

  const toggleMobileMenu = () => {
    updateNavState((state) => {
      const nextIsOpen = !state.isOpen;

      return nextIsOpen
        ? { ...state, isOpen: true }
        : { ...state, isOpen: false, mobileServicesOpen: false };
    });
  };

  const toggleDesktopDropdown = () => {
    clearDropdownTimeout();
    updateNavState((state) => ({ ...state, dropdownOpen: !state.dropdownOpen }));
  };

  const toggleMobileServices = () => {
    updateNavState((state) => ({
      ...state,
      mobileServicesOpen: !state.mobileServicesOpen,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    const handlePointerDown = (event: PointerEvent) => {
      if (
        isOpen &&
        navRef.current &&
        event.target instanceof Node &&
        !navRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }

      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDesktopDropdown();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, routeKey]);

  useEffect(() => () => clearDropdownTimeout(), []);

  const handleDropdownEnter = () => {
    clearDropdownTimeout();
    updateNavState((state) => ({ ...state, dropdownOpen: true }));
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      updateNavState((state) => ({ ...state, dropdownOpen: false }));
    }, 200);
  };

  return (
    <nav
      ref={navRef}
      data-site-nav
      className={`fixed inset-x-0 top-0 z-50 px-3 py-4 transition-transform duration-300 sm:px-4 md:px-6 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`section-shell grid min-w-0 w-full grid-cols-[auto_1fr_auto] items-center rounded-full px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 sm:px-5 lg:px-6 ${
          scrolled ? "border-[rgba(94,104,120,0.18)] bg-white" : "border-[rgba(94,104,120,0.14)] bg-white/95 "
        }`}
      >
        <Logo locale={locale} onClick={closeNavOverlays} />

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
                <div className="relative flex items-center gap-1.5">
                  <Link
                    to={item.href}
                    prefetch="intent"
                    onClick={closeDesktopDropdown}
                    className="relative text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-colors hover:text-[#202F4C]"
                  >
                    {item.text}
                  </Link>
                  <button
                    type="button"
                    onClick={toggleDesktopDropdown}
                    aria-label={dropdownOpen ? copy.closeServices : copy.openServices}
                    className="text-[#5E6878] transition-colors hover:text-[#202F4C]"
                  >
                    <FiChevronDown
                      className={`text-xs transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 overflow-visible rounded-2xl border border-[rgba(94,104,120,0.14)] bg-white p-2 shadow-[0_20px_60px_rgba(32,47,76,0.18)]"
                    >
                      {serviceDropdownItems.map((dropdownItem) => {
                        const Icon = dropdownItem.icon;

                        return (
                          <Link
                            key={dropdownItem.text}
                            to={dropdownItem.href}
                            prefetch="intent"
                            onClick={closeDesktopDropdown}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5E6878] transition-all hover:bg-[#f5f8fc] hover:text-[#202F4C]"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#015095]/8">
                              <Icon className="text-[#015095]" />
                            </span>
                            {dropdownItem.text}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.text}
                text={item.text}
                href={item.href}
                onClick={closeNavOverlays}
              />
            ),
          )}
        </div>

        <div className="hidden items-center justify-self-end gap-3 lg:flex">
          <LanguageSwitch locale={locale} />
          <Link
            to={`${getLocalizedPath("contact", locale)}#form`}
            prefetch="intent"
            onClick={closeNavOverlays}
            className="inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#015095] hover:shadow-lg"
          >
            {copy.contact}
            <FiArrowUpRight className="text-lg" />
          </Link>
        </div>

        <button
          type="button"
          className="col-start-3 block justify-self-end text-2xl text-[#202F4C] transition-colors duration-300 ease-in-out lg:hidden"
          onClick={toggleMobileMenu}
          aria-label={isOpen ? copy.closeMenu : copy.openMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <NavMenu
            locale={locale}
            navItems={navItems}
            mobileServicesOpen={mobileServicesOpen}
            toggleMobileServices={toggleMobileServices}
            closeMobileMenu={closeMobileMenu}
          />
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

const Logo = ({ locale, onClick }: { locale: Locale; onClick?: () => void }) => (
  <Link
    to={getLocalizedPath("home", locale)}
    prefetch="intent"
    onClick={onClick}
    className="min-w-0 flex items-center gap-3"
  >
    <img
      src="/bls_logo.webp"
      alt="BLS - Best Logistics Solutions"
      className="h-10 w-auto object-contain transition-all duration-300 lg:h-12"
    />
  </Link>
);

const NavLink = ({ text, href, onClick }: NavLinkProps) => (
  <Link
    to={href}
    prefetch="intent"
    onClick={onClick}
    className="relative text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-colors hover:text-[#202F4C]"
  >
    {text}
  </Link>
);

const NavMenu = ({
  locale,
  navItems: navMenuItems,
  mobileServicesOpen,
  toggleMobileServices,
  closeMobileMenu,
}: NavMenuProps) => {
  const copy = copyByLocale[locale];
  const serviceDropdownItems: DropdownItem[] = [
    {
      text: copy.ground,
      href: getLocalizedPath("ground", locale),
      icon: FiTruck,
    },
    {
      text: copy.air,
      href: getLocalizedPath("air", locale),
      icon: IoMdAirplane,
    },
    {
      text: copy.intermodal,
      href: getLocalizedPath("intermodal", locale),
      icon: FiGitBranch,
    },
    {
      text: copy.warehousing,
      href: getLocalizedPath("warehousing", locale),
      icon: FiArchive,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className="section-shell mt-4 w-full max-w-[calc(100vw-1.5rem)] rounded-[1.75rem] border border-[rgba(94,104,120,0.14)] bg-white p-3 shadow-[0_20px_48px_rgba(32,47,76,0.16)] sm:max-w-[calc(100vw-2rem)] lg:hidden overflow-y-auto max-h-[calc(100vh-6rem)]"
    >
      <div className="mb-3 flex justify-end">
        <LanguageSwitch locale={locale} />
      </div>
      <div className="flex flex-col gap-2">
        {navMenuItems.map((item) =>
          item.hasDropdown ? (
            <motion.div
              key={item.text}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -8, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="rounded-[1.35rem] border border-slate-200 bg-slate-50/70 px-3 py-3"
            >
              <button
                type="button"
                onClick={toggleMobileServices}
                aria-label={mobileServicesOpen ? copy.closeServices : copy.openServices}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-bold uppercase tracking-[0.2em] text-[#202F4C] transition-colors hover:bg-white"
              >
                <span>{item.text}</span>
                <FiChevronDown
                  className={`text-sm text-[#5E6878] transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {mobileServicesOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 flex flex-col gap-1">
                      <div className="rounded-xl bg-white">
                        <MobileServiceLink
                          to={item.href}
                          icon={FiArrowUpRight}
                          label={copy.viewAllServices}
                          onClick={closeMobileMenu}
                        />
                      </div>

                      {serviceDropdownItems.map((service) => (
                        <div key={service.text} className="rounded-xl bg-white">
                          <MobileServiceLink
                            to={service.href}
                            icon={service.icon}
                            label={service.text}
                            onClick={closeMobileMenu}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : (
            <MenuLink key={item.text} text={item.text} href={item.href} onClick={closeMobileMenu} />
          ),
        )}

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ delay: 0.08, duration: 0.2, ease: "easeOut" }}
        >
          <Link
            to={`${getLocalizedPath("contact", locale)}#form`}
            prefetch="intent"
            onClick={closeMobileMenu}
            className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#202F4C] px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-md"
          >
            {copy.contact}
            <FiArrowUpRight className="text-xl" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const MenuLink = ({ text, href, onClick }: NavLinkProps) => {
  const icon =
    href === "/" || href === "/en" ? (
      <FiHome className="text-lg" />
    ) : href.includes("consult") ? (
      <FiBriefcase className="text-lg" />
    ) : (
      <FiUsers className="text-lg" />
    );

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -8, opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <Link
        to={href}
        prefetch="intent"
        onClick={onClick}
        className="group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[#5E6878] transition-colors hover:bg-slate-100 hover:text-[#202F4C]"
      >
        {text}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/50 text-slate-400 transition-colors group-hover:bg-[#015095]/10 group-hover:text-[#202F4C]">
          {icon}
        </span>
      </Link>
    </motion.div>
  );
};

const MobileServiceLink = ({
  to,
  icon: Icon,
  label,
  onClick,
}: {
  to: string;
  icon: typeof FiTruck | typeof FiArrowUpRight;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    prefetch="intent"
    onClick={onClick}
    className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#202F4C] transition-colors hover:bg-slate-50"
  >
    <span className="flex items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#015095]/8">
        <Icon className="text-[#015095]" />
      </span>
      {label}
    </span>
    <FiArrowUpRight className="text-base text-[#5E6878]" />
  </Link>
);

export default FlipNav;
