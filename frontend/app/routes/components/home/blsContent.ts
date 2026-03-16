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
  subServices: [
    TerrestrialSubService,
    TerrestrialSubService,
    TerrestrialSubService,
    TerrestrialSubService,
  ];
}

export interface BulletService {
  key: "aereo" | "maritimo" | "aduana" | "almacenamiento" | "coordinacion";
  title: string;
  image: string;
  description: string;
  bullets: [string, string, string];
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
    phone: string;
    email: string;
    address: string;
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
    slogan: "Una carga menos en tu día.",
    focus: "Soluciones logísticas México-USA para empresas B2B",
  },
  logisticsRisk: {
    premise: "Tu operación necesita certeza, seguimiento y cumplimiento en cada movimiento.",
    costs: [
      "Incertidumbre",
      "Falta de seguimiento",
      "Retrasos en cruce",
      "Proveedores informales",
      "Documentación incorrecta",
      "Tiempo interno perdido",
    ],
    consequence:
      "Por eso trabajamos para anticipar incidencias y mantener tu operación bajo control.",
  },
  clientsSeek: [
    "Certeza",
    "Comunicación constante",
    "Cumplimiento documental",
    "Un solo punto de contacto",
    "Responsabilidad de principio a fin",
  ],
  about: {
    description:
      "En BL Solutions acompañamos operaciones logísticas México-Estados Unidos para empresas B2B e industriales con atención cercana, seguimiento puntual y soluciones a la medida.",
    clientProfile: [
      "Fabricantes",
      "Distribuidores que exportan",
      "Operaciones industriales",
      "Carga regular y refrigerada",
    ],
  },
  servicesGeneral: ["Transporte", "Aduana", "Almacenamiento", "Coordinación"],
  servicesSpecific: [
    {
      key: "terrestre",
      title: "Transporte Terrestre (FTL/LTL)",
      summary:
        "Coordinamos tu carga de punta a punta con la unidad adecuada para cada ruta, ya sea una operación México-USA o una entrega nacional.",
      type: "subservices",
      subServices: [
        {
          key: "dryvan",
          title: "Caja seca (Dry Van)",
          image: "/home-imgs/terrestre-dryvan.avif",
          description:
            "Una opción confiable para carga general que requiere puntualidad, visibilidad y coordinación continua.",
        },
        {
          key: "reefer",
          title: "Refrigerado (Reefer)",
          image: "/home-imgs/terrestre-reefer.avif",
          description:
            "Ideal para productos sensibles que necesitan temperatura controlada y monitoreo durante el trayecto.",
        },
        {
          key: "boxtruck",
          title: "Camión tipo box",
          image: "/home-imgs/terrestre-boxtruck.avif",
          description:
            "Una alternativa ágil para entregas urbanas, volumen medio y accesos con maniobra limitada.",
        },
        {
          key: "flatbed",
          title: "Plataforma (Flatbed)",
          image: "/home-imgs/terrestre-flatbed.avif",
          description:
            "Pensado para maquinaria y carga sobredimensionada que requiere maniobras especiales.",
        },
      ],
    },
    {
      key: "aereo",
      title: "Transporte Aéreo",
      image: "/home-imgs/aereo.avif",
      description:
        "Movemos envíos urgentes o de alto valor con tiempos controlados y comunicación constante.",
      bullets: [
        "Ideal para operaciones sensibles al tiempo",
        "Coordinación puerta a puerta",
        "Seguimiento en tiempo real",
      ],
    },
    {
      key: "maritimo",
      title: "Transporte Marítimo (FCL/LCL)",
      image: "/home-imgs/maritimo.avif",
      description:
        "Te ayudamos a mover volumen internacional con coordinación operativa y documental desde origen hasta entrega.",
      bullets: [
        "FCL y LCL según volumen y frecuencia",
        "Coordinación aduanal",
        "Seguimiento desde origen hasta destino final",
      ],
    },
    {
      key: "aduana",
      title: "Agencia Aduanal",
      image: "/home-imgs/aduana_service.avif",
      description:
        "Cuidamos el cumplimiento documental y la coordinación de despacho para que tus cruces fluyan con menos fricción.",
      bullets: [
        "Revisión documental",
        "Coordinación de despacho",
        "Cumplimiento operativo en rutas México-USA",
      ],
    },
    {
      key: "almacenamiento",
      title: "Almacenamiento",
      image: "/home-imgs/almacen_service.avif",
      description:
        "Integramos almacenamiento cuando tu operación necesita continuidad, flexibilidad y mejor control.",
      bullets: [
        "Soporte para inventario y consolidación",
        "Mayor flexibilidad para ventanas de entrega",
        "Integración con transporte y despacho",
      ],
    },
    {
      key: "coordinacion",
      title: "Coordinación Integral",
      image: "/home-imgs/aereo.avif",
      description:
        "Centralizamos tu operación en un solo punto de contacto para que tengas claridad y respuesta durante todo el proceso.",
      bullets: [
        "Una sola conversación",
        "Un solo responsable",
        "Seguimiento proactivo de principio a fin",
      ],
    },
  ],
  proposal: {
    summary:
      "Tienes un solo punto de contacto para coordinar transporte, aduana, almacenamiento y seguimiento.",
    promise: "Una sola conversación para mover tu operación con claridad.",
  },
  workingMethod: {
    philosophy:
      "Recibes actualizaciones claras y oportunas para tomar decisiones con mayor tranquilidad.",
    process: [
      "Entendemos tu operación",
      "Diseñamos la solución correcta",
      "Asignamos la unidad y coordinamos la documentación",
      "Damos seguimiento proactivo",
      "Confirmamos entrega y cierre",
    ],
  },
  differentiator: {
    concept: "Tu carga avanza con seguimiento real, comunicación constante y un equipo que responde.",
    pillars: [
      "Servicio real",
      "Comunicación constante",
      "Seguimiento puntual",
      "Responsabilidad total",
    ],
  },
  strategicModel: [
    "Seleccionamos la opción más adecuada para cada ruta",
    "Buscamos condiciones competitivas para tu operación",
    "Adaptamos la solución a tu tipo de carga y frecuencia",
    "Mantenemos flexibilidad ante cambios operativos",
  ],
  compliance: [
    "Empresa constituida en México",
    "RFC y documentación verificable",
    "Red validada de transportistas",
    "Cumplimiento de requisitos operativos",
    "Control documental",
  ],
  value: {
    concept:
      "El valor de una solución logística no está solo en la tarifa: también está en evitar retrasos, multas, pérdida de clientes y tiempo interno perdido.",
    solution: "Te ayudamos a reducir riesgo y proteger la continuidad de tu operación.",
  },
  clientExperience: ["Claridad", "Control", "Tranquilidad", "Comunicación constante"],
  testimonial: {
    before:
      "Un cliente movía 15 cajas de Estado de México a California en trailers y pagaba más de 80,000 dólares al mes.",
    solution:
      "Le propusimos una alternativa intermodal con ferrocarril hasta Mexicali y transbordo a camiones estadounidenses.",
    result:
      "Hoy proyecta reducir cerca de un tercio de su costo manteniendo el mismo volumen con una operación más eficiente y segura.",
    client: "",
  },
  nextStep: {
    action: "Solicita una evaluación de tu ruta México-USA.",
    benefits: [
      "Detectamos riesgos operativos",
      "Identificamos oportunidades de ahorro",
      "Te proponemos mejoras concretas",
    ],
    conditions: "Sin costo. Sin compromiso.",
  },
  contact: {
    phone: "+52 55 8232 3839",
    email: "operations@blsolutions.com.mx",
    address:
      "Bosque de Cafetos 14, Bosques de las Lomas, Miguel Hidalgo, Ciudad de México, México",
  },
  coverage: {
    nationalDescription:
      "Coordinamos soluciones logísticas en todo México conectando puertos, fronteras y centros industriales con entregas eficientes y seguras.",
    corridorPoints: [
      "Atención para operaciones B2B e industriales",
      "Carga regular y refrigerada",
      "Un solo punto de contacto",
    ],
    crossings: [
      "Tijuana - San Diego (Otay Mesa)",
      "San Luis Río Colorado - Yuma, Arizona",
      "Ciudad Juárez - El Paso",
      "Nuevo Laredo - Laredo, Texas",
      "Matamoros - Brownsville, Texas",
    ],
  },
};
