import { renderToStaticMarkup } from "react-dom/server";
import type { LoaderFunctionArgs } from "react-router";

/** Wraps text into lines of at most `max` characters, up to `maxLines`. */
function wrapText(text: string, max: number, maxLines: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > max) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function OgImage({ title, description }: { title: string; description: string }) {
  const titleLines = wrapText(title, 28, 2);
  const descLines = wrapText(description, 58, 2);

  const titleY = 320 - (titleLines.length - 1) * 44;
  const descStartY = titleY + titleLines.length * 88 + 20;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="630"
      viewBox="0 0 1200 630"
    >
      {/* Background */}
      <rect width="1200" height="630" fill="#0d1b2e" />

      {/* Left edge accent */}
      <rect x="0" y="0" width="6" height="630" fill="#015095" />

      {/* Bottom gradient band */}
      <rect x="0" y="580" width="1200" height="50" fill="#0a1624" />

      {/* Brand accent bar */}
      <rect x="80" y="64" width="8" height="34" rx="4" fill="#015095" />

      {/* Brand name */}
      <text
        x="104"
        y="90"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="-0.3"
      >
        BL Solutions
      </text>

      {/* Title lines */}
      {titleLines.map((line, i) => (
        <text
          key={i}
          x="80"
          y={titleY + i * 88}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="76"
          fontWeight="800"
          fill="#ffffff"
          letterSpacing="-2"
        >
          {line}
        </text>
      ))}

      {/* Description lines */}
      {descLines.map((line, i) => (
        <text
          key={i}
          x="80"
          y={descStartY + i * 40}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="28"
          fontWeight="400"
          fill="#7a95b0"
        >
          {line}
        </text>
      ))}

      {/* Footer divider */}
      <rect x="80" y="556" width="48" height="4" rx="2" fill="#015095" />

      {/* Domain */}
      <text
        x="144"
        y="560"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="22"
        fontWeight="500"
        fill="#4a6278"
      >
        blsolutions.com.mx
      </text>
    </svg>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "BL Solutions";
  const description = searchParams.get("description") ?? "";

  const markup = renderToStaticMarkup(
    <OgImage title={title} description={description} />
  );
  const svg = `<?xml version="1.0" encoding="UTF-8"?>${markup}`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
}
