import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { DEFAULT_LOCALE, ENGLISH_LOCALE, getLocaleFromPath, isEnglishPreferred, switchLocalePath, type Locale } from "../../../lib/i18n";

const STORAGE_KEY = "bls-preferred-locale";
const COOKIE_NAME = "bls_preferred_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function persistLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function getStoredLocale() {
  return localStorage.getItem(STORAGE_KEY);
}

type LanguageSwitchProps = {
  locale: Locale;
  className?: string;
};

export function LanguageSwitch({ locale, className = "" }: LanguageSwitchProps) {
  const location = useLocation();
  const targetLocale = locale === DEFAULT_LOCALE ? ENGLISH_LOCALE : DEFAULT_LOCALE;
  const targetPath = switchLocalePath(location.pathname, targetLocale);
  const label = locale === DEFAULT_LOCALE ? "EN" : "ES";
  const ariaLabel =
    locale === DEFAULT_LOCALE ? "Switch site language to English" : "Cambiar idioma del sitio a español";

  return (
    <Link
      to={targetPath}
      prefetch="intent"
      onClick={() => persistLocale(targetLocale)}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full border border-[rgba(94,104,120,0.18)] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#202F4C] transition-colors hover:border-[#015095] hover:text-[#015095] ${className}`}
    >
      {label}
    </Link>
  );
}

export default function LanguageSelectorPopup() {
  const location = useLocation();
  const navigate = useNavigate();
  const dialogId = useId();
  const locale = getLocaleFromPath(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [preferredLocale, setPreferredLocale] = useState<Locale>(
    isEnglishPreferred() ? ENGLISH_LOCALE : DEFAULT_LOCALE,
  );

  useEffect(() => {
    const storedLocale = getStoredLocale();

    if (storedLocale === DEFAULT_LOCALE || storedLocale === ENGLISH_LOCALE) {
      setPreferredLocale(storedLocale);
      return;
    }

    setIsOpen(true);
  }, []);

  const handleChooseLocale = (nextLocale: Locale) => {
    persistLocale(nextLocale);
    setIsOpen(false);

    if (nextLocale !== locale) {
      navigate(switchLocalePath(location.pathname, nextLocale));
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${dialogId}-title`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(1,80,149,0.55) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(32,47,76,0.7) 0%, transparent 55%), linear-gradient(135deg, #0d1b2e 0%, #0a3060 40%, #015095 70%, #1a3f6b 100%)",
          }}
        >
          {/* subtle noise/grain overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            className="relative flex flex-col items-center gap-10 px-6 text-center"
          >
            {/* Logo */}
            <img
              src="/bls_logo.webp"
              alt="BLS - Best Logistics Solutions"
              className="h-16 w-auto object-contain brightness-0 invert md:h-20"
            />

            {/* Divider */}
            <div className="h-px w-24 bg-white/25" />

            {/* Entrar / Enter label */}
            <p
              id={`${dialogId}-title`}
              className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60"
            >
            </p>

            {/* Language buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleChooseLocale(DEFAULT_LOCALE)}
                autoFocus={preferredLocale === DEFAULT_LOCALE}
                className="group relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-10 py-4 text-base font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              >
                Entrar
              </button>

              <button
                type="button"
                onClick={() => handleChooseLocale(ENGLISH_LOCALE)}
                autoFocus={preferredLocale === ENGLISH_LOCALE}
                className="group relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-10 py-4 text-base font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              >
                Enter
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
