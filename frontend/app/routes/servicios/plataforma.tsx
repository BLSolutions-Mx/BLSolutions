import { FiLayers } from "react-icons/fi";
import { buildSeoMeta, OG_IMAGE_PATHS } from "../../lib/seo";
import { blsContent } from "../components/home/blsContent";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = blsContent.serviceModes[1];

export function meta() {
  return buildSeoMeta({
    title: service.title,
    description: service.description,
    path: "/servicios/plataforma",
    image: OG_IMAGE_PATHS.terrestre,
    keywords: ["plataforma", "carga sobredimensionada", "transporte de maquinaria"],
  });
}

export default function PlataformaPage() {
  return (
    <ServiceDetailPage
      eyebrow="Terrestre"
      title={service.title}
      description={service.description}
      image={service.image}
      icon={FiLayers}
    />
  );
}
