import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheckSquare,
  FiClipboard,
  FiCompass,
  FiGitBranch,
  FiGlobe,
  FiLayers,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { buildLocalizedPageMeta } from "../lib/build-page-meta";
import { getLocalizedPath, type Locale } from "../lib/i18n";
import { getBlsContent } from "./components/home/blsContent";

const approachIcons = [FiCompass, FiBarChart2, FiLayers, FiCheckSquare];
const approachOffsets = ["md:mt-1", "md:-mt-6", "md:-mt-6", "md:mt-1"];
const areaIcons = [FiBarChart2, FiShield, FiClipboard, FiTrendingUp, FiGitBranch, FiGlobe];
const areaDescriptions = {
  "es-MX": [
    "Evaluamos procesos, rutas, costos y estructura para detectar oportunidades concretas de mejora.",
    "Fortalecemos controles y procesos para alinear la operación con estándares de seguridad y cumplimiento.",
    "Diseñamos operaciones de almacenamiento con foco en layout, flujo, capacidad y control operativo.",
    "Optimizamos la cadena de suministro para mejorar continuidad, visibilidad y eficiencia de punta a punta.",
    "Definimos cuándo y cómo migrar a esquemas intermodales con impacto en costo, estabilidad y servicio.",
    "Ajustamos operaciones cross-border para reducir fricción documental, operativa y de coordinación.",
  ],
  "en-US": [
    "We assess processes, routes, costs, and operating structure to identify concrete improvement opportunities.",
    "We strengthen controls and processes to align the operation with security and compliance standards.",
    "We design warehousing operations with a focus on layout, flow, capacity, and execution control.",
    "We optimize the supply chain to improve continuity, visibility, and end-to-end efficiency.",
    "We define when and how to move toward intermodal models with measurable impact on cost, stability, and service.",
    "We adjust cross-border operations to reduce documentary, operational, and coordination friction.",
  ],
} satisfies Record<Locale, string[]>;

