import { buildLocalizedPageMeta } from "../lib/build-page-meta";
import type { Locale } from "../lib/i18n";
import HeroSlider from "./components/home/heroslider";

type HomePageProps = {
  locale: Locale;
};

export function meta() {
  return buildLocalizedPageMeta("home", "es-MX");
}

export function HomePage({ locale }: HomePageProps) {
  return (
    <main className="min-h-screen text-slate-950">
      <HeroSlider locale={locale} />
    </main>
  );
}

export default function Home() {
  return <HomePage locale="es-MX" />;
}
