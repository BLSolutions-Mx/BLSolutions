import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiTruck,
  FiWind,
  FiAnchor,
  FiLayers,
} from "react-icons/fi";
import { blsContent } from "./components/home/blsContent";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";
import WhatsAppFloatingButton from "./components/ui/whatsAppFloatButton";

export function meta() {
  return [
    { title: "Servicios Logisticos | BL Solutions" },
    {
      name: "description",
      content:
        "Descubre nuestros servicios logisticos: transporte terrestre, aereo, maritimo, agencia aduanal, almacenamiento y coordinacion integral.",
    },
  ];
}

const serviceCategories = [
  {
    key: "terrestre",
    title: "Transporte Terrestre",
    subtitle: "FTL / LTL",
    summary:
      "Coordinamos tu carga de punta a punta con la unidad adecuada para cada ruta, ya sea una operacion Mexico-USA o una entrega nacional.",
    icon: FiTruck,
    image: "/home-imgs/terrestre-dryvan.avif",
    href: "/servicios/terrestre",
    highlights: ["Caja seca (Dry Van)", "Refrigerado (Reefer)", "Camion tipo box", "Plataforma (Flatbed)"],
  },
  {
    key: "aereo",
    title: "Transporte Aereo",
    subtitle: "Envios urgentes",
    summary:
      "Movemos envios urgentes o de alto valor con tiempos controlados y comunicacion constante.",
    icon: FiWind,
    image: "/home-imgs/aereo.avif",
    href: "/servicios/aereo",
    highlights: ["Operaciones sensibles al tiempo", "Coordinacion puerta a puerta", "Seguimiento en tiempo real"],
  },
  {
    key: "maritimo",
    title: "Transporte Maritimo",
    subtitle: "FCL / LCL",
    summary:
      "Te ayudamos a mover volumen internacional con coordinacion operativa y documental desde origen hasta entrega.",
    icon: FiAnchor,
    image: "/home-imgs/maritimo.avif",
    href: "/servicios/maritimo",
    highlights: ["FCL y LCL", "Coordinacion aduanal", "Seguimiento desde origen"],
  },
  {
    key: "complementarios",
    title: "Servicios Complementarios",
    subtitle: "Aduana · Almacen · Coordinacion",
    summary:
      "Complementamos el transporte con servicios que te ayudan a mantener continuidad, orden documental y una coordinacion mas clara.",
    icon: FiLayers,
    image: "/home-imgs/about.avif",
    href: "/servicios/complementarios",
    highlights: ["Agencia aduanal", "Almacenamiento", "Coordinacion integral"],
  },
];

export default function Servicios() {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      {/* --- Page Hero: Mosaic image background --- */}
      <section className="relative overflow-hidden px-6 pb-28 pt-28 md:pb-36 md:pt-36">
        {/* 4-image mosaic background */}
        <div className="absolute inset-0 -z-10 grid grid-cols-2 grid-rows-2">
          <div className="relative overflow-hidden">
            <img src="/home-imgs/terrestre-dryvan.avif" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="relative overflow-hidden">
            <img src="/home-imgs/aereo.avif" alt="" className="h-full w-full object-cover object-center" />
          </div>
          <div className="relative overflow-hidden">
            <img src="/home-imgs/maritimo.avif" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="relative overflow-hidden">
            <img src="/home-imgs/about.avif" alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        {/* Strong overlay so text is legible */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(170deg,rgba(32,47,76,0.96)_0%,rgba(32,47,76,0.82)_40%,rgba(1,80,149,0.88)_100%)]" />

        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="section-label mb-6 border-white/20 bg-white/8 text-white">
              Nuestros servicios
            </div>
            <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] sm:text-5xl md:text-6xl">
              Soluciones integrales bajo un solo responsable
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              {blsContent.proposal.summary}
            </p>
          </div>
        </div>
      </section>

      {/* --- Overlapping service quick-nav --- */}
      <section className="-mt-12 px-6 md:-mt-14">
        <div className="section-shell">
          <div className="flex flex-wrap justify-center gap-3">
            {serviceCategories.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.key}
                  to={s.href}
                  className="glass-panel flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-[#202F4C] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(32,47,76,0.14)]"
                  style={{ borderRadius: "9999px" }}
                >
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-[#015095]/10">
                    <Icon className="text-xs text-[#015095]" />
                  </div>
                  {s.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- All Services Grid --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="space-y-8">
            {serviceCategories.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-panel overflow-hidden"
                >
                  <div className={`grid lg:grid-cols-2 ${isEven ? "" : "direction-rtl"}`}>
                    {/* Image */}
                    <div className={`relative min-h-[320px] lg:min-h-[400px] ${!isEven ? "lg:order-2" : ""}`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#202F4C]/40 to-transparent lg:bg-none" />
                    </div>

                    {/* Content */}
                    <div className={`flex flex-col justify-center p-6 md:p-8 lg:p-10 ${!isEven ? "lg:order-1" : ""}`}>
                      <div className="mb-2 flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#015095]/10">
                          <Icon className="text-lg text-[#015095]" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                          {service.subtitle}
                        </p>
                      </div>

                      <h2 className="mt-2 text-3xl font-semibold text-[#202F4C] md:text-4xl">
                        {service.title}
                      </h2>

                      <p className="mt-4 section-copy">{service.summary}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full border border-[rgba(1,80,149,0.16)] bg-[#f5f8fc] px-3.5 py-2 text-xs font-semibold text-[#202F4C]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={service.href}
                        className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                      >
                        Ver detalle completo
                        <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-extrabold leading-[1.02] tracking-[-0.04em] md:text-4xl">
                ¿Necesitas una solucion a la medida?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/72">
                Evaluamos tu operacion y proponemos la combinacion ideal de servicios para tu ruta Mexico-USA.
              </p>
              <Link
                to="/contacto"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
              >
                Solicitar evaluacion
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
