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

      <section className="relative overflow-hidden bg-[#0B1120] px-6 pb-20 pt-32 md:pb-32 md:pt-40">
        {/* Abstract Background Elements - Distinct from Consultoria */}
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#1e293b] opacity-50 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] translate-y-1/3 -translate-x-1/4 rounded-full bg-[#015095] opacity-20 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/20 blur-[80px]" />
        </div>

        <div className="section-shell relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#0079e3] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#0079e3] shadow-[0_0_8px_#0079e3]" />
                Nosotros
              </div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                Equipo logístico con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">enfoque operativo</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Empresa logística méxico-americana con sede en Ciudad de México y enfoque en
                operaciones nacionales e internacionales.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Abstract Team/Connection Graphic */}
              <div className="relative aspect-square w-full max-w-md mx-auto">
                 {/* Central Hub */}
                 <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center z-20">
                    <FiUsers className="text-4xl text-blue-400" />
                 </div>
                 
                 {/* Orbiting Elements */}
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border border-dashed border-white/10"
                 />
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-4 rounded-full border border-white/5"
                 />
                 
                 {/* Satellite Nodes */}
                 <motion.div 
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-1/4 h-16 w-16 rounded-2xl bg-[#1e293b] border border-white/10 flex items-center justify-center shadow-lg z-30"
                 >
                    <FiCompass className="text-2xl text-blue-400" />
                 </motion.div>
                 
                 <motion.div 
                    animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 left-1/4 h-16 w-16 rounded-2xl bg-[#1e293b] border border-white/10 flex items-center justify-center shadow-lg z-30"
                 >
                    <FiSettings className="text-2xl text-blue-400" />
                 </motion.div>
              </div>
            </motion.div>
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
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#202F4C] text-sm font-bold text-white">
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
