import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiUsers, FiSettings, FiCompass } from "react-icons/fi";
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
        "Conoce a BL Solutions, empresa logística méxico-americana con sede en Ciudad de México enfocada en operaciones nacionales e internacionales.",
    },
  ];
}

const aboutBlocks = [
  {
    title: "Quiénes somos",
    copy: blsContent.about.description,
    icon: FiUsers,
  },
  {
    title: "Cómo trabajamos",
    copy:
      "Nuestro enfoque comienza con entender a fondo la operación logística de cada cliente. Analizamos sus procesos, rutas y necesidades para identificar oportunidades que permitan mejorar la eficiencia de su operación.",
    icon: FiCompass,
  },
  {
    title: "Cómo ejecutamos",
    copy:
      "Una vez definida la estrategia adecuada, nuestro equipo se encarga de coordinar y ejecutar la solución. Contamos con un equipo comprometido y enfocado en operar cada movimiento de forma eficiente.",
    icon: FiSettings,
  },
];

export default function Nosotros() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(1,80,149,0.38),_transparent_34%),linear-gradient(135deg,_#202F4C_0%,_#16243d_40%,_#015095_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_58%)] blur-3xl" />

        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="section-label mb-6 border-white/20 bg-white/8 text-white">Nosotros</div>
            <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] sm:text-5xl md:text-6xl">
              Equipo logístico con enfoque operativo
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              Empresa logística méxico-americana con sede en Ciudad de México y enfoque en
              operaciones nacionales e internacionales.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-3">
            {aboutBlocks.map((block, index) => {
              const Icon = block.icon;
              return (
                <motion.article
                  key={block.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.08 }}
                  className="glass-panel p-6 md:p-8"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#015095]/10">
                    <Icon className="text-xl text-[#015095]" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-[#202F4C]">{block.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[#5E6878]">{block.copy}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="glass-panel p-6 md:p-8"
            >
                <div className="section-label">Lo que hacemos</div>
              <h2 className="mt-4 text-3xl font-semibold text-[#202F4C] md:text-4xl">
                Entendemos primero, operamos después
              </h2>
              <div className="mt-6 grid gap-3">
                {blsContent.workingMethod.process.map((step, index) => (
                  <div key={step} className="soft-card flex items-center gap-3 px-4 py-4">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[#202F4C] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold text-[#202F4C]">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.08 }}
              className="overflow-hidden rounded-[2rem] bg-[#202F4C] p-6 text-white shadow-[0_24px_80px_rgba(32,47,76,0.18)] md:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Principios de trabajo
              </p>
              <p className="mt-4 text-lg font-semibold leading-8">
                {blsContent.differentiator.concept}
              </p>
              <ul className="mt-6 space-y-3">
                {blsContent.differentiator.pillars.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 text-sm font-semibold text-white"
                  >
                    <FiCheckCircle className="text-[#9bc5dd]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
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
                Coordinemos una solución para tu operación
              </h2>
              <p className="mt-4 text-base leading-8 text-white/72">
                Si necesitas transporte, intermodal o consultoría, revisamos la operación y
                definimos el siguiente paso.
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
