import { FiArchive } from "react-icons/fi";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = {
  eyebrow: "Almacenamiento",
  title: "Almacenamiento logístico",
  description:
    "Soluciones de almacenamiento para tu operación logística con control de inventario, seguridad y flexibilidad para coordinar mejor el resguardo y movimiento de tu mercancía.",
  image: "/imgs/almacen_service.avif",
};

export function meta() {
  return [
    { title: `${service.title} | BL Solutions` },
    {
      name: "description",
      content: service.description,
    },
  ];
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
