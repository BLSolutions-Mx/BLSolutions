import type { Locale } from "../../../lib/i18n";

export interface ServiceMode {
  key: string;
  title: string;
  image: string;
  description: string;
}

export interface BlsContent {
  consultancy: {
    intro: string;
    approach: string[];
    areas: string[];
  };
  nextStep: {
    action: string;
    benefits: string[];
    conditions: string;
  };
  contact: {
    phones: {
      country: string;
      numbers: string[];
    }[];
    email: string;
    addressLines: string[];
  };
  serviceModes: ServiceMode[];
}

const sharedContact = {
  phones: [
    {
      country: "Mexico",
      numbers: ["+52 5582323839", "+52 5549183873"],
    },
    {
      country: "United States",
      numbers: ["+1 832 671 7796"],
    },
  ],
  email: "operations@blsolutions.com.mx",
  addressLines: ["Av. Paseo de la Reforma 369, Col. Cuauhtémoc", "06500 Ciudad de México"],
};

const contentByLocale: Record<Locale, BlsContent> = {
  "es-MX": {
    consultancy: {
      intro:
        "En BL Solutions ofrecemos servicios de consultoría logística para empresas que buscan optimizar sus operaciones de transporte y cadena de suministro.",
      approach: [
        "Entender. Comprendemos a profundidad la operación logística del cliente, sus flujos, restricciones, niveles de servicio y objetivos de negocio.",
        "Analizar. Identificamos oportunidades de mejora en costos, tiempos, seguridad y sostenibilidad para priorizar acciones con impacto real.",
        "Diseñar. Desarrollamos una solución logística a la medida que puede incluir rediseño operativo, almacenamiento, cumplimiento y ajustes de modalidad.",
        "Operar. Implementamos y gestionamos el proyecto para convertir la estrategia en una operación funcional, medible y sostenible.",
      ],
      areas: [
        "Análisis de operaciones logísticas",
        "Cumplimiento CTPAT",
        "Diseño de operaciones de almacenamiento",
        "Optimización de cadenas de suministro",
        "Transición a logística intermodal",
        "Optimización de operaciones cross-border",
      ],
    },
    nextStep: {
      action: "Revisemos tu operación y definamos la mejor solución logística.",
      benefits: [
        "Análisis práctico de la operación",
        "Recomendaciones claras",
        "Ejecución eficiente",
      ],
      conditions: "Sin complicaciones y con enfoque directo.",
    },
    contact: sharedContact,
    serviceModes: [
      {
        key: "caja-seca",
        title: "Caja Seca 53",
        image: "/imgs/terrestre-dryvan.avif",
        description:
          "Ideal para el transporte de mercancía general que no requiere control de temperatura. Este tipo de remolque cerrado protege la carga de las condiciones climáticas y es una de las soluciones más utilizadas para envíos nacionales y transfronterizos.",
      },
      {
        key: "plataforma",
        title: "Plataforma",
        image: "/imgs/terrestre-flatbed.avif",
        description:
          "Utilizada para transportar carga sobredimensionada, maquinaria o materiales que no pueden transportarse dentro de un remolque cerrado. Permite mayor flexibilidad para carga y descarga desde diferentes ángulos.",
      },
      {
        key: "reefer",
        title: "Caja Refrigerada",
        image: "/imgs/terrestre-reefer.avif",
        description:
          "Remolques con control de temperatura diseñados para transportar productos perecederos o sensibles al clima, manteniendo condiciones térmicas estables durante todo el trayecto.",
      },
      {
        key: "tanque",
        title: "Tanque",
        image: "/imgs/terrestre-tanque.avif",
        description:
          "Transporte especializado de líquidos, gases y materiales a granel mediante remolques cisterna que cumplen con las normativas de seguridad para productos químicos, combustibles y otros fluidos industriales.",
      },
      {
        key: "caja-seca-40-full",
        title: "Caja Seca de 40' Full",
        image: "/imgs/terrestre-40full.avif",
        description:
          "Configuración de doble remolque (full) con cajas de 40 pies, diseñada para maximizar la capacidad de carga en operaciones de alto volumen y trayectos de larga distancia.",
      },
      {
        key: "torton-rabon",
        title: "Camión Torton y Rabón",
        image: "/imgs/terrestre-torton.avif",
        description:
          "Unidades de carga media ideales para distribución urbana, entregas de última milla y rutas donde el acceso para remolques completos es limitado. Ofrecen versatilidad y agilidad operativa.",
      },
      {
        key: "encortinado",
        title: "Remolque Encortinado",
        image: "/imgs/terrestre-encortinado.avif",
        description:
          "Remolque con cortinas laterales que facilita la carga y descarga lateral, ideal para mercancías paletizadas, materiales de construcción y operaciones que requieren acceso rápido desde los costados.",
      },
      {
        key: "cama-baja",
        title: "Cama Baja (Lowboy)",
        image: "/imgs/terrestre-camabaja.avif",
        description:
          "Plataforma de piso bajo especializada para el transporte de maquinaria pesada, equipos industriales y carga de gran altura que excede las dimensiones estándar de un remolque convencional.",
      },
      {
        key: "tolva-alimenticia",
        title: "Tolva de Grado Alimenticio",
        image: "/imgs/terrestre-tolva.avif",
        description:
          "Remolque tipo tolva certificado para el transporte de granos, harinas y productos alimenticios a granel, garantizando condiciones de higiene y cumplimiento de normativas sanitarias durante todo el trayecto.",
      },
    ],
  },
  "en-US": {
    consultancy: {
      intro:
        "At BL Solutions, we provide logistics consulting services for companies that need to optimize transportation operations and supply chain performance.",
      approach: [
        "Understand. We study the client's logistics operation in depth, including flows, constraints, service levels, and business goals.",
        "Analyze. We identify improvement opportunities in cost, transit time, security, and sustainability to prioritize actions with real impact.",
        "Design. We develop a tailored logistics solution that can include operating model redesign, warehousing, compliance, and mode adjustments.",
        "Operate. We implement and manage the project to turn strategy into a functional, measurable, and sustainable operation.",
      ],
      areas: [
        "Logistics operations analysis",
        "CTPAT compliance",
        "Warehouse operation design",
        "Supply chain optimization",
        "Intermodal transition planning",
        "Cross-border operations optimization",
      ],
    },
    nextStep: {
      action: "Let's review your operation and define the right logistics solution.",
      benefits: [
        "Practical operational analysis",
        "Clear recommendations",
        "Efficient execution",
      ],
      conditions: "Straightforward and execution-focused.",
    },
    contact: sharedContact,
    serviceModes: [
      {
        key: "dry-van",
        title: "53' Dry Van",
        image: "/imgs/terrestre-dryvan.avif",
        description:
          "Ideal for general cargo that does not require temperature control. This enclosed trailer protects freight from weather conditions and is one of the most common solutions for domestic and cross-border shipping.",
      },
      {
        key: "flatbed",
        title: "Flatbed",
        image: "/imgs/terrestre-flatbed.avif",
        description:
          "Used for oversized cargo, machinery, or materials that cannot move inside an enclosed trailer. It offers more flexibility for loading and unloading from multiple angles.",
      },
      {
        key: "reefer",
        title: "Reefer",
        image: "/imgs/terrestre-reefer.avif",
        description:
          "Temperature-controlled trailers designed for perishables or climate-sensitive products, maintaining stable thermal conditions throughout the trip.",
      },
      {
        key: "tank",
        title: "Tank Trailer",
        image: "/imgs/terrestre-tanque.avif",
        description:
          "Specialized transportation for liquids, gases, and bulk materials using tank trailers that meet safety requirements for chemicals, fuels, and other industrial fluids.",
      },
      {
        key: "40-full",
        title: "40' Double Trailer",
        image: "/imgs/terrestre-40full.avif",
        description:
          "A double-trailer configuration designed to maximize freight capacity in high-volume operations and long-haul routes.",
      },
      {
        key: "torton",
        title: "Torton and Medium-Duty Truck",
        image: "/imgs/terrestre-torton.avif",
        description:
          "Mid-size units ideal for urban distribution, last-mile deliveries, and routes where access for full trailers is limited. They provide versatility and operational agility.",
      },
      {
        key: "curtain-side",
        title: "Curtain Side Trailer",
        image: "/imgs/terrestre-encortinado.avif",
        description:
          "A trailer with side curtains that simplifies side loading and unloading, ideal for palletized goods, construction materials, and operations that need fast access from the sides.",
      },
      {
        key: "lowboy",
        title: "Lowboy",
        image: "/imgs/terrestre-camabaja.avif",
        description:
          "A low-deck platform specialized for heavy machinery, industrial equipment, and tall cargo that exceeds the standard dimensions of a conventional trailer.",
      },
      {
        key: "food-grade-hopper",
        title: "Food-Grade Hopper",
        image: "/imgs/terrestre-tolva.avif",
        description:
          "A certified hopper trailer for grains, flour, and bulk food products, ensuring hygiene and sanitary compliance throughout the route.",
      },
    ],
  },
};

export function getBlsContent(locale: Locale) {
  return contentByLocale[locale];
}
