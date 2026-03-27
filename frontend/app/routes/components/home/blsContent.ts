export interface ServiceMode {
  key: string;
  title: string;
  image: string;
  description: string;
}

export interface TerrestrialSubService {
  key: string;
  title: string;
  image: string;
  description: string;
}

export interface TerrestrialService {
  key: "terrestre";
  title: string;
  summary: string;
  type: "subservices";
  subServices: TerrestrialSubService[];
}

export interface BulletService {
  key: "aereo" | "maritimo" | "aduana" | "almacenamiento" | "coordinacion";
  title: string;
  image: string;
  description: string;
  bullets: string[];
}

interface BlsContent {
  company: {
    name: string;
    slogan: string;
    focus: string;
  };
  logisticsRisk: {
    premise: string;
    costs: string[];
    consequence: string;
  };
  clientsSeek: string[];
  about: {
    description: string;
    clientProfile: string[];
  };
  servicesGeneral: string[];
  servicesSpecific: [
    TerrestrialService,
    BulletService,
    BulletService,
    BulletService,
    BulletService,
    BulletService,
  ];
  serviceModes: ServiceMode[];
  intermodal: {
    title: string;
    description: string;
  };
  consultancy: {
    intro: string;
    approach: string[];
    areas: string[];
  };
  proposal: {
    summary: string;
    promise: string;
  };
  workingMethod: {
    philosophy: string;
    process: string[];
  };
  differentiator: {
    concept: string;
    pillars: string[];
  };
  strategicModel: string[];
  compliance: string[];
  value: {
    concept: string;
    solution: string;
  };
  clientExperience: string[];
  testimonial: {
    before: string;
    solution: string;
    result: string;
    client: string;
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
  coverage: {
    nationalDescription: string;
    corridorPoints: string[];
    crossings: string[];
  };
}

export const blsContent: BlsContent = {
  company: {
    name: "BL Solutions",
    slogan: "Logística simple y eficiente",
    focus: "Empresa logística méxico-americana para operaciones nacionales e internacionales.",
  },
  logisticsRisk: {
    premise: "Cada operación necesita una estructura clara para evitar errores, tiempos muertos y sobrecostos.",
    costs: [
      "Rutas poco eficientes",
      "Falta de visibilidad",
      "Costos innecesarios",
      "Decisiones sin análisis",
      "Cambios reactivos",
      "Falta de coordinación",
    ],
    consequence:
      "Por eso analizamos la operación completa antes de definir la solución logística.",
  },
  clientsSeek: ["Claridad", "Seguimiento", "Eficiencia", "Mejor control operativo"],
  about: {
    description:
      "BL Solutions es una empresa logística méxico-americana con sede en Ciudad de México. Apoyamos a empresas a mover su mercancía de manera eficiente a través de operaciones nacionales e internacionales.",
    clientProfile: [
      "Operaciones nacionales",
      "Operaciones internacionales",
      "Empresas con carga recurrente",
      "Equipos que buscan una operación más eficiente",
    ],
  },
  servicesGeneral: ["Terrestre", "Intermodal", "Consultoría"],
  servicesSpecific: [
    {
      key: "terrestre",
      title: "Terrestre",
      summary:
        "Soluciones terrestres para carga general, carga sobredimensionada y productos con control de temperatura.",
      type: "subservices",
      subServices: [
        {
          key: "caja-seca",
          title: "Caja Seca",
          image: "/imgs/terrestre-dryvan.avif",
          description:
            "Ideal para el transporte de mercancía general que no requiere control de temperatura.",
        },
        {
          key: "plataforma",
          title: "Plataforma",
          image: "/imgs/terrestre-flatbed.avif",
          description:
            "Flexibilidad para maquinaria, materiales y carga que no viaja en remolque cerrado.",
        },
        {
          key: "reefer",
          title: "Caja Refrigerada",
          image: "/imgs/terrestre-reefer.avif",
          description:
            "Control de temperatura estable para productos perecederos o sensibles al clima.",
        },
      ],
    },
    {
      key: "aereo",
      title: "Análisis logístico",
      image: "/imgs/aereo.avif",
      description: "Evaluamos rutas, volúmenes y estructura operativa para proponer mejoras.",
      bullets: ["Rutas", "Volúmenes", "Estructura operativa"],
    },
    {
      key: "maritimo",
      title: "Intermodal",
      image: "/imgs/maritimo.avif",
      description:
        "Alternativa para media y larga distancia cuando conviene combinar ferrocarril y transporte terrestre.",
      bullets: ["Media distancia", "Larga distancia", "Control de costos"],
    },
    {
      key: "aduana",
      title: "Análisis de operaciones logísticas",
      image: "/imgs/aduana_service.avif",
      description: "Revisión de rutas, procesos y estructura actual de transporte.",
      bullets: ["Revisión de rutas", "Procesos actuales", "Cadena logística"],
    },
    {
      key: "almacenamiento",
      title: "Optimización de costos de transporte",
      image: "/imgs/almacen_service.avif",
      description: "Identificación de oportunidades para reducir costos operativos.",
      bullets: ["Consolidación", "Selección de proveedores", "Ajustes de ruta"],
    },
    {
      key: "coordinacion",
      title: "Diseño de estrategias logísticas",
      image: "/imgs/about.avif",
      description: "Propuesta de soluciones logísticas alineadas con el crecimiento del cliente.",
      bullets: ["Estrategia", "Implementación", "Seguimiento"],
    },
  ],
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
        "Remolque cerrado de 40 pies con capacidad completa, diseñado para maximizar el volumen de carga en operaciones de larga distancia y movimientos de alto volumen nacionales e internacionales.",
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
  intermodal: {
    title: "Intermodal",
    description:
      "El transporte intermodal combina ferrocarril y transporte terrestre para optimizar costos y eficiencia en rutas de media y larga distancia, permitiendo mover grandes volúmenes de mercancía de forma más estable y eficiente.",
  },
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
  proposal: {
    summary:
      "Operamos soluciones sencillas para transporte terrestre, intermodal y consultoría logística con un solo equipo coordinando todo.",
    promise: "Entendemos la operación, definimos la estrategia y ejecutamos con seguimiento claro.",
  },
  workingMethod: {
    philosophy:
      "Primero entendemos la operación actual del cliente y después proponemos la solución más eficiente.",
    process: [
      "Analizamos rutas, volúmenes y procesos actuales",
      "Definimos la estrategia logística adecuada",
      "Coordinamos la ejecución operativa",
      "Damos seguimiento puntual a cada movimiento",
      "Ajustamos la operación cuando el cliente lo necesita",
    ],
  },
  differentiator: {
    concept:
      "Nuestro equipo combina análisis operativo con ejecución diaria para que la estrategia también funcione en la realidad.",
    pillars: [
      "Operación nacional e internacional",
      "Seguimiento claro",
      "Análisis operativo",
      "Ejecución eficiente",
    ],
  },
  strategicModel: [
    "Entender la operación actual antes de mover piezas",
    "Comparar alternativas de ruta y modo de transporte",
    "Proponer cambios que puedan ejecutarse",
    "Ajustar la estrategia conforme cambia la operación",
  ],
  compliance: [
    "Operación nacional e internacional",
    "Análisis basado en la operación actual",
    "Seguimiento por un mismo equipo",
    "Ejecución alineada con la estrategia",
  ],
  value: {
    concept:
      "La mejor decisión logística no depende solo de tarifa. También depende de estabilidad, tiempos y capacidad operativa.",
    solution:
      "Ayudamos a tomar decisiones logísticas más claras y más útiles para la operación real.",
  },
  clientExperience: ["Claridad", "Análisis", "Seguimiento", "Ejecución"],
  testimonial: {
    before:
      "Cuando una operación necesita bajar costos sin perder estabilidad, evaluamos la ruta completa antes de cambiar proveedores o equipos.",
    solution:
      "A partir del análisis operativo, identificamos cuándo conviene mantener transporte terrestre y cuándo una alternativa intermodal genera mejores resultados.",
    result:
      "El cliente toma decisiones logísticas con más claridad, mejor estructura operativa y una ruta más eficiente.",
    client: "BL Solutions",
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
  contact: {
    phones: [
      {
        country: "Mexico",
        numbers: ["+52 5582323839", "+52 5549183873"],
      },
      {
        country: "Estados Unidos",
        numbers: ["+1 832 671 7796"],
      },
    ],
    email: "operations@blsolutions.com.mx",
    addressLines: [
      "Paseo de la Reforma 369 - 5",
      "06500",
      "Ciudad de México, CDMX",
    ],
  },
  coverage: {
    nationalDescription:
      "Apoyamos operaciones nacionales e internacionales con foco en rutas que requieren coordinación eficiente.",
    corridorPoints: [
      "Operación méxico-americana",
      "Rutas nacionales e internacionales",
      "Un solo equipo coordinando",
    ],
    crossings: [
      "México - Estados Unidos",
      "Rutas nacionales en México",
      "Corredores de media y larga distancia",
    ],
  },
};
