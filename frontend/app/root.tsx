import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  useLocation,
} from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types/root";
import { getLocaleFromPath } from "./lib/i18n";
import { buildOrganizationSchema, buildWebsiteSchema } from "./lib/seo";
import { useGlobalLenis } from "./routes/components/hooks/useGlobalLenis";
import useScrollToTop from "./routes/components/hooks/useScrollToTop";
import Footer from "./routes/components/ui/footer";
import LanguageSelectorPopup from "./routes/components/ui/language-selector";
import Navbar from "./routes/components/ui/navbar";
import "./app.css";
import "lenis/dist/lenis.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);
  const organizationSchema = buildOrganizationSchema(locale);
  const websiteSchema = buildWebsiteSchema(locale, location.pathname);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <PerformanceMode />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useGlobalLenis();
  useScrollToTop();

  return (
    <div id="app-shell" className="min-h-screen">
      <Navbar />
      <LanguageSelectorPopup />
      <Outlet />
      <Footer />
    </div>
  );
}

function PerformanceMode() {
  useEffect(() => {
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPerformanceMode = () => {
      const shouldOptimize =
        coarsePointerQuery.matches || reducedMotionQuery.matches;

      document.body.classList.toggle("mobile-performance", shouldOptimize);
    };

    syncPerformanceMode();

    coarsePointerQuery.addEventListener("change", syncPerformanceMode);
    reducedMotionQuery.addEventListener("change", syncPerformanceMode);

    return () => {
      coarsePointerQuery.removeEventListener("change", syncPerformanceMode);
      reducedMotionQuery.removeEventListener("change", syncPerformanceMode);
      document.body.classList.remove("mobile-performance");
    };
  }, []);

  return null;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const locale =
    typeof window !== "undefined" ? getLocaleFromPath(window.location.pathname) : getLocaleFromPath("/");
  let message = locale === "en-US" ? "Oops!" : "Oops!";
  let details =
    locale === "en-US" ? "An unexpected error occurred." : "Ocurrió un error inesperado.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? locale === "en-US"
          ? "The requested page could not be found."
          : "No se encontró la página solicitada."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
