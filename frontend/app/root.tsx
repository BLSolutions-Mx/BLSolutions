import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useEffect } from "react";
import type Lenis from "lenis";

import type { Route } from "./+types/root";
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
        <GlobalLenis />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function useRevealObserver() {
  const location = useLocation();

  useEffect(() => {
    const selector = ".reveal-up, .reveal-left, .reveal-scale";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
      if (!el.classList.contains("is-visible")) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [location.pathname]);
}

export default function App() {
  // #region agent log
  const location = useLocation();
  useEffect(() => {
    const mountTime = performance.now();
    fetch('http://127.0.0.1:7873/ingest/6f36cead-20c8-4c23-af80-3f36f10adb2a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3fbf0e'},body:JSON.stringify({sessionId:'3fbf0e',location:'root.tsx:App',message:'Route changed',data:{pathname:location.pathname,mountTime_ms:mountTime,isMobile:window.innerWidth<768},timestamp:Date.now(),hypothesisId:'E',runId:'post-fix'})}).catch(()=>{});
  }, [location.pathname]);
  // #endregion

  useRevealObserver();

  return (
    <div id="app-shell" className="min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function GlobalLenis() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    // #region agent log
    const lenisStartTime = performance.now();
    fetch('http://127.0.0.1:7873/ingest/6f36cead-20c8-4c23-af80-3f36f10adb2a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3fbf0e'},body:JSON.stringify({sessionId:'3fbf0e',location:'root.tsx:GlobalLenis',message:'Lenis setup check',data:{isTouchDevice,timestamp_ms:lenisStartTime},timestamp:Date.now(),hypothesisId:'A',runId:'post-fix'})}).catch(()=>{});
    // #endregion

    if (isTouchDevice) return;

    let lenisInstance: Lenis | null = null;

    const setupLenis = async () => {
      const { default: Lenis } = await import("lenis");

      lenisInstance = new Lenis({
        autoRaf: true,
        anchors: true,
      });
    };

    void setupLenis();

    return () => {
      lenisInstance?.destroy();
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
