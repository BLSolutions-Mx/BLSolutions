import { buildLocalizedPageMeta } from "../../lib/build-page-meta";
import { ServicesPage } from "../servicios";

export function meta() {
  return buildLocalizedPageMeta("services", "en-US");
}

export default function EnglishServices() {
  return <ServicesPage locale="en-US" />;
}
