import { FiGitBranch } from "react-icons/fi";
import { blsContent } from "../components/home/blsContent";
import ServiceDetailPage from "../components/services/serviceDetailPage";

export function meta() {
  return [
    { title: "Intermodal | BL Solutions" },
    {
      name: "description",
      content: blsContent.intermodal.description,
    },
  ];
}

export default function IntermodalPage() {
  return (
    <ServiceDetailPage
      eyebrow="Intermodal"
      title={blsContent.intermodal.title}
      description={blsContent.intermodal.description}
      image="/home-imgs/train-1.avif"
      icon={FiGitBranch}
    />
  );
}
