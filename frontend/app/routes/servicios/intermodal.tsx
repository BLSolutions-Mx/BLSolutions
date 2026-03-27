import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiArrowLeft, FiArrowRight, FiAnchor, FiGitBranch } from "react-icons/fi";
import { buildSeoMeta, OG_IMAGE_PATHS } from "../../lib/seo";

const modes = [
  {
    key: "maritimo",
    title: "Intermodal Marítimo",
    image: "/imgs/maritimo.avif",
    icon: FiAnchor,
    description:
      "Combinamos transporte marítimo y terrestre para optimizar costos en rutas de larga distancia con grandes volúmenes de carga. Coordinamos cada etapa para mantener tiempos y visibilidad durante todo el trayecto.",
  },
  {
    key: "ferroviario",
    title: "Intermodal Ferroviario",
    image: "/imgs/train-1.avif",
    icon: FiGitBranch,
    description:
      "Alternativa eficiente para media y larga distancia cuando conviene combinar ferrocarril y transporte terrestre. Permite mover grandes volúmenes con mayor estabilidad operativa y control de costos.",
  },
];

export function meta() {
  return buildSeoMeta({
    title: "Intermodal",
    description:
      "Soluciones intermodales marítimas y ferroviarias para operaciones de media y larga distancia con foco en costo, estabilidad y visibilidad.",
    path: "/servicios/intermodal",
    image: OG_IMAGE_PATHS.intermodal,
    keywords: ["transporte intermodal", "intermodal marítimo", "intermodal ferroviario"],
  });
}

export default function IntermodalPage() {
  return (
    <main className="min-h-screen text-slate-950">
      <section className="relative isolate overflow-hidden px-6 pb-32 pt-28 md:pb-40 md:pt-36">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#0B1120]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#1e293b_0%,#0f172a_50%,#020617_100%)]" />
          <div className="absolute -right-[15%] -top-[25%] h-[min(520px,70vw)] w-[min(520px,70vw)] rounded-full bg-[#015095]/20 blur-[110px]" />
          <div className="absolute -bottom-[20%] -left-[15%] h-[min(420px,60vw)] w-[min(420px,60vw)] rounded-full bg-[#202F4C]/25 blur-[100px]" />
        </div>

        <div className="section-shell relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl">
              <Link
                to="/servicios"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:bg-white/14"
              >
                <FiArrowLeft />
                Volver a servicios
              </Link>
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/14 backdrop-blur-sm">
                  <FiGitBranch className="text-2xl text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Servicios logísticos
                </p>
              </div>
              <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                Intermodal
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="-mt-20 px-6 pb-20 md:-mt-24">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-2">
            {modes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.key}
                  className="service-detail-glass reveal-up p-6 md:p-8"
                  style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
                >
                  <div className="relative mb-6 min-h-[270px] overflow-hidden rounded-[1.5rem] md:min-h-[290px]">
                    <img
                      src={mode.image}
                      alt={mode.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#015095]/10">
                      <Icon className="text-lg text-[#015095]" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                      Intermodal
                    </p>
                  </div>
                  <h2 className="text-2xl font-semibold text-[#202F4C]">{mode.title}</h2>
                  <p className="mt-3 text-base leading-8 text-[#5E6878]">{mode.description}</p>
                  <Link
                    to="/contacto"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                  >
                    Contactar
                    <FiArrowRight />
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
