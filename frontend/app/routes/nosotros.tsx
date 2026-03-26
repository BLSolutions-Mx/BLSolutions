import React from "react";
import { Link } from "react-router";
import {
  FiArrowRight,
  FiCompass,
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiSettings,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { cn } from "./components/lib/utils";

interface MarqueeLogo {
  src: string;
  alt: string;
}

interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logos: MarqueeLogo[];
  speed?: "normal" | "slow" | "fast";
}

const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ title, description, logos, speed = "normal", className, ...props }, ref) => {
    const durationMap = { normal: "40s", slow: "80s", fast: "5s" };
    const animationDuration = durationMap[speed];

    return (
      <>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <div
          ref={ref}
          aria-label={title}
          className={cn(
            "w-full overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white pb-10 shadow-[0_24px_80px_rgba(32,47,76,0.10)]",
            className,
          )}
          {...props}
        >
          <div className="p-6 md:px-8 lg:px-10">
            <div className="pb-6 md:pb-8">
              <h3 className="text-2xl font-semibold tracking-tight text-[#202F4C] text-balance md:text-3xl">
                {title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#5E6878] text-balance">
                {description}
              </p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-slate-500 via-slate-300/80 to-slate-300/80" />
            </div>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              className="flex w-max items-center gap-5 py-5 pr-5"
              style={{ animation: `marquee ${animationDuration} linear infinite` }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="relative flex h-24 w-[11.5rem] shrink-0 items-center justify-center overflow-hidden rounded-xl px-4 py-3 md:w-[13rem] md:px-5"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="block h-auto max-h-full w-full object-contain object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  },
);
MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

const partners: MarqueeLogo[] = [
  {
    src: "/logomarquee/logo-1.webp",
    alt: "Procure",
  },
  {
    src: "/logomarquee/logo-2.webp",
    alt: "Shopify",
  },
  {
    src: "/logomarquee/logo-3.webp",
    alt: "Blender",
  },
  {
    src: "/logomarquee/logo-4.webp",
    alt: "Figma",
  },
  {
    src: "/logomarquee/logo-5.webp",
    alt: "Spotify",
  },
  {
    src: "/logomarquee/logo-6.webp",
    alt: "Lottielab",
  },
];

export function meta() {
  return [
    { title: "Nosotros | BL Solutions" },
    {
      name: "description",
      content:
        "Conoce a BL Solutions: quiénes somos, nuestra misión, visión y los valores que guían nuestra forma de trabajar.",
    },
  ];
}

const values = [
  {
    title: "Alianzas sostenibles y de largo plazo",
    icon: FiUsers,
  },
  {
    title: "Comunicación clara y honesta",
    icon: FiMessageCircle,
  },
  {
    title: "Creatividad para resolver problemas complejos",
    icon: FiHeart,
  },
  {
    title: "Prestación de servicios integrales y de alto valor agregado",
    icon: FiShield,
  },
];

const identityCards = [
  {
    title: "Misión",
    copy:
      "Brindar soluciones de movilidad y logística con excelencia, cercanía operativa y servicio integral para acompañar a cada cliente con claridad y confianza.",
    icon: FiCompass,
  },
  {
    title: "Visión",
    copy:
      "Consolidarnos como una firma referente en México y EUA por nuestra capacidad de construir relaciones sólidas y apoyar operaciones complejas e innovadoras.",
    icon: FiEye,
  },
] as const;

export default function Nosotros() {
  return (
    <main className="min-h-screen text-slate-950">
      <section className="relative overflow-hidden bg-[#0B1120] px-6 pb-20 pt-32 md:pb-32 md:pt-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#1e293b] opacity-50 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] translate-y-1/3 -translate-x-1/4 rounded-full bg-[#015095] opacity-20 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/20 blur-[80px]" />
        </div>

        <div className="section-shell relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="reveal-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#0079e3] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#0079e3] shadow-[0_0_8px_#0079e3]" />
                Nosotros
              </div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                Equipo logístico con{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  enfoque operativo
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Firma de movilidad y logística fundada en Ciudad de México, con enfoque en
                relaciones duraderas, claridad operativa y servicio integral.
              </p>
            </div>

            <div
              className="relative hidden lg:block reveal-scale"
              style={{ ["--reveal-delay" as string]: "200ms" }}
            >
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <div className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  <FiUsers className="text-4xl text-blue-400" />
                </div>

                <div className="absolute inset-0 rounded-full border border-dashed border-white/10" />
                <div className="absolute inset-4 rounded-full border border-white/5" />

                <div className="absolute right-1/4 top-1/4 z-30 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#1e293b] shadow-lg">
                  <FiCompass className="text-2xl text-blue-400" />
                </div>

                <div className="absolute bottom-1/4 left-1/4 z-30 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#1e293b] shadow-lg">
                  <FiSettings className="text-2xl text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-50 px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        <div className="section-shell relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal-left flex flex-col gap-8">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                  <FiUsers className="text-blue-500" />
                  Quiénes somos
                </div>
                <h2 className="mb-6 text-4xl font-bold leading-tight text-[#202F4C] md:text-5xl">
                  Transformando la <span className="text-[#015095]">logística</span> con excelencia
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-slate-600">
                  <p>
                    Fundada en 2024 en la Ciudad de México, B.L. Solutions es una firma de movilidad y
                    logística comprometida con la excelencia y dedicada a brindar un servicio integral.
                  </p>
                  <p>
                    Hemos logrado consolidar relaciones con jugadores clave en México y EUA, quienes
                    han confiado en nosotros para apoyar en operaciones complejas e innovadoras a lo
                    largo de la cadena de suministro.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {identityCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="reveal-up rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                      style={{ ["--reveal-delay" as string]: `${index * 100}ms` }}
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#015095]">
                        <Icon className="text-2xl" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-[#202F4C]">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">{card.copy}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="reveal-scale relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl lg:h-[800px] lg:aspect-auto">
                <img
                  src="/home-imgs/hero_terrestre.avif"
                  alt="Equipo y operaciones de BL Solutions"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-[#0B1120]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white md:p-12">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                    <p className="text-lg font-medium leading-relaxed">
                      "Nuestra prioridad es construir relaciones sólidas y apoyar operaciones complejas e innovadoras."
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-blue-100 opacity-70 mix-blend-multiply blur-2xl animate-blob" />
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-indigo-100 opacity-70 mix-blend-multiply blur-2xl animate-blob animation-delay-2000" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-8">
        <div className="section-shell">
          <div
            className="reveal-up mx-auto mb-16 max-w-3xl text-center md:mb-24"
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-[#015095]">
              Nuestros Valores
            </span>
            <h2 className="text-3xl font-bold leading-tight text-[#202F4C] md:text-5xl">
              Principios que definen nuestra forma de trabajar
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="reveal-up group relative overflow-hidden rounded-[2rem] bg-white shadow-sm p-8 transition-colors duration-500 hover:bg-[#015095]"
                  style={{ ["--reveal-delay" as string]: `${index * 100}ms` }}
                >
                  <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-white/50 blur-2xl transition-colors duration-500 group-hover:bg-white/10" />

                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-500 group-hover:scale-110">
                      <Icon className="text-2xl text-[#015095]" />
                    </div>
                    <h3 className="text-xl font-semibold leading-snug text-[#202F4C] transition-colors duration-500 group-hover:text-white">
                      {value.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="section-shell">
          <div
            className="reveal-up"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <MarqueeLogoScroller
              title="Aliados que confían en nosotros"
              description="Colaboramos con empresas líderes para ofrecer soluciones logísticas de alto valor."
              logos={partners}
              speed="normal"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-24 md:py-32">
        <div className="section-shell">
          <div
            className="reveal-up relative overflow-hidden rounded-[3rem] bg-[#0B1120] p-10 text-white shadow-2xl md:p-16 lg:p-20"
            style={{ ["--reveal-delay" as string]: "160ms" }}
          >
            <div className="absolute inset-0">
              <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500/20 blur-[100px]" />
              <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-indigo-500/20 blur-[80px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
              <div className="max-w-2xl text-center lg:text-left">
                <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
                  Conversemos sobre tu <span className="text-blue-400">operación</span>
                </h2>
                <p className="text-lg leading-relaxed text-slate-300">
                  Si buscas un aliado para coordinar soluciones logísticas con claridad y visión de
                  largo plazo, podemos ayudarte.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  to="/contacto"
                  className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0B1120] transition-all hover:scale-105 hover:bg-blue-50"
                >
                  <span>Contactar ahora</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1120] text-white transition-transform group-hover:translate-x-1">
                    <FiArrowRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
