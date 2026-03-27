import { buildLocalizedPageMeta } from "../../../lib/build-page-meta";
import { IntermodalPage } from "../../servicios/intermodal";

export function meta() {
  return buildLocalizedPageMeta("intermodal", "en-US");
}

export default function EnglishIntermodalPage() {
  return <IntermodalPage locale="en-US" />;
}
