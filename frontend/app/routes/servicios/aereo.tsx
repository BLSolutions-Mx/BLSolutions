import { FiSend } from "react-icons/fi";
import { buildLocalizedPageMeta } from "../../lib/build-page-meta";
import type { Locale } from "../../lib/i18n";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const serviceByLocale = {
  "es-MX": {
    eyebrow: "Aéreo",
    title: "Transporte Aéreo",
    description:
      "Soluciones de transporte aéreo para mercancía con urgencia o alto valor. Coordinamos envíos nacionales e internacionales con seguimiento puntual y tiempos de tránsito optimizados.",
    image: "/imgs/aereo.avif",
    backLabel: "Volver a servicios",
    contactLabel: "Contactar",
  },
  "en-US": {
    eyebrow: "Air",
    title: "Air Freight",
    description:
      "Air freight solutions for urgent or high-value cargo. We coordinate domestic and international shipments with close follow-up and optimized transit times.",
    image: "/imgs/aereo.avif",
    backLabel: "Back to services",
    contactLabel: "Contact us",
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    backLabel: string;
    contactLabel: string;
  }
>;

type AirPageProps = { locale: Locale };

export function meta() {
  return buildLocalizedPageMeta("air", "es-MX");
}

export function AirPage({ locale }: AirPageProps) {
  const service = serviceByLocale[locale];

  return <ServiceDetailPage locale={locale} icon={FiSend} {...service} />;
}

export default function AereoPage() {
  return <AirPage locale="es-MX" />;
}
