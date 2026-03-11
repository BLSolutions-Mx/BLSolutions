import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArchive, FiFileText, FiRepeat } from "react-icons/fi";
import { blsContent } from "./blsContent";

const serviceCards = [
  {
    ...blsContent.servicesSpecific[3],
    icon: FiFileText,
  },
  {
    ...blsContent.servicesSpecific[4],
    icon: FiArchive,
  },
  {
    ...blsContent.servicesSpecific[5],
    icon: FiRepeat,
  },
];

export default function SupportServices() {
  return (
    <section id="support-services" className="scroll-mt-28 px-6 py-20 md:py-24">
      <div className="section-shell">
        <div className="mb-10 space-y-4">
          <div className="section-label">Servicios complementarios</div>
          <h2 className="section-title">Apoyo operativo para mantener tu carga en movimiento</h2>
          <p className="section-copy max-w-3xl">
            Complementamos el transporte con servicios que te ayudan a mantener continuidad,
            orden documental y una coordinacion mas clara.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(32,47,76,0.18)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,47,76,0.1)_0%,rgba(32,47,76,0.68)_45%,rgba(32,47,76,0.94)_100%)]" />

                <div className="relative z-10 flex min-h-[27rem] flex-col justify-end p-6 text-white md:p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14 backdrop-blur-sm">
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="text-2xl font-semibold leading-tight">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/80">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-3 text-sm text-white/86">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-2xl border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#202F4C] transition-transform hover:-translate-y-0.5"
                  >
                    Hablar de este servicio
                    <FiArrowRight />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
