import { FiSend } from "react-icons/fi";
import { buildSeoMeta, OG_IMAGE_PATHS } from "../../lib/seo";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = {
  eyebrow: "Aéreo",
  title: "Transporte Aéreo",
  description:
    "Soluciones de transporte aéreo para mercancía con urgencia o alto valor. Coordinamos envíos nacionales e internacionales con seguimiento puntual y tiempos de tránsito optimizados.",
  image: "/imgs/aereo.avif",
};

export function meta() {
  return buildSeoMeta({
    title: service.title,
    description: service.description,
    path: "/servicios/aereo",
    image: OG_IMAGE_PATHS.services,
    keywords: ["transporte aéreo", "envíos urgentes", "carga de alto valor"],
  });
}

export default function AereoPage() {
  return (
    <ServiceDetailPage
      eyebrow={service.eyebrow}
      title={service.title}
      description={service.description}
      image={service.image}
      icon={FiSend}
    />
  );
}
