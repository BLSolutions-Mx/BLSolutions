export type Locale = "es-MX" | "en-US";

export type LocalizedRouteKey =
  | "home"
  | "about"
  | "services"
  | "consulting"
  | "ground"
  | "air"
  | "intermodal"
  | "warehousing"
  | "contact";

export type LocalizedPathMap = Record<LocalizedRouteKey, Record<Locale, string>>;

export const DEFAULT_LOCALE: Locale = "es-MX";
export const ENGLISH_LOCALE: Locale = "en-US";

export const localizedPathMap: LocalizedPathMap = {
  home: {
    "es-MX": "/",
    "en-US": "/en",
  },
  about: {
    "es-MX": "/nosotros",
    "en-US": "/en/about",
  },
  services: {
    "es-MX": "/servicios",
    "en-US": "/en/services",
  },
  consulting: {
    "es-MX": "/consultoria",
    "en-US": "/en/consulting",
  },
  ground: {
    "es-MX": "/servicios/terrestre",
    "en-US": "/en/services/on-the-road",
  },
  air: {
    "es-MX": "/servicios/aereo",
    "en-US": "/en/services/air",
  },
  intermodal: {
    "es-MX": "/servicios/intermodal",
    "en-US": "/en/services/intermodal",
  },
  warehousing: {
    "es-MX": "/servicios/almacenamiento",
    "en-US": "/en/services/warehousing",
  },
  contact: {
    "es-MX": "/contacto",
    "en-US": "/en/contact",
  },
};

function trimTrailingSlash(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

export function normalizePathname(pathname: string) {
  if (!pathname) {
    return "/";
  }

  return trimTrailingSlash(pathname.startsWith("/") ? pathname : `/${pathname}`);
}

export function getLocaleFromPath(pathname: string): Locale {
  const normalizedPathname = normalizePathname(pathname);
  return normalizedPathname === "/en" || normalizedPathname.startsWith("/en/")
    ? ENGLISH_LOCALE
    : DEFAULT_LOCALE;
}

export function getLocalizedPath(routeKey: LocalizedRouteKey, locale: Locale) {
  return localizedPathMap[routeKey][locale];
}

export function getRouteKeyFromPath(pathname: string): LocalizedRouteKey | null {
  const normalizedPathname = normalizePathname(pathname);

  for (const [routeKey, paths] of Object.entries(localizedPathMap) as Array<
    [LocalizedRouteKey, Record<Locale, string>]
  >) {
    if (
      normalizedPathname === normalizePathname(paths["es-MX"]) ||
      normalizedPathname === normalizePathname(paths["en-US"])
    ) {
      return routeKey;
    }
  }

  return null;
}

export function switchLocalePath(pathname: string, targetLocale: Locale) {
  const routeKey = getRouteKeyFromPath(pathname);

  if (!routeKey) {
    return targetLocale === ENGLISH_LOCALE
      ? `/en${normalizePathname(pathname === "/" ? "" : pathname)}`
      : pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  }

  return getLocalizedPath(routeKey, targetLocale);
}

export function getAlternateLanguageLinks(pathname: string) {
  const routeKey = getRouteKeyFromPath(pathname);

  if (!routeKey) {
    return [
      { hrefLang: "es-MX", path: "/" },
      { hrefLang: "en-US", path: "/en" },
      { hrefLang: "x-default", path: "/" },
    ];
  }

  return [
    { hrefLang: "es-MX", path: getLocalizedPath(routeKey, "es-MX") },
    { hrefLang: "en-US", path: getLocalizedPath(routeKey, "en-US") },
    { hrefLang: "x-default", path: "/" },
  ];
}

export function getHtmlLang(locale: Locale) {
  return locale;
}

export function getOpenGraphLocale(locale: Locale) {
  return locale === "en-US" ? "en_US" : "es_MX";
}

export function getAlternateOpenGraphLocale(locale: Locale) {
  return locale === "en-US" ? "es_MX" : "en_US";
}

export function isEnglishPreferred() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const [primaryLanguage = ""] = navigator.languages ?? [navigator.language ?? ""];
  return primaryLanguage.toLowerCase().startsWith("en");
}
