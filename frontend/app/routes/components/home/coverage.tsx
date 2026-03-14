import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaShip } from "react-icons/fa";
import { GiMexico } from "react-icons/gi";
import { blsContent } from "./blsContent";

type CoverageSection = {
  title: string;
  icon: ReactNode;
  items: string[];
  color: string;
  description?: string;
};

function Coverage() {
  const coverageData: CoverageSection[] = [
    {
      title: "Corredor Mexico-USA",
      icon: <FaGlobe className="text-2xl" />,
      items: blsContent.coverage.corridorPoints,
      color: "from-[#202F4C] to-[#015095]",
    },
    {
      title: "Cobertura Nacional",
      icon: <GiMexico className="text-[#202F4C] text-3xl" />,
      items: [],
      description: blsContent.coverage.nationalDescription,
      color: "from-[#202F4C] to-[#015095]",
    },
    {
      title: "Cruces Estrategicos",
      icon: <FaShip className="text-2xl" />,
      items: blsContent.coverage.crossings,
      color: "from-[#202F4C] to-[#015095]",
    },
  ];

  return (
    <section id="coverage" className="relative scroll-mt-28 overflow-hidden px-6 py-20 md:py-24">
      <div className="section-shell relative z-10">
        <div className="mb-10 space-y-4 text-center">
          <div className="section-label">Nuestra cobertura</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Cobertura operativa para rutas Mexico-USA
          </motion.h2>
          <p className="section-copy mx-auto max-w-3xl">
            Operamos con enfoque binacional, red validada y seguimiento puntual para mantener el control de cada movimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {coverageData.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
              className={`relative overflow-hidden rounded-[2rem] border border-white/40 bg-gradient-to-br p-6 shadow-[0_24px_80px_rgba(31,54,68,0.18)] ${section.color}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_42%)]" />
              <div className="relative z-10 mb-6 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white/18 text-white">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
              </div>

              {section.description && (
                <p className="mb-4 leading-8 text-white/82">{section.description}</p>
              )}

              {section.items.length > 0 && (
                <ul className="space-y-3 text-white/88">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Coverage;
