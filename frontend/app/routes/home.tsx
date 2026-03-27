import type { Route } from "./+types/home";
import HeroSlider from "./components/home/heroslider";
import { buildMeta } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    title: "BL Solutions | Logística sencilla para transporte y consultoría",
    description:
      "BL Solutions ofrece transporte terrestre, intermodal y consultoría logística para operaciones nacionales e internacionales.",
    path: "/",
  });
}

export default function Home() {
  return (
    <main className="min-h-screen text-slate-950">
      <HeroSlider />
    </main>
  );
}
