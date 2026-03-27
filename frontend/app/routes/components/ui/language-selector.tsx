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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0B1120]/55 px-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
            aria-describedby={`${dialogId}-description`}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_90px_rgba(11,17,32,0.28)]"
          >
            <div className="bg-[linear-gradient(135deg,#202F4C_0%,#015095_100%)] px-7 py-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                Language
              </p>
              <h2 id={`${dialogId}-title`} className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                Choose your language
              </h2>
              <p id={`${dialogId}-description`} className="mt-3 max-w-md text-sm leading-7 text-white/78">
                Selecciona el idioma en el que quieres navegar. Puedes cambiarlo después desde la
                navegación.
              </p>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
              <button
                type="button"
                onClick={() => handleChooseLocale(DEFAULT_LOCALE)}
                autoFocus={preferredLocale === DEFAULT_LOCALE}
                className={`rounded-[1.6rem] border p-5 text-left transition-all ${
                  preferredLocale === DEFAULT_LOCALE
                    ? "border-[#015095] bg-[#eef5fb] shadow-[0_18px_40px_rgba(1,80,149,0.10)]"
                    : "border-slate-200 bg-white hover:border-[#015095]/35"
                }`}
              >
                <p className="text-xl font-semibold text-[#202F4C]">Español</p>
              </button>

              <button
                type="button"
                onClick={() => handleChooseLocale(ENGLISH_LOCALE)}
                autoFocus={preferredLocale === ENGLISH_LOCALE}
                className={`rounded-[1.6rem] border p-5 text-left transition-all ${
                  preferredLocale === ENGLISH_LOCALE
                    ? "border-[#015095] bg-[#eef5fb] shadow-[0_18px_40px_rgba(1,80,149,0.10)]"
                    : "border-slate-200 bg-white hover:border-[#015095]/35"
                }`}
              >
                <p className="text-xl font-semibold text-[#202F4C]">Inglés</p>
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
