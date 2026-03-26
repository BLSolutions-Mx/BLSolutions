import { FiLayers } from "react-icons/fi";
import { blsContent } from "../components/home/blsContent";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = blsContent.serviceModes[1];

export function meta() {
  return [
    { title: `${service.title} | BL Solutions` },
    {
      name: "description",
      content: service.description,
    },
  ];
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
