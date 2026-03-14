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
    slogan: "Una carga menos en tu dia.",
    focus: "Soluciones logisticas Mexico-USA para empresas B2B",
  },
  logisticsRisk: {
    premise: "Tu operacion necesita certeza, seguimiento y cumplimiento en cada movimiento.",
    costs: [
      "Incertidumbre",
      "Falta de seguimiento",
      "Retrasos en cruce",
      "Proveedores informales",
      "Documentacion incorrecta",
      "Tiempo interno perdido",
    ],
    consequence:
      "Por eso trabajamos para anticipar incidencias y mantener tu operacion bajo control.",
  },
  clientsSeek: [
    "Certeza",
    "Comunicacion constante",
    "Cumplimiento documental",
    "Un solo punto de contacto",
    "Responsabilidad de principio a fin",
  ],
  about: {
    description:
      "En BL Solutions acompanamos operaciones logisticas Mexico-Estados Unidos para empresas B2B e industriales con atencion cercana, seguimiento puntual y soluciones a la medida.",
    clientProfile: [
      "Fabricantes",
      "Distribuidores que exportan",
      "Operaciones industriales",
      "Carga regular y refrigerada",
    ],
  },
  servicesGeneral: ["Transporte", "Aduana", "Almacenamiento", "Coordinacion"],
  servicesSpecific: [
    {
      key: "terrestre",
      title: "Transporte Terrestre (FTL/LTL)",
      summary:
        "Coordinamos tu carga de punta a punta con la unidad adecuada para cada ruta, ya sea una operacion Mexico-USA o una entrega nacional.",
      type: "subservices",
      subServices: [
        {
          key: "dryvan",
          title: "Caja seca (Dry Van)",
          image: "/home-imgs/terrestre-dryvan.avif",
          description:
            "Una opcion confiable para carga general que requiere puntualidad, visibilidad y coordinacion continua.",
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
          title: "Camion tipo box",
          image: "/home-imgs/terrestre-boxtruck.avif",
          description:
            "Una alternativa agil para entregas urbanas, volumen medio y accesos con maniobra limitada.",
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
      title: "Transporte Aereo",
      image: "/home-imgs/aereo.avif",
      description:
        "Movemos envios urgentes o de alto valor con tiempos controlados y comunicacion constante.",
      bullets: [
        "Ideal para operaciones sensibles al tiempo",
        "Coordinacion puerta a puerta",
        "Seguimiento en tiempo real",
      ],
    },
    {
      key: "maritimo",
      title: "Transporte Maritimo (FCL/LCL)",
      image: "/home-imgs/maritimo.avif",
      description:
        "Te ayudamos a mover volumen internacional con coordinacion operativa y documental desde origen hasta entrega.",
      bullets: [
        "FCL y LCL segun volumen y frecuencia",
        "Coordinacion aduanal",
        "Seguimiento desde origen hasta destino final",
      ],
    },
    {
      key: "aduana",
      title: "Agencia Aduanal",
      image: "/home-imgs/about.avif",
      description:
        "Cuidamos el cumplimiento documental y la coordinacion de despacho para que tus cruces fluyan con menos friccion.",
      bullets: [
        "Revision documental",
        "Coordinacion de despacho",
        "Cumplimiento operativo en rutas Mexico-USA",
      ],
    },
    {
      key: "almacenamiento",
      title: "Almacenamiento",
      image: "/home-imgs/maritimo.avif",
      description:
        "Integramos almacenamiento cuando tu operacion necesita continuidad, flexibilidad y mejor control.",
      bullets: [
        "Soporte para inventario y consolidacion",
        "Mayor flexibilidad para ventanas de entrega",
        "Integracion con transporte y despacho",
      ],
    },
    {
      key: "coordinacion",
      title: "Coordinacion Integral",
      image: "/home-imgs/aereo.avif",
      description:
        "Centralizamos tu operacion en un solo punto de contacto para que tengas claridad y respuesta durante todo el proceso.",
      bullets: [
        "Una sola conversacion",
        "Un solo responsable",
        "Seguimiento proactivo de principio a fin",
      ],
    },
  ],
  proposal: {
    summary:
      "Tienes un solo punto de contacto para coordinar transporte, aduana, almacenamiento y seguimiento.",
    promise: "Una sola conversacion para mover tu operacion con claridad.",
  },
  workingMethod: {
    philosophy:
      "Recibes actualizaciones claras y oportunas para tomar decisiones con mayor tranquilidad.",
    process: [
      "Entendemos tu operacion",
      "Disenamos la solucion correcta",
      "Asignamos unidad y coordinamos documentacion",
      "Damos seguimiento proactivo",
      "Confirmamos entrega y cierre",
    ],
  },
  differentiator: {
    concept: "Tu carga avanza con seguimiento real, comunicacion constante y un equipo que responde.",
    pillars: [
      "Servicio real",
      "Comunicacion constante",
      "Seguimiento puntual",
      "Responsabilidad total",
    ],
  },
  strategicModel: [
    "Seleccionamos la opcion mas adecuada para cada ruta",
    "Buscamos condiciones competitivas para tu operacion",
    "Adaptamos la solucion a tu tipo de carga y frecuencia",
    "Mantenemos flexibilidad ante cambios operativos",
  ],
  compliance: [
    "Empresa constituida en Mexico",
    "RFC y documentacion verificable",
    "Red validada de transportistas",
    "Cumplimiento de requisitos operativos",
    "Control documental",
  ],
  value: {
    concept:
      "El valor de una solucion logistica no esta solo en la tarifa: tambien esta en evitar retrasos, multas, perdida de cliente y tiempo interno perdido.",
    solution: "Te ayudamos a reducir riesgo y proteger la continuidad de tu operacion.",
  },
  clientExperience: ["Claridad", "Control", "Tranquilidad", "Comunicacion constante"],
  testimonial: {
    before:
      "Un cliente movia 15 cajas de Estado de Mexico a California en trailers y pagaba mas de 80,000 dolares al mes.",
    solution:
      "Le propusimos una alternativa intermodal con ferrocarril hasta Mexicali y transbordo a camiones estadounidenses.",
    result:
      "Hoy proyecta reducir cerca de un tercio de su costo manteniendo el mismo volumen con una operacion mas eficiente y segura.",
    client: "Cliente BL Solutions",
  },
  nextStep: {
    action: "Solicita una evaluacion de tu ruta Mexico-USA.",
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
      "Bosque de Cafetos 14, Bosques de las Lomas, Miguel Hidalgo, Ciudad de Mexico, Mexico",
  },
  coverage: {
    nationalDescription:
      "Coordinamos soluciones logisticas en todo Mexico conectando puertos, fronteras y centros industriales con entregas eficientes y seguras.",
    corridorPoints: [
      "Atencion para operaciones B2B e industriales",
      "Carga regular y refrigerada",
      "Un solo punto de contacto",
    ],
    crossings: [
      "Tijuana - San Diego (Otay Mesa)",
      "San Luis Rio Colorado - Yuma, Arizona",
      "Ciudad Juarez - El Paso",
      "Nuevo Laredo - Laredo, Texas",
      "Matamoros - Brownsville, Texas",
    ],
  },
};
