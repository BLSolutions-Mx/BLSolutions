import { FiSend } from "react-icons/fi";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = {
  eyebrow: "Aéreo",
  title: "Transporte Aéreo",
  description:
    "Soluciones de transporte aéreo para mercancía con urgencia o alto valor. Coordinamos envíos nacionales e internacionales con seguimiento puntual y tiempos de tránsito optimizados.",
  image: "/imgs/aereo.avif",
};

import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta({
    title: `${service.title} | BL Solutions`,
    description: service.description,
    path: "/servicios/aereo",
    image: "/og/og-image.jpg",
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
