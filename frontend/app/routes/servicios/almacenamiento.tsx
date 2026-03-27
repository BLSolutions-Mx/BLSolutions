import { FiArchive } from "react-icons/fi";
import { buildSeoMeta, OG_IMAGE_PATHS } from "../../lib/seo";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = {
  eyebrow: "Almacenamiento",
  title: "Almacenamiento logístico",
  description:
    "Soluciones de almacenamiento para tu operación logística con control de inventario, seguridad y flexibilidad para coordinar mejor el resguardo y movimiento de tu mercancía.",
  image: "/imgs/almacen_service.avif",
};

export function meta() {
  return buildSeoMeta({
    title: service.title,
    description: service.description,
    path: "/servicios/almacenamiento",
    image: OG_IMAGE_PATHS.almacenamiento,
    keywords: ["almacenamiento logístico", "control de inventario", "logística"],
  });
}

export default function AlmacenamientoPage() {
  return (
    <ServiceDetailPage
      eyebrow={service.eyebrow}
      title={service.title}
      description={service.description}
      image={service.image}
      icon={FiArchive}
    />
  );
}
