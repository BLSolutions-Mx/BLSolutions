import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowLeft,
  FiAnchor,
  FiCheckCircle,
  FiGlobe,
  FiFileText,
  FiTrendingUp,
} from "react-icons/fi";
import { blsContent } from "../components/home/blsContent";
import Footer from "../components/ui/footer";
import Navbar from "../components/ui/navbar";
import WhatsAppFloatingButton from "../components/ui/whatsAppFloatButton";

export function meta() {
  return [
    { title: "Transporte Marítimo (FCL/LCL) | BL Solutions" },
    {
      name: "description",
      content:
        "Transporte marítimo FCL y LCL para comercio internacional. Coordinación aduanal y seguimiento desde origen hasta destino final.",
    },
  ];
}

const maritimoData = blsContent.servicesSpecific[2];

const advantages = [
  {
    icon: FiGlobe,
    title: "Alcance global",
    text: "Conectamos tu operación con puertos estratégicos y rutas internacionales.",
  },
  {
    icon: FiFileText,
    title: "Soporte documental",
    text: "Cuidamos la documentación para que tu carga cruce sin contratiempos.",
  },
  {
    icon: FiTrendingUp,
    title: "Costo por volumen",
    text: "Mueve grandes volúmenes a costos competitivos con opciones FCL y LCL.",
  },
];

export default function TransporteMaritimo() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      {/* --- Hero: Overlapping card on image --- */}
      <section className="relative overflow-hidden px-6 pb-32 pt-28 md:pb-40 md:pt-36">
        <div className="absolute inset-0 -z-10">
          <img
            src="/home-imgs/hero_maritimo.avif"
            alt="Transporte marítimo"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,47,76,0.82)_0%,rgba(32,47,76,0.60)_40%,rgba(32,47,76,0.92)_100%)]" />
        </div>

        <div className="section-shell relative z-10">
          <Link
            to="/servicios"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:bg-white/14"
          >
            <FiArrowLeft />
            Servicios
          </Link>
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/14 backdrop-blur-sm">
              <FiAnchor className="text-2xl text-white" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
              FCL / LCL
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            {maritimoData.title}
          </h1>
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
            <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <h2 className="text-2xl font-semibold text-[#202F4C] md:text-3xl">
                  Coordinación marítima de origen a destino
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5E6878] md:text-lg">
                  {maritimoData.description}
                </p>
                <Link
                  to="/contacto"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                >
                  Solicitar cotización
                  <FiArrowRight />
                </Link>
              </div>
              <div className="flex flex-col justify-center">
                <ul className="space-y-3">
                  {maritimoData.bullets.map((bullet, idx) => (
                    <motion.li
                      key={bullet}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="soft-card flex items-start gap-3 px-4 py-4 text-slate-700"
                    >
                      <FiCheckCircle className="mt-0.5 shrink-0 text-[#015095]" />
                      <span className="font-medium">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Advantages: Stacked card layout --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="mb-10 space-y-4">
            <div className="section-label">Ventajas marítimas</div>
            <h2 className="section-title">Mover volumen con coordinación y control</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel relative overflow-hidden p-6 md:p-8"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 bg-[radial-gradient(circle_at_top_right,_rgba(1,80,149,0.12),_transparent_70%)]" />
                  <div className="relative z-10">
                    <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#015095]/10">
                      <Icon className="text-xl text-[#015095]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#202F4C]">{adv.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5E6878]">{adv.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- FCL vs LCL comparison --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-[80vw]">
            <div className="mb-10 space-y-4 text-center">
              <div className="section-label">Modalidades</div>
              <h2 className="section-title">FCL vs LCL: ¿Cuál es la mejor opción?</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border-2 border-[#015095]/20 bg-white p-6 shadow-[0_16px_40px_rgba(32,47,76,0.08)] md:p-8"
              >
                <div className="mb-4 inline-flex rounded-full bg-[#015095] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  FCL
                </div>
                <h3 className="text-2xl font-semibold text-[#202F4C]">Contenedor Completo</h3>
                <p className="mt-3 text-sm leading-7 text-[#5E6878]">
                  Ideal cuando tienes volumen suficiente para llenar un contenedor. Mayor control, horarios más predecibles y costo competitivo por unidad.
                </p>
                <ul className="mt-5 space-y-2">
                  {["Mayor seguridad", "Tiempos de tránsito directos", "Ideal para alto volumen"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm font-medium text-[#202F4C]"
                      >
                        <FiCheckCircle className="text-[#015095]" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border-2 border-[#202F4C]/20 bg-white p-6 shadow-[0_16px_40px_rgba(32,47,76,0.08)] md:p-8"
              >
                <div className="mb-4 inline-flex rounded-full bg-[#202F4C] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  LCL
                </div>
                <h3 className="text-2xl font-semibold text-[#202F4C]">Carga Consolidada</h3>
                <p className="mt-3 text-sm leading-7 text-[#5E6878]">
                  Perfecto para volúmenes que no llenan un contenedor completo. Compartes espacio reduciendo costos sin perder seguimiento.
                </p>
                <ul className="mt-5 space-y-2">
                  {["Menor inversion inicial", "Flexibilidad de volumen", "Seguimiento integral"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm font-medium text-[#202F4C]"
                      >
                        <FiCheckCircle className="text-[#015095]" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
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
            className="glass-panel mx-auto max-w-[80vw] p-8 text-center md:p-12"
          >
            <FiAnchor className="mx-auto text-4xl text-[#015095]/40" />
            <h2 className="mt-4 text-2xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#202F4C] md:text-3xl">
              ¿Necesitas mover carga por mar?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#5E6878]">
              Te ayudamos a elegir entre FCL y LCL según tu volumen, frecuencia y tipo de carga.
            </p>
            <Link
              to="/contacto"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
            >
              Solicitar evaluación
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <WhatsAppFloatingButton />
      <Footer />
    </main>
  );
}
