import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiArrowRight, FiArchive, FiGitBranch, FiSend, FiTruck } from "react-icons/fi";
import { buildLocalizedPageMeta } from "../lib/build-page-meta";
import { getLocalizedPath, type Locale } from "../lib/i18n";

const serviceCardsByLocale = {
  "es-MX": [
    {
      title: "Terrestre",
      href: "ground",
      image: "/imgs/terrestre-dryvan.avif",
      icon: FiTruck,
    },
    {
      title: "Aéreo",
      href: "air",
      image: "/imgs/aereo.avif",
      icon: FiSend,
    },
    {
      title: "Intermodal",
      href: "intermodal",
      image: "/imgs/train-1.avif",
      icon: FiGitBranch,
    },
    {
      title: "Almacenamiento",
      href: "warehousing",
      image: "/imgs/almacen_service.avif",
      icon: FiArchive,
    },
  ],
  "en-US": [
    {
      title: "Over The Road",
      href: "ground",
      image: "/imgs/terrestre-dryvan.avif",
      icon: FiTruck,
    },
    {
      title: "Air",
      href: "air",
      image: "/imgs/aereo.avif",
      icon: FiSend,
    },
    {
      title: "Intermodal",
      href: "intermodal",
      image: "/imgs/train-1.avif",
      icon: FiGitBranch,
    },
    {
      title: "Warehousing",
      href: "warehousing",
      image: "/imgs/almacen_service.avif",
      icon: FiArchive,
    },
  ],
} satisfies Record<Locale, Array<{ title: string; href: "ground" | "air" | "intermodal" | "warehousing"; image: string; icon: typeof FiTruck }>>;

const copyByLocale = {
  "es-MX": {
    eyebrow: "Servicios logísticos",
    title: "Elige el tipo de servicio que necesitas",
  },
  "en-US": {
    eyebrow: "Logistics services",
    title: "Choose the service model your operation needs",
  },
} satisfies Record<Locale, { eyebrow: string; title: string }>;

type ServicesPageProps = {
  locale: Locale;
};

export function meta() {
  return buildLocalizedPageMeta("services", "es-MX");
}

export function ServicesPage({ locale }: ServicesPageProps) {
  const copy = copyByLocale[locale];
  const serviceCards = serviceCardsByLocale[locale];

  return (
    <main className="min-h-screen text-slate-950">
      <section className="relative overflow-hidden bg-[#0B1120] px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#015095] opacity-20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/3 -translate-x-1/4 rounded-full bg-blue-600/10 blur-[100px]" />
        </div>

        <div className="section-shell relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#0079e3] backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#0079e3] shadow-[0_0_8px_#0079e3]" />
              {copy.eyebrow}
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
              {copy.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="section-shell">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="reveal-up"
                  style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
                >
                  <Link
                    to={getLocalizedPath(card.href, locale)}
                    className="group relative flex min-h-[22rem] overflow-hidden rounded-[2rem] bg-[#202F4C] shadow-[0_24px_60px_rgba(32,47,76,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(32,47,76,0.24)]"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,47,76,0.12)_0%,rgba(32,47,76,0.28)_35%,rgba(32,47,76,0.88)_100%)]" />

                    <div className="relative flex w-full flex-col justify-between p-6 text-white">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/16 bg-white/10 backdrop-blur-sm">
                        <Icon className="text-2xl" />
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em]">
                          {card.title}
                        </h2>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#202F4C] transition-transform duration-300 group-hover:translate-x-1">
                          <FiArrowRight className="text-lg" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ServiciosIndex() {
  return <ServicesPage locale="es-MX" />;
}
