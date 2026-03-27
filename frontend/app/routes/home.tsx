import type { Route } from "./+types/home";
import { buildSeoMeta, OG_IMAGE_PATHS } from "../lib/seo";
import HeroSlider from "./components/home/heroslider";

export function meta({}: Route.MetaArgs) {
  return buildSeoMeta({
    title: "Logistica sencilla para transporte y consultoria",
    description:
      "BL Solutions ofrece transporte terrestre, intermodal y consultoria logistica para operaciones nacionales e internacionales entre Mexico y Estados Unidos.",
    path: "/",
    image: OG_IMAGE_PATHS.home,
    keywords: [
      "logistica Mexico Estados Unidos",
      "transporte terrestre",
      "intermodal",
      "consultoria logistica",
      "BL Solutions",
    ],
  });
}

export default function Home() {
  return (
    <main className="min-h-screen text-slate-950">
      <HeroSlider />
    </main>
  );
}
