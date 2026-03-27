import { getAlternateLanguageLinks, getLocalizedPath, type Locale, type LocalizedRouteKey } from "./i18n";
import { getPageSeo } from "./page-seo";
import { buildSeoMeta } from "./seo";

export function buildLocalizedPageMeta(routeKey: LocalizedRouteKey, locale: Locale) {
  const seo = getPageSeo(routeKey, locale);
  const path = getLocalizedPath(routeKey, locale);

  return buildSeoMeta({
    locale,
    title: seo.title,
    description: seo.description,
    path,
    canonicalPath: path,
    image: seo.image,
    imageAlt: seo.imageAlt,
    keywords: seo.keywords,
    alternateLanguages: getAlternateLanguageLinks(path),
  });
}
