import { FiThermometer } from "react-icons/fi";
import { blsContent } from "../components/home/blsContent";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const service = blsContent.serviceModes[2];

export function meta() {
  return [
    { title: `${service.title} | BL Solutions` },
    {
      name: "description",
      content: service.description,
    },
  ];
}

export default function CajaRefrigeradaPage() {
  return (
    <ServiceDetailPage
      eyebrow="On the Road"
      title={service.title}
      description={service.description}
      image={service.image}
      icon={FiThermometer}
    />
  );
}
