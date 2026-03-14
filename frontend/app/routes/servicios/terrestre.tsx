import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiArrowRight,
  FiArrowLeft,
  FiTruck,
  FiPackage,
  FiThermometer,
  FiBox,
  FiLayers,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";
import { blsContent } from "../components/home/blsContent";
import Footer from "../components/ui/footer";
import Navbar from "../components/ui/navbar";
import WhatsAppFloatingButton from "../components/ui/whatsAppFloatButton";

export function meta() {
  return [
    { title: "Transporte Terrestre (FTL/LTL) | BL Solutions" },
    {
      name: "description",
      content:
        "Transporte terrestre FTL y LTL para operaciones Mexico-USA. Caja seca, refrigerado, camion tipo box y plataforma.",
    },
  ];
}

const terrestreData = blsContent.servicesSpecific[0];
const subServiceIcons = [FiPackage, FiThermometer, FiBox, FiLayers];

export default function TransporteTerrestre() {
  const [activeSubIdx, setActiveSubIdx] = useState(0);
  const activeSub = terrestreData.subServices[activeSubIdx];

  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      {/* --- Hero with Full-width Image --- */}
      <section className="relative overflow-hidden px-6 pb-32 pt-28 md:pb-40 md:pt-36">
        <div className="absolute inset-0 -z-10">
          <img
            src="/home-imgs/terrestre-dryvan.avif"
            alt="Transporte terrestre"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,47,76,0.88)_0%,rgba(32,47,76,0.72)_50%,rgba(32,47,76,0.94)_100%)]" />
        </div>

        <div className="section-shell relative z-10">
          <Link
            to="/servicios"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:bg-white/14"
          >
            <FiArrowLeft />
            Volver a servicios
          </Link>
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/14 backdrop-blur-sm">
                <FiTruck className="text-2xl text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                FTL / LTL
              </p>
            </div>
            <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
              {terrestreData.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              {terrestreData.summary}
            </p>
          </div>
        </div>
      </section>

      {/* --- Overlapping intro card --- */}
      <section className="-mt-20 px-6 md:-mt-24">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel mx-auto max-w-5xl p-6 md:p-10"
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">Cobertura de servicio</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#202F4C] md:text-3xl">
                  La columna vertebral de la logistica Mexico-USA
                </h2>
                <p className="mt-3 section-copy">
                  Coordinamos el tipo de unidad correcto para cada ruta y tipo de carga. Tus envios avanzan con visibilidad y respuesta real.
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-2 md:flex-col md:items-end md:justify-center">
                {["Carga seca", "Refrigerada", "Sobredimensionada", "Volumen parcial"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(1,80,149,0.16)] bg-[#f5f8fc] px-3.5 py-2 text-xs font-semibold text-[#202F4C] whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Sub-services Interactive Section --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="mb-10 space-y-4">
            <div className="section-label">Modalidades de servicio</div>
            <h2 className="section-title">Elige la unidad adecuada para tu carga</h2>
            <p className="section-copy max-w-3xl">
              Cada tipo de carga tiene necesidades diferentes. Selecciona la modalidad y conoce como te ayudamos.
            </p>
          </div>

          {/* Sub-service tabs */}
          <div className="mb-8 flex flex-wrap gap-3">
            {terrestreData.subServices.map((sub, idx) => {
              const Icon = subServiceIcons[idx];
              const isActive = activeSubIdx === idx;
              return (
                <button
                  key={sub.key}
                  onClick={() => setActiveSubIdx(idx)}
                  className={`flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-in-out focus:outline-none ${
                    isActive
                      ? "border-[#015095] bg-[#202F4C] text-white shadow-[0_18px_40px_rgba(32,47,76,0.2)]"
                      : "border-[rgba(1,80,149,0.16)] bg-white/70 text-[#5E6878] hover:border-[rgba(1,80,149,0.4)] hover:bg-white"
                  }`}
                >
                  <Icon
                    className={`text-lg transition-colors ${isActive ? "text-white/80" : "text-[#015095]"}`}
                  />
                  {sub.title}
                </button>
              );
            })}
          </div>

          {/* Active Sub-service Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="glass-panel overflow-hidden"
            >
              <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="relative min-h-[320px] lg:min-h-[460px]">
                  <motion.img
                    key={activeSub.image}
                    src={activeSub.image}
                    alt={activeSub.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#202F4C] shadow-lg backdrop-blur-sm">
                    {activeSub.title}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                  <div className="mb-2 flex items-center gap-3">
                    {(() => {
                      const Icon = subServiceIcons[activeSubIdx];
                      return (
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#015095]/10">
                          <Icon className="text-lg text-[#015095]" />
                        </div>
                      );
                    })()}
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold text-[#202F4C] md:text-4xl">
                    {activeSub.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[#5E6878] md:text-lg">
                    {activeSub.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/contacto"
                      className="inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                    >
                      Cotizar este servicio
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- Why Terrestrial Section --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[2rem] bg-[#202F4C] p-6 text-white md:p-8"
              >
                <h3 className="text-2xl font-semibold md:text-3xl">
                  ¿Por que elegir transporte terrestre?
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  El transporte terrestre es la columna vertebral de la logistica Mexico-USA.
                  Te permite mover carga con flexibilidad, visibilidad y control directo.
                </p>
                <ul className="mt-6 space-y-3 text-white/86">
                  {[
                    "Flexibilidad en rutas y horarios",
                    "Seguimiento en tiempo real",
                    "Coordinacion puerta a puerta",
                    "Opciones para todo tipo de carga",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium"
                    >
                      <FiCheckCircle className="shrink-0 text-white/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-panel p-6 md:p-8"
              >
                <h3 className="text-2xl font-semibold text-[#202F4C] md:text-3xl">
                  Todas las modalidades
                </h3>
                <p className="mt-3 section-copy">
                  Explora cada opcion disponible para encontrar la que mejor se ajusta a tu operacion.
                </p>
                <div className="mt-6 space-y-3">
                  {terrestreData.subServices.map((sub, idx) => {
                    const Icon = subServiceIcons[idx];
                    return (
                      <button
                        key={sub.key}
                        onClick={() => {
                          setActiveSubIdx(idx);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group flex w-full items-center gap-3 rounded-2xl border border-[rgba(94,104,120,0.14)] bg-white p-4 text-left transition-all hover:border-[rgba(1,80,149,0.3)] hover:shadow-[0_4px_12px_rgba(32,47,76,0.06)]"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#015095]/8">
                          <Icon className="text-lg text-[#015095]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#202F4C]">{sub.title}</p>
                          <p className="mt-0.5 truncate text-xs text-[#5E6878]">{sub.description}</p>
                        </div>
                        <FiChevronRight className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#202F4C_0%,_#16243d_40%,_#015095_100%)] p-8 text-white shadow-[0_24px_80px_rgba(32,47,76,0.22)] md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_48%)]" />
            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-3xl">
                  ¿Listo para mover tu carga con mayor certeza?
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Evaluamos tu ruta, tipo de carga y frecuencia para ofrecerte la mejor opcion terrestre.
                </p>
              </div>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
              >
                Solicitar cotizacion
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WhatsAppFloatingButton />
      <Footer />
    </main>
  );
}
