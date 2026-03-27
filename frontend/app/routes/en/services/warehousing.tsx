import { buildLocalizedPageMeta } from "../../../lib/build-page-meta";
import { WarehousingPage } from "../../servicios/almacenamiento";

export function meta() {
  return buildLocalizedPageMeta("warehousing", "en-US");
}

export default function EnglishWarehousingPage() {
  return <WarehousingPage locale="en-US" />;
}
