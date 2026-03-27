import { buildLocalizedPageMeta } from "../../../lib/build-page-meta";
import { GroundPage } from "../../servicios/terrestre";

export function meta() {
  return buildLocalizedPageMeta("ground", "en-US");
}

export default function EnglishGroundPage() {
  return <GroundPage locale="en-US" />;
}
