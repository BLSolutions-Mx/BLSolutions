import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
} from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types/root";
import { useGlobalLenis } from "./routes/components/hooks/useGlobalLenis";
import useScrollToTop from "./routes/components/hooks/useScrollToTop";
import Footer from "./routes/components/ui/footer";
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
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
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
