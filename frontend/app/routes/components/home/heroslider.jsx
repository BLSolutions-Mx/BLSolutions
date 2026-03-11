import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPhoneCall } from "react-icons/fi";
import { blsContent } from "./blsContent";

const slides = [
  {
    title: "Tu operacion Mexico-USA, coordinada de punta a punta",
    text: "Te apoyamos con transporte, aduana, almacenamiento y seguimiento para que tu carga avance con mayor claridad y control.",
  },
  {
    title: "Un solo punto de contacto para toda tu logistica",
    text: blsContent.proposal.promise,
  },
  {
    title: "Visibilidad y respuesta durante todo el trayecto",
    text: blsContent.workingMethod.philosophy,
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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(1,80,149,0.38),_transparent_34%),linear-gradient(135deg,_#202F4C_0%,_#16243d_40%,_#015095_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_58%)] blur-3xl" />

      <div className="section-shell">
        <div className="grid min-h-[auto] items-center gap-8 lg:min-h-[84vh] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:gap-12">
          <div className="space-y-7 pt-6 text-white sm:space-y-8 lg:pr-6 lg:pt-0">
            <div className="section-label border-white/20 bg-white/8 text-white">
              {blsContent.company.slogan}
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#202F4C] transition-transform hover:-translate-y-0.5 sm:px-6"
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

          <div className="glass-panel mx-auto w-full max-w-xl border-[rgba(94,104,120,0.14)] bg-[#f5f8fc] p-4 text-[#202F4C] shadow-[0_24px_70px_rgba(32,47,76,0.14)] sm:p-5 md:max-w-none md:p-6">
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-[rgba(94,104,120,0.14)] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#015095]">
                  Enfoque
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight sm:text-2xl">
                  {blsContent.company.focus}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#5E6878]">
                  {blsContent.proposal.summary}
                </p>
              </div>

              
              <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(94,104,120,0.14)]">
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
