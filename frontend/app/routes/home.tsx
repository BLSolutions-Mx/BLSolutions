import type { Route } from "./+types/home";
import About from "./components/home/about";
import ContactSection from "./components/home/contact";
import Coverage from "./components/home/coverage";
import HeroSlider from "./components/home/heroslider";
import Services from "./components/home/services";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";
import WhatsAppFloatingButton from "./components/ui/whatsAppFloatButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Best Logistics Solutions" },
    {
      name: "description",
      content: "Soluciones de transporte, cobertura y logistica para Best Logistics Solutions.",
    },
  ];
}

export default function Home() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />
      <HeroSlider />
      <About />
      <Services />
      <Coverage />
      <ContactSection />
      <WhatsAppFloatingButton />
      <Footer />
    </main>
  );
}
