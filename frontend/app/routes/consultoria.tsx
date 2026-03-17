import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBarChart2,
  FiCompass,
  FiTrendingUp,
  FiTrendingDown,
  FiGitBranch,
  FiGlobe,
  FiBarChart,
} from "react-icons/fi";
import { blsContent } from "./components/home/blsContent";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";
import WhatsAppFloatingButton from "./components/ui/whatsAppFloatButton";

// Icons for the areas section
const areaIcons = [FiBarChart2, FiTrendingUp, FiTrendingDown, FiCompass, FiGlobe, FiGitBranch];

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
    <main id="app-shell" className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-[#0B1120] px-6 pb-20 pt-32 md:pb-32 md:pt-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-[#015095] opacity-20 blur-[120px]" />
          <div className="absolute -right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#202F4C] opacity-30 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-[#015095] opacity-10 blur-[80px]" />
        </div>

        <div className="section-shell relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#60A5FA] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]" />
                Consultoría Logística
              </div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                Análisis logístico para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">tomar mejores decisiones</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                {blsContent.consultancy.intro}
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                 <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0B1120] transition-all hover:bg-blue-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Solicitar Análisis
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
              <div className="relative aspect-square w-full max-w-md mx-auto">
                <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-8">
                   <div className="h-full w-full rounded-2xl border border-dashed border-white/10 bg-white/5 flex items-center justify-center">
                      <FiBarChart className="text-9xl text-white/10" />
                   </div>
                </div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 -top-6 rounded-2xl border border-white/10 bg-[#1e293b] p-4 shadow-xl"
                >
                  <FiTrendingUp className="text-3xl text-blue-400" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-[#1e293b] p-4 shadow-xl"
                >
                  <FiCompass className="text-3xl text-blue-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: APPROACH - Simplified to clean cards */}
      <section className="px-6 py-20 bg-white">
        <div className="section-shell">
          <div className="mb-12 md:text-center">
             <h2 className="text-3xl font-bold tracking-tight text-[#0B1120] sm:text-4xl">
               Nuestro Enfoque
             </h2>
             <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
               Metodología probada para optimizar cada eslabón de tu cadena de suministro.
             </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {blsContent.consultancy.approach.map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-8 transition-all hover:border-blue-100 hover:shadow-lg"
              >
                <div className="text-4xl font-black text-blue-100/80">0{index + 1}</div>
                <p className="text-base leading-relaxed text-slate-600">
                  {paragraph}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: AREAS - Bento Grid (Moved here as requested) */}
      <section className="px-6 py-20 md:py-28 bg-slate-50">
        <div className="section-shell">
          <div className="mb-16 space-y-4">
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Áreas de consultoría
            </div>
            <h2 className="text-3xl font-bold text-[#0B1120] md:text-4xl">Enfoque práctico y operativo</h2>
            <p className="max-w-3xl text-lg text-slate-600">
              Revisamos la operación actual, identificamos oportunidades y proponemos cambios que
              puedan ejecutarse de forma realista.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3 lg:gap-6 h-auto md:h-[800px]">
            {/* Item 1: Analysis - Large Feature (2x2) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl md:col-span-2 md:row-span-2 md:p-10"
            >
              <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-50/50 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <FiBarChart2 className="text-3xl" />
                </div>
                <h3 className="mb-4 text-3xl font-bold text-[#0B1120]">
                  {blsContent.consultancy.areas[0]}
                </h3>
                <p className="max-w-md text-lg leading-relaxed text-slate-600">
                  Analizamos cada dato de tu operación para encontrar eficiencias ocultas y mejorar el rendimiento global.
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600">
                Ver detalles <FiArrowRight />
              </div>
            </motion.div>

            {/* Item 2: Costos - Vertical (1x1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#0B1120] p-8 text-white shadow-lg md:col-span-1 md:row-span-1"
            >
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm">
                  <FiTrendingDown className="text-xl" />
                </div>
                <h3 className="text-xl font-bold leading-tight">
                  {blsContent.consultancy.areas[1]}
                </h3>
              </div>
              <div className="relative z-10 mt-4 h-1 w-12 rounded-full bg-blue-500/50" />
            </motion.div>

            {/* Item 3: Rutas - Vertical (1x1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-blue-50 p-8 shadow-sm transition-all hover:bg-blue-100 md:col-span-1 md:row-span-1"
            >
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-white">
                  <FiCompass className="text-xl" />
                </div>
                <h3 className="text-xl font-bold leading-tight text-[#0B1120]">
                  {blsContent.consultancy.areas[2]}
                </h3>
              </div>
            </motion.div>

            {/* Item 4: Cross-border - Wide (2x1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-lg md:col-span-2 md:row-span-1"
            >
              <div className="flex items-center gap-6">
                <div className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 md:grid">
                  <FiGlobe className="text-3xl" />
                </div>
                <div>
                  <div className="mb-2 md:hidden">
                    <FiGlobe className="text-3xl text-indigo-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#0B1120]">
                    {blsContent.consultancy.areas[3]}
                  </h3>
                  <p className="text-sm text-slate-600">
                    Gestión experta de cruces fronterizos y normatividad internacional.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Item 5: Estrategias - Square (1x1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg md:col-span-1 md:row-span-1"
            >
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                  <FiGitBranch className="text-xl" />
                </div>
                <h3 className="text-xl font-bold leading-tight">
                  {blsContent.consultancy.areas[4]}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24 bg-white">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-[#0B1120] p-8 text-white shadow-2xl md:p-16"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e293b,_transparent_70%)]" />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Hablemos de tu operación actual
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Revisamos rutas, procesos y estructura logística para detectar oportunidades de
                mejora en costos, tiempos y eficiencia.
              </p>
              <Link
                to="/contacto"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0B1120] transition-transform hover:-translate-y-1 hover:shadow-lg"
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
