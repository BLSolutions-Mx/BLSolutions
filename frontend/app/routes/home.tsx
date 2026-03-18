import type { Route } from "./+types/home";
import HeroSlider from "./components/home/heroslider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BL Solutions | Logística sencilla para transporte y consultoría" },
    {
      name: "description",
      content:
        "BL Solutions ofrece transporte terrestre, intermodal y consultoría logística para operaciones nacionales e internacionales.",
    },
  ];
}

export default function Home() {
  return (
    <main className="min-h-screen text-slate-950">
      <HeroSlider />
    </main>
  );
}
