import type { Route } from "./+types/home";
import About from "./components/home/about";
import Approach from "./components/home/approach";
import ContactSection from "./components/home/contact";
import Coverage from "./components/home/coverage";
import HeroSlider from "./components/home/heroslider";
import Services from "./components/home/services";
import SupportServices from "./components/home/supportServices";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";
import WhatsAppFloatingButton from "./components/ui/whatsAppFloatButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BL Solutions | Logistica integral Mexico-USA" },
    {
      name: "description",
      content:
        "BL Solutions coordina transporte, aduana, almacenamiento y seguimiento para operaciones logisticas Mexico-USA.",
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
      <SupportServices />
      <Approach />
      <Coverage />
      <ContactSection />
      <WhatsAppFloatingButton />
      <Footer />
    </main>
  );
}
