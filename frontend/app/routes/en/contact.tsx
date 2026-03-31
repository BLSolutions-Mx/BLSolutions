import { buildLocalizedPageMeta } from "../../lib/build-page-meta";
import { ContactPage } from "../contacto";

export { action } from "../contacto";

export function meta() {
  return buildLocalizedPageMeta("contact", "en-US");
}

export default function EnglishContactPage() {
  return <ContactPage locale="en-US" />;
}
