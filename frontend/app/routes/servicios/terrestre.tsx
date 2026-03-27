import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiArrowLeft, FiArrowRight, FiTruck } from "react-icons/fi";
import { buildLocalizedPageMeta } from "../../lib/build-page-meta";
import { getLocalizedPath, type Locale } from "../../lib/i18n";
import { getBlsContent } from "../components/home/blsContent";

const copyByLocale = {
  "es-MX": {
    eyebrow: "Servicios logísticos",
    title: "Terrestre",
    backLabel: "Volver a servicios",
    contactLabel: "Contactar",
    sectionLabel: "Terrestre",
  },
  "en-US": {
    eyebrow: "Logistics services",
    title: "On The Road",
    backLabel: "Back to services",
    contactLabel: "Contact us",
    sectionLabel: "On The Road",
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    backLabel: string;
    contactLabel: string;
    sectionLabel: string;
  }
>;

type GroundPageProps = {
  locale: Locale;
};

export function meta() {
  return buildLocalizedPageMeta("ground", "es-MX");
}

export function GroundPage({ locale }: GroundPageProps) {
  const copy = copyByLocale[locale];
  const serviceModes = getBlsContent(locale).serviceModes;

  return (
    <main className="min-h-screen text-slate-950">
      <section className="relative isolate overflow-hidden px-6 pb-32 pt-28 md:pb-40 md:pt-36">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#0B1120]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#1e293b_0%,#0f172a_50%,#020617_100%)]" />
          <div className="absolute -right-[15%] -top-[25%] h-[min(520px,70vw)] w-[min(520px,70vw)] rounded-full bg-[#015095]/20 blur-[110px]" />
          <div className="absolute -bottom-[20%] -left-[15%] h-[min(420px,60vw)] w-[min(420px,60vw)] rounded-full bg-[#202F4C]/25 blur-[100px]" />
        </div>

        <div className="section-shell relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="max-w-3xl">
              <Link
                to={getLocalizedPath("services", locale)}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:bg-white/14"
              >
                <FiArrowLeft />
                {copy.backLabel}
              </Link>
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/14 backdrop-blur-sm">
                  <FiTruck className="text-2xl text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  {copy.eyebrow}
                </p>
              </div>
              <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                {copy.title}
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="-mt-20 px-6 pb-20 md:-mt-24">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
            {serviceModes.map((mode, index) => (
              <div
                key={mode.key}
                className="service-detail-glass reveal-up flex h-full flex-col p-6 md:p-8"
                style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
              >
                <div className="relative mb-6 min-h-[240px] shrink-0 overflow-hidden rounded-[1.5rem]">
                  <img
                    src={mode.image}
                    alt={mode.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                  {copy.sectionLabel}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#202F4C]">{mode.title}</h2>
                <p className="mt-3 flex-1 text-base leading-8 text-[#5E6878]">{mode.description}</p>
                <Link
                  to={getLocalizedPath("contact", locale)}
                  className="mt-6 inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                >
                  {copy.contactLabel}
                  <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function TerrestrePage() {
  return <GroundPage locale="es-MX" />;
}
