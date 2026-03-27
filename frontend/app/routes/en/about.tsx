import { buildLocalizedPageMeta } from "../../lib/build-page-meta";
import { AboutPage } from "../nosotros";

export function meta() {
  return buildLocalizedPageMeta("about", "en-US");
}

export default function EnglishAbout() {
  return <AboutPage locale="en-US" />;
}
