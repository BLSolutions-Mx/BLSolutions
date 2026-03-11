import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

const services = [
  {
    key: "terrestre",
    title: "Transporte Terrestre (FTL)",
    image: "",
    subServices: [
      {
        key: "dryvan",
        title: "Caja seca (Dry Van)",
        image: "/home-imgs/terrestre-dryvan.avif",
        description: "Ideal para productos generales sin requerimientos especiales.",
      },
      {
        key: "reefer",
        title: "Refrigerado (Reefer)",
        image: "/home-imgs/terrestre-reefer.avif",
        description:
          "Transporte con temperatura controlada para alimentos, medicamentos o productos sensibles.",
      },
      {
        key: "boxtruck",
        title: "Camion tipo box (Box Truck)",
        image: "/home-imgs/terrestre-boxtruck.avif",
        description: "Para entregas urbanas, de menor volumen o acceso limitado.",
      },
      {
        key: "flatbed",
        title: "Plataforma (Flatbed)",
        image: "/home-imgs/terrestre-flatbed.avif",
        description:
          "Perfecto para carga sobredimensionada, maquinaria o materiales que requieren carga lateral o superior.",
      },
    ],
  },
  {
    key: "aereo",
    title: "Transporte Aereo (Air Freight)",
    image: "/home-imgs/aereo.avif",
    description:
      "Coordinamos envios por via aerea para mercancias urgentes o de alto valor. Ofrecemos entregas rapidas y seguras desde y hacia Mexico con cobertura internacional.",
    bullets: [
      "Ideal para tiempos criticos",
      "Coordinacion puerta a puerta",
      "Seguimiento en tiempo real",
    ],
  },
  {
    key: "maritimo",
    title: "Transporte Maritimo (Ocean Freight)",
    image: "/home-imgs/maritimo.avif",
    description:
      "Solucion eficiente y economica para grandes volumenes de carga internacional. Trabajamos con los principales puertos de Mexico y Estados Unidos.",
    bullets: [
      "FCL (contenedor completo) y LCL (carga consolidada)",
      "Coordinacion aduanal",
      "Seguimiento desde origen hasta destino final",
    ],
  },
];

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function Services() {
  const [activeServiceKey, setActiveServiceKey] = useState(services[0].key);
  const [activeSubServiceKey, setActiveSubServiceKey] = useState(null);

  const activeService = services.find((service) => service.key === activeServiceKey);
  const activeSubService = activeService?.subServices?.find(
    (subService) => subService.key === activeSubServiceKey
  );

  useEffect(() => {
    const currentService = services.find((service) => service.key === activeServiceKey);
    if (currentService?.subServices?.length > 0) {
      setActiveSubServiceKey(currentService.subServices[0].key);
    } else {
      setActiveSubServiceKey(null);
    }
  }, [activeServiceKey]);

  const displayImage =
    activeSubService?.image || activeService?.image || "/home-imgs/about.avif";
  const displayAlt = activeSubService?.title || activeService?.title || "Servicio";

  if (!activeService) return null;

  return (
    <section id="services" className="scroll-mt-28 px-6 py-20 md:py-24">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="section-label">Nuestros servicios</div>
            <h2 className="section-title">Movemos cada operacion con el modo correcto</h2>
          </div>
          <p className="section-copy max-w-2xl">
            La misma oferta de servicios, reorganizada para que cada modalidad se entienda rapido y se compare mejor.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {services.map((service) => (
            <button
              key={service.key}
              onClick={() => setActiveServiceKey(service.key)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-in-out focus:outline-none ${
                activeServiceKey === service.key
                  ? "border-[#346079] bg-[#1f3644] text-white shadow-[0_18px_40px_rgba(31,54,68,0.2)]"
                  : "border-[#346079]/16 bg-white/70 text-slate-600 hover:border-[#346079]/40 hover:bg-white"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeServiceKey}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="glass-panel overflow-hidden p-6 md:p-8"
          >
            <div className="section-grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="w-full">
                <motion.img
                  key={displayImage}
                  src={displayImage}
                  alt={displayAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-72 w-full rounded-[1.75rem] object-cover md:h-[30rem]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </div>

              <div className="w-full">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <div className="section-label">Categoria activa</div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#346079]">
                    <FiArrowUpRight />
                    Solucion especializada
                  </span>
                </div>

                <h3 className="mb-5 text-3xl font-semibold text-[#1f3644] md:text-4xl">
                  {activeService.title}
                </h3>

                {activeService.subServices ? (
                  <div>
                    <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-5">
                      {activeService.subServices.map((subService) => (
                        <button
                          key={subService.key}
                          onClick={() => setActiveSubServiceKey(subService.key)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                            activeSubServiceKey === subService.key
                              ? "bg-[#346079] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {subService.title}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSubServiceKey}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                      >
                        {activeSubService && (
                          <div className="space-y-5">
                            <p className="section-copy">{activeSubService.description}</p>
                            <div className="soft-card p-5">
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#346079]">
                                Aplicacion
                              </p>
                              <p className="mt-3 text-lg font-semibold text-[#1f3644]">
                                {activeSubService.title}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeService.description && (
                      <p className="section-copy whitespace-pre-line">
                        {activeService.description}
                      </p>
                    )}
                    {activeService.bullets && activeService.bullets.length > 0 && (
                      <ul className="space-y-3">
                        {activeService.bullets.map((bullet, index) => (
                          <li
                            key={index}
                            className="soft-card flex items-start gap-3 px-4 py-4 text-slate-700"
                          >
                            <FiCheckCircle className="mt-0.5 shrink-0 text-[#346079]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Services;
