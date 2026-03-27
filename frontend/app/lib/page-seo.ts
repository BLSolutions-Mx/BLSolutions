import type { Locale, LocalizedRouteKey } from "./i18n";
import { DEFAULT_OG_IMAGE_ALT, OG_IMAGE_PATHS } from "./seo";

type PageSeoContent = {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  imageAlt?: string;
};

const defaultEnglishAlt = "BL Solutions - transportation, intermodal logistics and consulting";

const pageSeoContent: Record<LocalizedRouteKey, Record<Locale, PageSeoContent>> = {
  home: {
    "es-MX": {
      title: "Logistica sencilla para transporte y consultoria",
      description:
        "BL Solutions ofrece transporte terrestre, intermodal y consultoria logistica para operaciones nacionales e internacionales entre Mexico y Estados Unidos.",
      keywords: [
        "logistica Mexico Estados Unidos",
        "transporte terrestre",
        "intermodal",
        "consultoria logistica",
        "BL Solutions",
      ],
      image: OG_IMAGE_PATHS.home,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "Straightforward logistics for transportation and consulting",
      description:
        "BL Solutions provides ground transportation, intermodal logistics, and consulting for domestic and cross-border operations between Mexico and the United States.",
      keywords: [
        "Mexico United States logistics",
        "ground transportation",
        "intermodal logistics",
        "logistics consulting",
        "BL Solutions",
      ],
      image: OG_IMAGE_PATHS.home,
      imageAlt: defaultEnglishAlt,
    },
  },
  about: {
    "es-MX": {
      title: "Nosotros",
      description:
        "Conoce a BL Solutions, nuestra experiencia en logística México-USA, nuestra visión operativa y los valores que guían cada proyecto.",
      keywords: ["nosotros BL Solutions", "empresa logística", "logística México USA"],
      image: OG_IMAGE_PATHS.nosotros,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "About",
      description:
        "Meet BL Solutions, our Mexico-US logistics experience, our operational mindset, and the values behind every project.",
      keywords: ["about BL Solutions", "logistics company", "Mexico US logistics"],
      image: OG_IMAGE_PATHS.nosotros,
      imageAlt: defaultEnglishAlt,
    },
  },
  services: {
    "es-MX": {
      title: "Servicios logísticos",
      description:
        "Explora las soluciones logísticas de BL Solutions en transporte terrestre, intermodal, aéreo y almacenamiento para operaciones nacionales e internacionales.",
      keywords: ["servicios logísticos", "transporte terrestre", "intermodal", "almacenamiento"],
      image: OG_IMAGE_PATHS.services,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "Logistics services",
      description:
        "Explore BL Solutions logistics services in ground transportation, intermodal, air freight, and warehousing for domestic and international operations.",
      keywords: ["logistics services", "ground transportation", "intermodal", "warehousing"],
      image: OG_IMAGE_PATHS.services,
      imageAlt: defaultEnglishAlt,
    },
  },
  consulting: {
    "es-MX": {
      title: "Consultoría logística",
      description:
        "Consultoría logística para optimizar rutas, costos de transporte, modos de operación y estrategias cross-border entre México y Estados Unidos.",
      keywords: ["consultoría logística", "optimización de rutas", "cross-border México USA"],
      image: OG_IMAGE_PATHS.consultoria,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "Logistics consulting",
      description:
        "Logistics consulting to optimize routes, transportation costs, operating models, and cross-border strategies between Mexico and the United States.",
      keywords: ["logistics consulting", "route optimization", "cross-border Mexico US"],
      image: OG_IMAGE_PATHS.consultoria,
      imageAlt: defaultEnglishAlt,
    },
  },
  ground: {
    "es-MX": {
      title: "Transporte terrestre",
      description:
        "Soluciones de transporte terrestre con caja seca, plataforma, refrigerado y equipo especializado para operaciones nacionales e internacionales.",
      keywords: ["transporte terrestre", "caja seca", "plataforma", "caja refrigerada"],
      image: OG_IMAGE_PATHS.terrestre,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "On The Road transportation",
      description:
        "Ground transportation solutions with dry van, flatbed, reefer, and specialized equipment for domestic and international operations.",
      keywords: ["on the road transportation", "dry van", "flatbed", "reefer"],
      image: OG_IMAGE_PATHS.terrestre,
      imageAlt: defaultEnglishAlt,
    },
  },
  air: {
    "es-MX": {
      title: "Transporte Aéreo",
      description:
        "Soluciones de transporte aéreo para mercancía con urgencia o alto valor. Coordinamos envíos nacionales e internacionales con seguimiento puntual y tiempos de tránsito optimizados.",
      keywords: ["transporte aéreo", "envíos urgentes", "carga de alto valor"],
      image: OG_IMAGE_PATHS.services,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "Air freight",
      description:
        "Air freight solutions for urgent or high-value cargo. We coordinate domestic and international shipments with close follow-up and optimized transit times.",
      keywords: ["air freight", "urgent shipments", "high-value cargo"],
      image: OG_IMAGE_PATHS.services,
      imageAlt: defaultEnglishAlt,
    },
  },
  intermodal: {
    "es-MX": {
      title: "Intermodal",
      description:
        "Soluciones intermodales marítimas y ferroviarias para operaciones de media y larga distancia con foco en costo, estabilidad y visibilidad.",
      keywords: ["transporte intermodal", "intermodal marítimo", "intermodal ferroviario"],
      image: OG_IMAGE_PATHS.intermodal,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "Intermodal",
      description:
        "Rail and ocean intermodal solutions for mid and long-haul operations focused on cost, stability, and visibility.",
      keywords: ["intermodal transportation", "ocean intermodal", "rail intermodal"],
      image: OG_IMAGE_PATHS.intermodal,
      imageAlt: defaultEnglishAlt,
    },
  },
  warehousing: {
    "es-MX": {
      title: "Almacenamiento logístico",
      description:
        "Soluciones de almacenamiento para tu operación logística con control de inventario, seguridad y flexibilidad para coordinar mejor el resguardo y movimiento de tu mercancía.",
      keywords: ["almacenamiento logístico", "control de inventario", "logística"],
      image: OG_IMAGE_PATHS.almacenamiento,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "Logistics warehousing",
      description:
        "Warehousing solutions for your logistics operation with inventory control, security, and flexibility to coordinate storage and cargo movement more effectively.",
      keywords: ["logistics warehousing", "inventory control", "logistics"],
      image: OG_IMAGE_PATHS.almacenamiento,
      imageAlt: defaultEnglishAlt,
    },
  },
  contact: {
    "es-MX": {
      title: "Contacto",
      description:
        "Contacta a BL Solutions para revisar tu operación y definir la mejor solución en transporte, intermodal o consultoría logística.",
      keywords: ["contacto BL Solutions", "cotización logística", "transporte México USA"],
      image: OG_IMAGE_PATHS.contacto,
      imageAlt: DEFAULT_OG_IMAGE_ALT,
    },
    "en-US": {
      title: "Contact",
      description:
        "Contact BL Solutions to review your operation and define the best transportation, intermodal, or logistics consulting solution.",
      keywords: ["contact BL Solutions", "logistics quote", "Mexico US transportation"],
      image: OG_IMAGE_PATHS.contacto,
      imageAlt: defaultEnglishAlt,
    },
  },
};

export function getPageSeo(routeKey: LocalizedRouteKey, locale: Locale) {
  return pageSeoContent[routeKey][locale];
}
