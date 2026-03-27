export const BASE_URL = "https://blsolutions.com.mx";

interface MetaOptions {
  title: string;
  description: string;
  /** Absolute path, e.g. "/nosotros" */
  path: string;
  /** Path to image in /public, e.g. "/imgs/hero_terrestre.avif" */
  image: string;
}

export function buildMeta({ title, description, path, image }: MetaOptions) {
  const url = `${BASE_URL}${path}`;
  const imageUrl = `${BASE_URL}${image}`;

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "BL Solutions" },
    { property: "og:locale", content: "es_MX" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
}
