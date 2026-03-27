import { buildLocalizedPageMeta } from "../../lib/build-page-meta";
import { ConsultingPage } from "../consultoria";

export function meta() {
  return buildLocalizedPageMeta("consulting", "en-US");
}

export default function EnglishConsulting() {
  return <ConsultingPage locale="en-US" />;
}
