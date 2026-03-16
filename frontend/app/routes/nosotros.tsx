import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiFileText,
  FiMessageSquare,
  FiAlertTriangle,
} from "react-icons/fi";
import { blsContent } from "./components/home/blsContent";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";
import WhatsAppFloatingButton from "./components/ui/whatsAppFloatButton";

export function meta() {
  return [
    { title: "Nosotros | BL Solutions" },
    {
      name: "description",
      content:
        "Conoce BL Solutions: logística integral México-USA con atención cercana, seguimiento puntual y soluciones a la medida.",
    },
  ];
}

export default function Nosotros() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      {/* --- Page Hero --- */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(1,80,149,0.38),_transparent_34%),linear-gradient(135deg,_#202F4C_0%,_#16243d_40%,_#015095_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_58%)] blur-3xl" />

        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="section-label mb-6 border-white/20 bg-white/8 text-white">
              ¿Quiénes somos?
            </div>
            <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] sm:text-5xl md:text-6xl">
              Acompañamiento logístico para operaciones México-USA
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              {blsContent.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- What the client gets (Proposal) --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              {/* Client Profile */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                className="glass-panel p-6 md:p-8"
              >
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                    Perfil de cliente
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#202F4C] md:text-3xl">
                    Trabajamos con empresas que necesitan certeza en cada movimiento
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {blsContent.about.clientProfile.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className="soft-card flex items-center gap-3 px-4 py-4"
                    >
                      <FiCheckCircle className="shrink-0 text-[#015095]" />
                      <span className="text-sm font-semibold text-[#202F4C]">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Promise + What you get */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: 0.08 }}
                className="flex flex-col gap-6"
              >
                <div className="glass-panel flex flex-1 flex-col justify-center p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                    Nuestra propuesta
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#202F4C] md:text-3xl">
                    {blsContent.proposal.promise}
                  </h3>
                  <p className="mt-4 section-copy">{blsContent.proposal.summary}</p>
                </div>
                <div className="rounded-[2rem] bg-[#202F4C] p-6 text-white md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                    Experiencia del cliente
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {blsContent.clientExperience.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/14 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/86"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Full Approach Section (from original) --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="mb-10 space-y-4">
            <div className="section-label">Así te acompañamos</div>
            <h2 className="section-title">Más visibilidad y control para tu operación</h2>
            <p className="section-copy max-w-3xl">
              {blsContent.value.solution} Diseñamos soluciones flexibles con seguimiento
              proactivo y responsabilidad total.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="glass-panel p-6 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#202F4C] text-white">
                  <FiAlertTriangle className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                    Lo que cuidamos
                  </p>
                  <p className="text-lg font-semibold text-[#202F4C]">
                    {blsContent.logisticsRisk.premise}
                  </p>
                </div>
              </div>

              <p className="section-copy">{blsContent.logisticsRisk.consequence}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {blsContent.logisticsRisk.costs.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.05 }}
                    className="soft-card flex items-center gap-3 px-4 py-4"
                  >
                    <FiCheckCircle className="shrink-0 text-[#015095]" />
                    <span className="text-sm font-semibold text-[#202F4C]">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-[#eaf2fb] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#015095]">
                  Lo que ayudas a evitar
                </p>
                <p className="mt-3 text-base leading-8 text-[#202F4C]">
                  {blsContent.value.concept}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.08 }}
              className="glass-panel p-6 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#015095] text-white">
                  <FiMessageSquare className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                    Nuestro proceso
                  </p>
                  <p className="text-lg font-semibold text-[#202F4C]">
                    {blsContent.workingMethod.philosophy}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {blsContent.workingMethod.process.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06 }}
                    className={`soft-card p-5 ${index === blsContent.workingMethod.process.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#202F4C] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-base font-semibold leading-7 text-[#202F4C]">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom row: Differentiator, Compliance, Strategic */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.2fr)]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="glass-panel p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#202F4C] text-white">
                  <FiShield className="text-lg" />
                </div>
                <p className="text-lg font-semibold text-[#202F4C]">Lo que distingue nuestro servicio</p>
              </div>
              <p className="text-base leading-8 text-[#5E6878]">
                {blsContent.differentiator.concept}
              </p>
              <ul className="mt-5 space-y-3">
                {blsContent.differentiator.pillars.map((item) => (
                  <li
                    key={item}
                    className="soft-card flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#202F4C]"
                  >
                    <FiCheckCircle className="text-[#015095]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.08 }}
              className="glass-panel p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#015095] text-white">
                  <FiFileText className="text-lg" />
                </div>
                <p className="text-lg font-semibold text-[#202F4C]">Confianza operativa</p>
              </div>
              <ul className="space-y-3">
                {blsContent.compliance.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-[rgba(94,104,120,0.14)] bg-[#f5f8fc] px-4 py-3 text-sm font-semibold text-[#202F4C]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.12 }}
              className="overflow-hidden rounded-[2rem] bg-[#202F4C] p-6 text-white shadow-[0_24px_80px_rgba(32,47,76,0.18)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Resultado para un cliente
              </p>
              <p className="mt-4 text-lg font-semibold leading-8">
                {blsContent.testimonial.before}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/72">
                {blsContent.testimonial.solution}
              </p>
              <p className="mt-4 rounded-[1.4rem] bg-white/10 px-4 py-4 text-base leading-8 text-white">
                {blsContent.testimonial.result}
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/62">
                {blsContent.testimonial.client}
              </p>

              <Link
                to="/contacto"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
              >
                Agendar evaluación
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>

          {/* Strategic Model */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.16 }}
            className="mt-6 glass-panel p-6 md:p-8"
          >
            <div className="mb-6 space-y-3">
              <div className="section-label">Enfoque estratégico</div>
              <h3 className="text-2xl font-semibold text-[#202F4C] md:text-3xl">
                Adaptamos la solución a la realidad de tu operación
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {blsContent.strategicModel.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06 }}
                  className="soft-card px-5 py-5"
                >
                  <p className="text-base font-semibold leading-7 text-[#202F4C]">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Coverage Section --- */}
      <section className="relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-24">
        <div className="section-shell relative z-10">
          <div className="mb-10 space-y-4 text-center">
            <div className="section-label">Nuestra cobertura</div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="section-title"
            >
              Cobertura operativa para rutas México-USA
            </motion.h2>
            <p className="section-copy mx-auto max-w-3xl">
              Operamos con enfoque binacional, red validada y seguimiento puntual para mantener el control de cada movimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Corredor México-USA",
                items: blsContent.coverage.corridorPoints,
              },
              {
                title: "Cobertura Nacional",
                items: [],
                description: blsContent.coverage.nationalDescription,
              },
              {
                title: "Cruces Estratégicos",
                items: blsContent.coverage.crossings,
              },
            ].map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-gradient-to-br from-[#202F4C] to-[#015095] p-6 shadow-[0_24px_80px_rgba(31,54,68,0.18)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_42%)]" />
                <div className="relative z-10 mb-6">
                  <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
                </div>

                {section.description && (
                  <p className="mb-4 leading-8 text-white/82">{section.description}</p>
                )}

                {section.items && section.items.length > 0 && (
                  <ul className="space-y-3 text-white/88">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
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
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold leading-[1.02] tracking-[-0.04em] md:text-4xl">
                Revisemos tu ruta México-USA
              </h2>
              <p className="mt-4 text-base leading-8 text-white/72">
                {blsContent.nextStep.action} {blsContent.nextStep.conditions}
              </p>
              <Link
                to="/contacto"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
              >
                Contactar ahora
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
