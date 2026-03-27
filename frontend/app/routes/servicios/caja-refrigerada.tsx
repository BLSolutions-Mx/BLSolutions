import { FiThermometer } from "react-icons/fi";
import { buildSeoMeta, OG_IMAGE_PATHS } from "../../lib/seo";
import { blsContent } from "../components/home/blsContent";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = blsContent.serviceModes[2];

export function meta() {
  return buildSeoMeta({
    title: service.title,
    description: service.description,
    path: "/servicios/caja-refrigerada",
    image: OG_IMAGE_PATHS.terrestre,
    keywords: ["caja refrigerada", "transporte refrigerado", "carga perecedera"],
  });
}

export default function CajaRefrigeradaPage() {
  return (
    <ServiceDetailPage
      eyebrow="Terrestre"
      title={service.title}
      description={service.description}
      image={service.image}
      icon={FiThermometer}
    />
  );
}