const copyByLocale = {
  "es-MX": {
    eyebrow: "Consultoría Logística",
    title: "Análisis logístico para tomar mejores decisiones",
    cta: "Solicitar análisis",
    sectionTitle: "Nuestro Enfoque",
    sectionDescription: "Metodología probada para optimizar cada eslabón de tu cadena de suministro.",
    areasEyebrow: "Áreas de consultoría",
    areasTitle: "Enfoque práctico y operativo",
    areasDescription:
      "Acompañamos proyectos de cumplimiento, almacenamiento, cadena de suministro e integración modal con una lógica operativa y ejecutable.",
    closingTitle: "Hablemos de tu operación actual",
    closingDescription:
      "Revisamos rutas, procesos y estructura logística para detectar oportunidades de mejora en costos, tiempos y eficiencia.",
    closingCta: "Solicitar consultoría",
    imageAlt: "Consultoría logística",
  },
  "en-US": {
    eyebrow: "Logistics Consulting",
    title: "Logistics analysis for better operating decisions",
    cta: "Request an analysis",
    sectionTitle: "Our Approach",
    sectionDescription: "A proven methodology to optimize each link in your supply chain.",
    areasEyebrow: "Consulting areas",
    areasTitle: "Practical and operational focus",
    areasDescription:
      "We support compliance, warehousing, supply chain, and modal integration projects with an operating logic built for execution.",
    closingTitle: "Let's review your current operation",
    closingDescription:
      "We review routes, processes, and logistics structure to identify improvement opportunities in cost, lead time, and efficiency.",
    closingCta: "Request consulting",
    imageAlt: "Logistics consulting",
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    cta: string;
    sectionTitle: string;
    sectionDescription: string;
    areasEyebrow: string;
    areasTitle: string;
    areasDescription: string;
    closingTitle: string;
    closingDescription: string;
    closingCta: string;
    imageAlt: string;
  }
>;

type ConsultingPageProps = {
  locale: Locale;
};

export function meta() {
  return buildLocalizedPageMeta("consulting", "es-MX");
}

export function ConsultingPage({ locale }: ConsultingPageProps) {
  const content = getBlsContent(locale);
  const copy = copyByLocale[locale];
  const descriptions = areaDescriptions[locale];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-[#0B1120] px-6 pb-20 pt-32 md:pb-32 md:pt-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-[#015095] opacity-20 blur-[120px]" />
          <div className="absolute -right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#202F4C] opacity-30 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-[#015095] opacity-10 blur-[80px]" />
        </div>

        <div className="section-shell relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#60A5FA] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]" />
                {copy.eyebrow}
              </div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                {copy.title}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                {content.consultancy.intro}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to={getLocalizedPath("contact", locale)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0B1120] transition-all hover:bg-blue-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  {copy.cta}
                  <FiArrowRight className="text-lg" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10">
                  <img
                    src="/imgs/consultoria-hero.avif"
                    alt={copy.imageAlt}
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120]/40 to-transparent" />
                </div>
                <div className="absolute -right-6 -top-6 rounded-2xl border border-white/10 bg-[#1e293b] p-4 shadow-xl">
                  <FiTrendingUp className="text-3xl text-blue-400" />
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-[#1e293b] p-4 shadow-xl">
                  <FiCompass className="text-3xl text-blue-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_54%,#e9f1fb_100%)] px-6 pt-20">
        <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(213,223,238,0.45)_100%)]" />
        <div className="section-shell relative">
          <div className="mb-12 md:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B1120] sm:text-4xl">
              {copy.sectionTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{copy.sectionDescription}</p>
          </div>

          <div className="relative px-2 py-10 md:px-4 md:py-18">
            <div className="absolute left-1/2 top-[27%] hidden h-[20rem] w-[132%] -translate-x-1/2 rounded-[50%] border-t-[34px] border-[#23365c]/52 md:block" />
            <div className="absolute left-1/2 top-[28.2%] hidden h-[20rem] w-[132%] -translate-x-1/2 rounded-[50%] border-t-[34px] border-white/65 md:block" />

            <div className="relative grid gap-10 md:grid-cols-4 md:items-start md:gap-6">
              {content.consultancy.approach.map((paragraph, index) => {
                const Icon = approachIcons[index];
                const [rawTitle, ...rest] = paragraph.split(". ");
                const title = rawTitle.replace(".", "");
                const description = rest.join(". ");

                return (
                  <div
                    key={paragraph}
                    className={`reveal-up relative flex flex-col items-center text-center ${approachOffsets[index] ?? ""}`}
                    style={{ ["--reveal-delay" as string]: `${index * 100}ms` }}
                  >
                    <div className="relative z-10 mb-6 -translate-y-3 transform flex h-20 w-20 items-center justify-center bg-[#23365c] text-white shadow-[0_18px_40px_rgba(35,54,92,0.24)] [clip-path:polygon(50%_0%,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)] md:mb-10 md:h-24 md:w-24">
                      <Icon className="text-3xl md:text-[2rem]" />
                    </div>
                    <div className="max-w-[18rem]">
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#0f3473]">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#e9f1fb_0%,#f8fafc_24%,#f8fafc_100%)] px-6 py-20">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(213,223,238,0.55)_0%,rgba(248,250,252,0)_100%)]" />
        <div className="section-shell relative">
          <div className="mb-16 space-y-4">
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              {copy.areasEyebrow}
            </div>
            <h2 className="text-3xl font-bold text-[#0B1120] md:text-4xl">{copy.areasTitle}</h2>
            <p className="max-w-3xl text-lg text-slate-600">{copy.areasDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.consultancy.areas.map((area, index) => {
              const Icon = areaIcons[index];

              return (
                <div
                  key={area}
                  className="reveal-up rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-[#0B1120]">{area}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{descriptions[index]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="section-shell">
          <div className="reveal-up relative overflow-hidden rounded-[2.5rem] bg-[#0B1120] p-8 text-white shadow-2xl md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e293b,_transparent_70%)]" />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                {copy.closingTitle}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">{copy.closingDescription}</p>
              <Link
                to={getLocalizedPath("contact", locale)}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0B1120] transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {copy.closingCta}
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Consultoria() {
  return <ConsultingPage locale="es-MX" />;
}
