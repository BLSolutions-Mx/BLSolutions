import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowLeft,
  FiFileText,
  FiArchive,
  FiRepeat,
  FiCheckCircle,
  FiLayers,
} from "react-icons/fi";
import { blsContent } from "../components/home/blsContent";
import Footer from "../components/ui/footer";
import Navbar from "../components/ui/navbar";
import WhatsAppFloatingButton from "../components/ui/whatsAppFloatButton";

export function meta() {
  return [
    { title: "Servicios Complementarios | BL Solutions" },
    {
      name: "description",
      content:
        "Agencia aduanal, almacenamiento y coordinacion integral para mantener tu operacion logistica en movimiento.",
    },
  ];
}

const aduanaData = blsContent.servicesSpecific[3];
const almacenData = blsContent.servicesSpecific[4];
const coordData = blsContent.servicesSpecific[5];

export default function ServiciosComplementarios() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      {/* --- Hero: Full-bleed image with overlay --- */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute inset-0 -z-10">
          <img
            src="/home-imgs/about.avif"
            alt="Servicios complementarios"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(32,47,76,0.94)_0%,rgba(32,47,76,0.76)_50%,rgba(1,80,149,0.88)_100%)]" />
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
              <FiLayers className="text-2xl text-white" />
            </div>
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            Servicios complementarios para tu operacion
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
            Complementamos el transporte con servicios que te ayudan a mantener continuidad,
            orden documental y una coordinacion mas clara.
          </p>

          {/* Quick nav pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Agencia Aduanal", icon: FiFileText, id: "aduana" },
              { label: "Almacenamiento", icon: FiArchive, id: "almacen" },
              { label: "Coordinacion Integral", icon: FiRepeat, id: "coordinacion" },
            ].map((pill) => {
              const Icon = pill.icon;
              return (
                <a
                  key={pill.id}
                  href={`#${pill.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/18"
                >
                  <Icon className="text-white/70" />
                  {pill.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Aduana Section: Image cards overlay --- */}
      <section id="aduana" className="scroll-mt-28 px-6 py-20 md:py-24">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="group relative overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(32,47,76,0.12)]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${aduanaData.image}')` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(32,47,76,0.94)_0%,rgba(32,47,76,0.78)_50%,rgba(1,80,149,0.72)_100%)]" />

              <div className="relative z-10 grid gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-14">
                <div className="text-white">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/14 backdrop-blur-sm">
                      <FiFileText className="text-xl" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      Servicio 01
                    </p>
                  </div>
                  <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{aduanaData.title}</h2>
                  <p className="mt-4 text-base leading-8 text-white/78 md:text-lg">
                    {aduanaData.description}
                  </p>
                  <Link
                    to="/contacto"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
                  >
                    Hablar de este servicio
                    <FiArrowRight />
                  </Link>
                </div>
                <div className="flex flex-col justify-center">
                  <ul className="space-y-3">
                    {aduanaData.bullets.map((bullet, idx) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                        className="flex items-center gap-3 rounded-2xl border border-white/14 bg-white/10 px-4 py-4 text-sm font-medium text-white/90 backdrop-blur-sm"
                      >
                        <FiCheckCircle className="shrink-0 text-white/60" />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Almacenamiento Section: Side by side with image --- */}
      <section id="almacen" className="scroll-mt-28 px-6 py-20 md:py-24">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel mx-auto max-w-6xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[320px]">
                <img
                  src={almacenData.image}
                  alt={almacenData.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#015095]/10">
                    <FiArchive className="text-xl text-[#015095]" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                    Servicio 02
                  </p>
                </div>
                <h2 className="text-3xl font-semibold text-[#202F4C] md:text-4xl">
                  {almacenData.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5E6878] md:text-lg">
                  {almacenData.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {almacenData.bullets.map((bullet, idx) => (
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
                <Link
                  to="/contacto"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                >
                  Hablar de este servicio
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Coordinacion Section: Centered card emphasis --- */}
      <section id="coordinacion" className="scroll-mt-28 px-6 py-20 md:py-24">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-[2rem] bg-[#202F4C] p-6 text-white shadow-[0_24px_80px_rgba(32,47,76,0.22)] md:p-10 lg:p-14">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/14">
                  <FiRepeat className="text-xl" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  Servicio 03
                </p>
              </div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                {coordData.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-white/78 md:text-lg">
                {coordData.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {coordData.bullets.map((bullet, idx) => (
                  <motion.div
                    key={bullet}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 }}
                    className="rounded-2xl border border-white/14 bg-white/8 p-5 text-center backdrop-blur-sm"
                  >
                    <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-white/14">
                      <span className="text-sm font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-sm font-medium leading-6 text-white/86">{bullet}</p>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/contacto"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
              >
                Hablar de este servicio
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA Banner --- */}
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
              <h2 className="text-2xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-3xl">
                ¿Buscas una solucion integral?
              </h2>
              <p className="mt-3 max-w-xl mx-auto text-sm leading-7 text-white/72">
                Combinamos transporte, aduana, almacenamiento y coordinacion para darte una experiencia mas simple y controlada.
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
