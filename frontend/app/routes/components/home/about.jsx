import React from "react";
import { motion } from "framer-motion";

const text =
  "Somos una empresa mexicana de logistica conformada por un equipo profesional enfocado en brindar un servicio al cliente de la mas alta calidad. Ofrecemos soluciones integrales en importaciones, exportaciones y transporte nacional dentro del territorio mexicano. Nuestro compromiso es apoyar el desarrollo del comercio mexicano mediante servicios confiables, eficientes y personalizados. Creemos en el valor de construir relaciones a largo plazo y queremos ser parte de su crecimiento.";

const words = text.split(" ");

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function About() {
  return (
    <section id="about" className="scroll-mt-28 px-6 py-20 md:py-24">
      <div className="section-shell">
        <div className="section-grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="glass-panel overflow-hidden p-3">
            <img
              src="/home-imgs/about.avif"
              loading="lazy"
              decoding="async"
              alt="Equipo de logistica"
              className="h-[420px] w-full rounded-[1.6rem] object-cover md:h-[560px]"
            />
          </div>

          <div className="glass-panel p-8 md:p-10 lg:p-12">
            <div className="mb-8 space-y-4">
              <div className="section-label">Quienes somos</div>
              <h2 className="section-title">Logistica con vision global</h2>
              <p className="section-copy max-w-2xl">
                Construimos relaciones de largo plazo con soluciones confiables, eficientes y personalizadas.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={containerVariants}
              className="section-copy flex flex-wrap"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="mr-1.5 mb-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
