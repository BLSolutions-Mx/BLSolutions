import type { Route } from "./+types/home";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiTruck,
  FiWind,
  FiAnchor,
  FiLayers,
  FiCheckCircle,
  FiPhoneCall,
} from "react-icons/fi";
import { blsContent } from "./components/home/blsContent";
import HeroSlider from "./components/home/heroslider";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";
import WhatsAppFloatingButton from "./components/ui/whatsAppFloatButton";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "BL Solutions | Logística integral México-USA" },
    {
      name: "description",
      content:
        "BL Solutions coordina transporte, aduana, almacenamiento y seguimiento para operaciones logísticas México-USA.",
    },
  ];
}

const servicePreview = [
  {
    key: "terrestre",
    title: "Transporte Terrestre",
    summary: "Coordinamos tu carga de punta a punta con la unidad adecuada para cada ruta.",
    icon: FiTruck,
    image: "/home-imgs/terrestre-dryvan.avif",
    href: "/servicios/terrestre",
  },
  {
    key: "aereo",
    title: "Transporte Aéreo",
    summary: "Movemos envíos urgentes o de alto valor con tiempos controlados.",
    icon: FiWind,
    image: "/home-imgs/aereo.avif",
    href: "/servicios/aereo",
  },
  {
    key: "maritimo",
    title: "Transporte Marítimo",
    summary: "Coordinación operativa y documental desde origen hasta entrega.",
    icon: FiAnchor,
    image: "/home-imgs/maritimo.avif",
    href: "/servicios/maritimo",
  },
  {
    key: "complementarios",
    title: "Servicios Complementarios",
    summary: "Aduana, almacenamiento y coordinación integral para tu operación.",
    icon: FiLayers,
    image: "/home-imgs/about.avif",
    href: "/servicios/complementarios",
  },
];

export default function Home() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />
      <HeroSlider />

      {/* --- About Preview --- */}
      <section className="scroll-mt-28 px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="section-grid mx-auto max-w-6xl">
            <div className="min-w-0 glass-panel p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="section-label">¿Qué hacemos?</div>
                <h2 className="section-title">
                  Acompañamiento logístico para operaciones México-USA
                </h2>
                <p className="section-copy max-w-2xl">
                  {blsContent.about.description}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/nosotros"
                  className="inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                >
                  Conocer más
                  <FiArrowRight />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(1,80,149,0.16)] bg-white/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#5E6878] transition-colors hover:border-[rgba(1,80,149,0.4)] hover:bg-white"
                >
                  Contactar
                  <FiPhoneCall />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Preview --- */}
      <section className="scroll-mt-28 px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="section-label">Nuestros servicios</div>
              <h2 className="section-title">Soluciones integrales bajo un solo responsable</h2>
              <p className="section-copy max-w-3xl">
                {blsContent.proposal.summary}
              </p>
            </div>
            <Link
              to="/servicios"
              className="inline-flex text-nowrap items-center gap-2 self-start rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095] lg:self-auto"
            >
              Ver todos los servicios
              <FiArrowRight />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {servicePreview.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    to={service.href}
                    className="group relative block overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(32,47,76,0.12)] transition-transform hover:-translate-y-1"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,47,76,0.05)_0%,rgba(32,47,76,0.58)_40%,rgba(32,47,76,0.92)_100%)]" />
                    <div className="relative z-10 flex min-h-[22rem] flex-col justify-end p-6 text-white md:min-h-[24rem] md:p-8">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14 backdrop-blur-sm">
                        <Icon className="text-xl" />
                      </div>
                      <h3 className="text-2xl font-semibold leading-tight">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/80">{service.summary}</p>
                      <div className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-white/14 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors group-hover:bg-white/22">
                        Ver detalle
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Differentiator / Trust Preview --- */}
      <section className="scroll-mt-28 px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="glass-panel mx-auto max-w-6xl overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-6 md:p-10">
                <div className="section-label mb-4">Por qué BL Solutions</div>
                <h2 className="section-title mb-6">
                  {blsContent.differentiator.concept}
                </h2>
                <ul className="space-y-3">
                  {blsContent.differentiator.pillars.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="soft-card flex items-center gap-3 px-4 py-4 text-sm font-semibold text-[#202F4C]"
                    >
                      <FiCheckCircle className="text-[#015095]" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <Link
                  to="/nosotros"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                >
                  Más sobre nosotros
                  <FiArrowRight />
                </Link>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-[#202F4C] p-6 md:p-8">
                  <div className="flex h-full flex-col justify-center text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      Resultado para un cliente
                    </p>
                    <p className="mt-5 text-lg font-semibold leading-8">
                      {blsContent.testimonial.before}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-white/72">
                      {blsContent.testimonial.solution}
                    </p>
                    <p className="mt-5 rounded-[1.4rem] bg-white/10 px-4 py-4 text-base leading-8 text-white">
                      {blsContent.testimonial.result}
                    </p>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/62">
                      {blsContent.testimonial.client}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="mt-6 overflow-hidden rounded-[2rem] bg-[#202F4C] p-6 text-white shadow-[0_24px_80px_rgba(32,47,76,0.18)] lg:hidden"
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
              <h2 className="text-3xl font-extrabold leading-[1.02] tracking-[-0.04em] md:text-4xl">
                {blsContent.nextStep.action}
              </h2>
              <p className="mt-4 text-base leading-8 text-white/72">
                {blsContent.nextStep.conditions}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {blsContent.nextStep.benefits.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/16 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/86"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <Link
                to="/contacto"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
              >
                Agendar evaluación
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
