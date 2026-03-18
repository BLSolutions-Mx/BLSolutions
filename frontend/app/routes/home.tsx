import type { Route } from "./+types/home";
import HeroSlider from "./components/home/heroslider";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";

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
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />
      <HeroSlider />
      <Footer />
    </main>
  );
}
