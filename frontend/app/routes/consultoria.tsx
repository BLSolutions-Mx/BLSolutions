import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiCompass, FiTrendingDown, FiGitBranch } from "react-icons/fi";
import { blsContent } from "./components/home/blsContent";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";
import WhatsAppFloatingButton from "./components/ui/whatsAppFloatButton";

const areaIcons = [FiBarChart2, FiTrendingDown, FiCompass, FiGitBranch, FiArrowRight];

export function meta() {
  return [
    { title: "Consultoría | BL Solutions" },
    {
      name: "description",
      content:
        "Consultoría logística para optimizar rutas, costos de transporte, modos de operación y estrategias cross-border.",
    },
  ];
}

export default function Consultoria() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(1,80,149,0.38),_transparent_34%),linear-gradient(135deg,_#202F4C_0%,_#16243d_40%,_#015095_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_58%)] blur-3xl" />

        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="section-label mb-6 border-white/20 bg-white/8 text-white">
              Consultoría
            </div>
            <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] sm:text-5xl md:text-6xl">
              Análisis logístico para tomar mejores decisiones
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              {blsContent.consultancy.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            {blsContent.consultancy.approach.map((paragraph, index) => (
              <motion.div
                key={paragraph}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
                className={`glass-panel p-6 md:p-8 ${index === 2 ? "lg:col-span-2" : ""}`}
              >
                <p className="text-base leading-8 text-[#5E6878]">{paragraph}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="mb-10 space-y-4">
            <div className="section-label">Áreas de consultoría</div>
            <h2 className="section-title">Enfoque práctico y operativo</h2>
            <p className="section-copy max-w-3xl">
              Revisamos la operación actual, identificamos oportunidades y proponemos cambios que
              puedan ejecutarse de forma realista.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blsContent.consultancy.areas.map((area, index) => {
              const Icon = areaIcons[index];
              return (
                <motion.article
                  key={area}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-panel flex flex-col gap-4 p-6 md:p-8"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#015095]/10">
                    <Icon className="text-xl text-[#015095]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#202F4C]">{area}</h3>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#202F4C_0%,_#16243d_40%,_#015095_100%)] p-8 text-white shadow-[0_24px_80px_rgba(32,47,76,0.22)] md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_48%)]" />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold leading-[1.02] tracking-[-0.04em] md:text-4xl">
                Hablemos de tu operación actual
              </h2>
              <p className="mt-4 text-base leading-8 text-white/72">
                Revisamos rutas, procesos y estructura logística para detectar oportunidades de
                mejora en costos, tiempos y eficiencia.
              </p>
              <Link
                to="/contacto"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
              >
                Solicitar consultoría
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
