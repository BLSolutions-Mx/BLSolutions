import { FiPackage } from "react-icons/fi";
import { buildSeoMeta, OG_IMAGE_PATHS } from "../../lib/seo";
import { blsContent } from "../components/home/blsContent";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = blsContent.serviceModes[0];

export function meta() {
  return buildSeoMeta({
    title: service.title,
    description: service.description,
    path: "/servicios/caja-seca",
    image: OG_IMAGE_PATHS.terrestre,
    keywords: ["caja seca 53", "transporte terrestre", "carga general"],
  });
}

export default function CajaSecaPage() {
  return (
    <ServiceDetailPage
      eyebrow="Terrestre"
      title={service.title}
      description={service.description}
      image={service.image}
      icon={FiPackage}
    />
  );
}
