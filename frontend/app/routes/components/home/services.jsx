import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTruck,
  FiWind,
  FiAnchor,
  FiPackage,
  FiThermometer,
  FiBox,
  FiLayers,
  FiCheckCircle,
  FiArrowRight,
  FiChevronRight,
} from "react-icons/fi";
import { blsContent } from "./blsContent";

const services = [
  {
    ...blsContent.servicesSpecific[0],
    icon: FiTruck,
    subServices: blsContent.servicesSpecific[0].subServices.map((item, index) => ({
      ...item,
      icon: [FiPackage, FiThermometer, FiBox, FiLayers][index],
    })),
  },
  {
    ...blsContent.servicesSpecific[1],
    icon: FiWind,
  },
  {
    ...blsContent.servicesSpecific[2],
    icon: FiAnchor,
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
    const current = services.find((service) => service.key === activeServiceKey);
    if (current?.subServices?.length > 0) {
      setActiveSubServiceKey(current.subServices[0].key);
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
            <h2 className="section-title">Soluciones integrales bajo un solo responsable</h2>
            <p className="section-copy max-w-3xl">
              {blsContent.proposal.summary}
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = activeServiceKey === service.key;
            return (
              <button
                key={service.key}
                onClick={() => setActiveServiceKey(service.key)}
                className={`flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-in-out focus:outline-none ${
                  isActive
                    ? "border-[#015095] bg-[#202F4C] text-white shadow-[0_18px_40px_rgba(32,47,76,0.2)]"
                    : "border-[rgba(1,80,149,0.16)] bg-white/70 text-[#5E6878] hover:border-[rgba(1,80,149,0.4)] hover:bg-white"
                }`}
              >
                <Icon
                  className={`text-lg transition-colors ${isActive ? "text-white/80" : "text-[#015095]"}`}
                />
                {service.title}
              </button>
            );
          })}
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
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={displayImage}
                    src={displayImage}
                    alt={displayAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-72 w-full rounded-[1.75rem] object-cover md:h-[30rem]"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
                <motion.div
                  key={displayAlt}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute bottom-4 left-4 rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#202F4C] shadow-lg backdrop-blur-sm"
                >
                  {displayAlt}
                </motion.div>
              </div>

              <div className="w-full">
                <h3 className="mb-6 text-3xl font-semibold text-[#202F4C] md:text-4xl">
                  {activeService.title}
                </h3>

                {activeService.subServices ? (
                  <div>
                    {activeService.summary && (
                      <p className="mb-6 section-copy">{activeService.summary}</p>
                    )}

                    <div className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {activeService.subServices.map((subService, index) => {
                        const SubIcon = subService.icon;
                        const isSubActive = activeSubServiceKey === subService.key;

                        return (
                          <motion.button
                            key={subService.key}
                            onClick={() => setActiveSubServiceKey(subService.key)}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 + 0.1 }}
                            className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                              isSubActive
                                ? "border-[#015095] bg-[#202F4C] text-white shadow-[0_8px_24px_rgba(32,47,76,0.15)]"
                                : "border-[rgba(94,104,120,0.14)] bg-white text-slate-700 hover:border-[rgba(1,80,149,0.3)] hover:shadow-[0_4px_12px_rgba(32,47,76,0.06)]"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                isSubActive ? "bg-white/15" : "bg-[#015095]/8"
                              }`}
                            >
                              <SubIcon
                                className={`text-lg ${isSubActive ? "text-white" : "text-[#015095]"}`}
                              />
                            </div>
                            <p
                              className={`min-w-0 text-sm font-semibold leading-tight ${
                                isSubActive ? "text-white" : "text-[#202F4C]"
                              }`}
                            >
                              {subService.title}
                            </p>
                            <FiChevronRight
                              className={`ml-auto shrink-0 text-sm transition-transform duration-200 ${
                                isSubActive
                                  ? "rotate-90 text-white/60"
                                  : "text-slate-400 group-hover:translate-x-0.5"
                              }`}
                            />
                          </motion.button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSubServiceKey}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                        className="space-y-5"
                      >
                        {activeSubService && (
                          <>
                            <p className="section-copy">{activeSubService.description}</p>
                            <a
                              href="#contact"
                              className="inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                            >
                              Cotizar este servicio
                              <FiArrowRight />
                            </a>
                          </>
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
                          <motion.li
                            key={bullet}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.15 }}
                            className="soft-card flex items-start gap-3 px-4 py-4 text-slate-700"
                          >
                            <FiCheckCircle className="mt-0.5 shrink-0 text-[#015095]" />
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                      >
                        Cotizar este servicio
                        <FiArrowRight />
                      </a>
                    </motion.div>
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
