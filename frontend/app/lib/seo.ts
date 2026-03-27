export const BASE_URL = "https://blsolutions.com.mx";

function ogImageUrl(title: string, description: string): string {
  // Strip brand suffix — it's already shown inside the image
  const pageTitle = title.replace(/\s*\|\s*BL Solutions\s*$/i, "").trim();
  const params = new URLSearchParams({ title: pageTitle, description });
  return `${BASE_URL}/og.svg?${params}`;
}

interface MetaOptions {
  title: string;
  description: string;
  /** Absolute path, e.g. "/nosotros" */
  path: string;
}

export function buildMeta({ title, description, path }: MetaOptions) {
  const url = `${BASE_URL}${path}`;
  const image = ogImageUrl(title, description);

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
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}
