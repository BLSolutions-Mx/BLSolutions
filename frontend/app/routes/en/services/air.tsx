import { buildLocalizedPageMeta } from "../../../lib/build-page-meta";
import { AirPage } from "../../servicios/aereo";

export function meta() {
  return buildLocalizedPageMeta("air", "en-US");
}

export default function EnglishAirPage() {
  return <AirPage locale="en-US" />;
}
