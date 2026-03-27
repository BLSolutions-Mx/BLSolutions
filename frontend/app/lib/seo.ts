const DEFAULT_SITE_URL = "https://blsolutions.com.mx";

export const SITE_NAME = "BL Solutions";
export const SITE_LOCALE = "es_MX";
export const DEFAULT_OG_IMAGE_ALT =
  "BL Solutions - transporte, intermodal y consultoria logistica";

export const OG_IMAGE_PATHS = {
  default: "/og/og-image.jpg",
  home: "/og/og-image.jpg",
  services: "/og/og-services.jpg",
  terrestre: "/og/og-terrestre.jpg",
  intermodal: "/og/og-intermodal.jpg",
  consultoria: "/og/og-consulting.jpg",
  nosotros: "/og/og-nosotros.jpg",
  contacto: "/og/og-contacto.jpg",
  almacenamiento: "/og/og-almacenamiento.jpg",
} as const;

const DEFAULT_OG_IMAGE_PATH = OG_IMAGE_PATHS.default;

type SeoType = "website" | "article";

type SeoMetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { tagName: "link"; rel: string; href: string };

type SeoMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: SeoType;
  noindex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  authors?: string[];
};

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const envSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
  return trimTrailingSlash(envSiteUrl || DEFAULT_SITE_URL);
}

export function toAbsoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function buildSeoMeta({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE_PATH,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = "website",
  noindex = false,
  keywords = [],
  publishedTime,
  modifiedTime,
  section,
  authors = [],
}: SeoMetaInput): SeoMetaDescriptor[] {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);
  const imageType = imageUrl.endsWith(".png")
    ? "image/png"
    : imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")
      ? "image/jpeg"
      : undefined;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { name: "author", content: SITE_NAME },
    { name: "format-detection", content: "telephone=no" },
    { name: "theme-color", content: "#0B1120" },
    ...(keywords.length > 0
      ? [{ name: "keywords", content: keywords.join(", ") } satisfies SeoMetaDescriptor]
      : []),
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { property: "og:locale", content: SITE_LOCALE },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: type },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    ...(imageType ? [{ property: "og:image:type", content: imageType } satisfies SeoMetaDescriptor] : []),
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
    ...(type === "article" && publishedTime
      ? [{ property: "article:published_time", content: publishedTime } satisfies SeoMetaDescriptor]
      : []),
    ...(type === "article" && modifiedTime
      ? [{ property: "article:modified_time", content: modifiedTime } satisfies SeoMetaDescriptor]
      : []),
    ...(type === "article" && section
      ? [{ property: "article:section", content: section } satisfies SeoMetaDescriptor]
      : []),
    ...authors.map(
      (author) =>
        ({
          property: "article:author",
          content: author,
        }) satisfies SeoMetaDescriptor,
    ),
  ];
}

export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: toAbsoluteUrl("/bls_logo.webp"),
    image: toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH),
    email: "operations@blsolutions.com.mx",
    telephone: "+52 55 8232 3839",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paseo de la Reforma 369, Col. Cuauhtemoc",
      addressLocality: "Ciudad de Mexico",
      postalCode: "06500",
      addressCountry: "MX",
    },
    areaServed: ["Mexico", "United States"],
  };
}

export function buildWebsiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: "es-MX",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}
