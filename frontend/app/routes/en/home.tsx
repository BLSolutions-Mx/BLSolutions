import { buildLocalizedPageMeta } from "../../lib/build-page-meta";
import { HomePage } from "../home";

export function meta() {
  return buildLocalizedPageMeta("home", "en-US");
}

export default function EnglishHome() {
  return <HomePage locale="en-US" />;
}
