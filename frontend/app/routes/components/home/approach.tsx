import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiMessageSquare,
  FiShield,
} from "react-icons/fi";
import { blsContent } from "./blsContent";

export default function Approach() {
  return (
    <section id="approach" className="scroll-mt-28 px-6 py-20 md:py-24">
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
              <p className="mt-3 text-base leading-8 text-[#202F4C]">{blsContent.value.concept}</p>
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
            <p className="text-base leading-8 text-[#5E6878]">{blsContent.differentiator.concept}</p>
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
            <p className="mt-4 text-lg font-semibold leading-8">{blsContent.testimonial.before}</p>
            <p className="mt-4 text-sm leading-7 text-white/72">{blsContent.testimonial.solution}</p>
            <p className="mt-4 rounded-[1.4rem] bg-white/10 px-4 py-4 text-base leading-8 text-white">
              {blsContent.testimonial.result}
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/62">
              {blsContent.testimonial.client}
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
            >
              Agendar evaluación
              <FiArrowRight />
            </a>
          </motion.div>
        </div>

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
  );
}
