import { FiArchive } from "react-icons/fi";
import { buildLocalizedPageMeta } from "../../lib/build-page-meta";
import type { Locale } from "../../lib/i18n";
import ServiceDetailPage from "../components/services/serviceDetailPage";

const serviceByLocale = {
  "es-MX": {
    eyebrow: "Almacenamiento",
    title: "Almacenamiento logístico",
    description:
      "Soluciones de almacenamiento para tu operación logística con control de inventario, seguridad y flexibilidad para coordinar mejor el resguardo y movimiento de tu mercancía.",
    image: "/imgs/almacen_service.avif",
    backLabel: "Volver a servicios",
    contactLabel: "Contactar",
  },
  "en-US": {
    eyebrow: "Warehousing",
    title: "Logistics Warehousing",
    description:
      "Warehousing solutions for your logistics operation with inventory control, security, and flexibility to coordinate storage and cargo movement more effectively.",
    image: "/imgs/almacen_service.avif",
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

type WarehousingPageProps = { locale: Locale };

export function meta() {
  return buildLocalizedPageMeta("warehousing", "es-MX");
}

export function WarehousingPage({ locale }: WarehousingPageProps) {
  const service = serviceByLocale[locale];

  return <ServiceDetailPage locale={locale} icon={FiArchive} {...service} />;
}

export default function AlmacenamientoPage() {
  return <WarehousingPage locale="es-MX" />;
}
