import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPhoneCall } from "react-icons/fi";

const slides = [
  {
    title: "Transporte Nacional Confiable",
    text: "Cubrimos todo el territorio mexicano con soluciones de transporte seguras y puntuales",
  },
  {
    title: "Expertos en Comercio Internacional",
    text: "Facilitamos tus operaciones de importacion y exportacion con un servicio personalizado y eficiente",
  },
  {
    title: "Soluciones Logisticas Globales",
    text: "Conectamos tu negocio con el mundo a traves de nuestra red internacional de transporte y distribucion",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => resetTimeout();
  }, [index]);

  const handleDragEnd = (e, info) => {
    const offset = info.offset.x;
    if (offset < -100) {
      setIndex((prev) => (prev + 1) % slides.length);
    } else if (offset > 100) {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-10 pt-24 sm:px-6 sm:pt-28 md:pb-14 md:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(52,96,121,0.4),_transparent_34%),linear-gradient(135deg,_#112431_0%,_#1f3644_42%,_#346079_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_58%)] blur-3xl" />

      <div className="section-shell">
        <div className="grid min-h-[auto] items-center gap-8 lg:min-h-[84vh] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:gap-12">
          <div className="space-y-7 pt-6 text-white sm:space-y-8 lg:pr-6 lg:pt-0">
            <div className="section-label border-white/20 bg-white/8 text-white">
              Cobertura nacional e internacional
            </div>

            <motion.div
              className="relative w-full max-w-4xl"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <div className="relative min-h-[17.5rem] sm:min-h-[15.5rem] md:min-h-[18rem] lg:min-h-[19rem]">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                  transition={{ duration: 1, ease: [0.3, 1, 0.36, 1] }}
                  className="absolute inset-0 space-y-4 sm:space-y-5"
                >
                  <h1 className="max-w-4xl text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-7xl">
                    {slides[index].title}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 md:text-2xl md:leading-9">
                    {slides[index].text}
                  </p>
                </motion.div>
              </AnimatePresence>
              </div>
            </motion.div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#1f3644] transition-transform hover:-translate-y-0.5 sm:px-6"
              >
                Ver servicios
                <FiArrowRight />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/14 sm:px-6"
              >
                Contactar
                <FiPhoneCall />
              </a>
            </div>

            <div className="flex gap-3">
              {slides.map((slide, i) => (
                <button
                  key={slide.title}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-12 bg-white" : "w-6 bg-white/35"
                  }`}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="glass-panel mx-auto w-full max-w-xl border-slate-200/70 bg-[#f3f8fb] p-4 text-[#1f3644] shadow-[0_24px_70px_rgba(0,0,0,0.16)] sm:p-5 md:max-w-none md:p-6">
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#346079]">
                  Enfoque
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight sm:text-2xl">
                  Operaciones confiables para importacion, exportacion y transporte nacional.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-[#dfe9ee] p-5 text-[#1f3644]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#346079]">
                    Cobertura
                  </p>
                  <p className="mt-3 text-xl font-semibold leading-tight">
                    Mexico, Estados Unidos y Canada
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 text-[#1f3644]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#346079]">
                    Servicio
                  </p>
                  <p className="mt-3 text-xl font-semibold leading-tight">
                    Atencion personalizada y seguimiento puntual.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
                <img
                  src="/home-imgs/about.avif"
                  alt="Operaciones logisticas"
                  loading="eager"
                  decoding="async"
                  className="h-56 w-full object-cover sm:h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
