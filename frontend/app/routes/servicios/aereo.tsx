import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowLeft,
  FiWind,
  FiClock,
  FiMapPin,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";
import { blsContent } from "../components/home/blsContent";
import Footer from "../components/ui/footer";
import Navbar from "../components/ui/navbar";
import WhatsAppFloatingButton from "../components/ui/whatsAppFloatButton";

export function meta() {
  return [
    { title: "Transporte Aereo | BL Solutions" },
    {
      name: "description",
      content:
        "Transporte aereo para envios urgentes y de alto valor. Coordinacion puerta a puerta con seguimiento en tiempo real.",
    },
  ];
}

const aereoData = blsContent.servicesSpecific[1];

const features = [
  {
    icon: FiClock,
    title: "Tiempos controlados",
    description: "Garantizamos ventanas de entrega precisas para operaciones sensibles al tiempo.",
  },
  {
    icon: FiMapPin,
    title: "Puerta a puerta",
    description: "Coordinamos desde la recoleccion hasta la entrega final sin que pierdas visibilidad.",
  },
  {
    icon: FiActivity,
    title: "Seguimiento constante",
    description: "Monitoreo de tu envio con actualizaciones proactivas durante todo el trayecto.",
  },
];

export default function TransporteAereo() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      {/* --- Hero: Full-bleed image --- */}
      <section className="relative overflow-hidden px-6 pb-32 pt-28 md:pb-40 md:pt-36">
        <div className="absolute inset-0 -z-10">
          <img
            src={aereoData.image}
            alt="Transporte aereo"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(32,47,76,0.92)_0%,rgba(32,47,76,0.68)_45%,rgba(1,80,149,0.82)_100%)]" />
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
              <FiWind className="text-2xl text-white" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
              Envios urgentes y de alto valor
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            {aereoData.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
            {aereoData.description}
          </p>
          <Link
            to="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
          >
            Cotizar envio aereo
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* --- Overlapping feature cards --- */}
      <section className="-mt-20 px-6 md:-mt-24">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel flex flex-col items-center p-6 text-center md:p-8"
                >
                  <div className="mb-5 grid h-16 w-16 place-items-center rounded-[1.5rem] bg-[linear-gradient(135deg,_#202F4C,_#015095)]">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#202F4C]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5E6878]">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* --- Bullets list with side image --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="glass-panel mx-auto max-w-5xl overflow-hidden">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[280px] lg:min-h-0">
                <img
                  src={aereoData.image}
                  alt="Operaciones aereas"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <h3 className="text-2xl font-semibold text-[#202F4C] md:text-3xl">
                  Ideal para operaciones que no pueden esperar
                </h3>
                <p className="mt-4 section-copy">
                  {aereoData.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {aereoData.bullets.map((bullet, idx) => (
                    <motion.li
                      key={bullet}
                      initial={{ opacity: 0, x: -12 }}
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
            className="rounded-[2rem] bg-[#202F4C] p-8 text-white shadow-[0_24px_80px_rgba(32,47,76,0.22)] md:p-12"
          >
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
              <FiWind className="text-4xl text-white/40" />
              <h2 className="text-2xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-3xl">
                ¿Tienes un envio urgente?
              </h2>
              <p className="max-w-xl text-sm leading-7 text-white/72">
                Contactanos y te damos una solucion rapida con seguimiento desde el primer momento.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
              >
                Cotizar ahora
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
