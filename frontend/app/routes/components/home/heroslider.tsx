import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";
import { FiArrowRight, FiPhoneCall } from "react-icons/fi";

const slides = [
  {
    title: "Transporte terrestre, intermodal y consultoria logistica",
    text: "BL Solutions apoya operaciones nacionales e internacionales con soluciones logisticas claras y coordinadas.",
  },
  {
    title: "Alianzas sostenibles y de largo plazo para cada operación",
    text: "Construimos relaciones duraderas con clientes y aliados para dar continuidad, respuesta y confianza operativa.",
  },
  {
    title: "Servicios integrales y de alto valor agregado",
    text: "Integramos analisis, estrategia y ejecucion para resolver cada operacion con mayor eficiencia.",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // #region agent log
  useEffect(() => {
    let framesBefore: number[] = [];
    let framesAfter: number[] = [];
    let lastFrame = performance.now();
    let counting = 0;
    const measureFrames = () => {
      const now = performance.now();
      const delta = now - lastFrame;
      lastFrame = now;
      if (counting < 30) { framesBefore.push(delta); counting++; requestAnimationFrame(measureFrames); }
      else if (counting === 30) {
        const avgBefore = framesBefore.reduce((a,b)=>a+b,0)/framesBefore.length;
        fetch('http://127.0.0.1:7873/ingest/6f36cead-20c8-4c23-af80-3f36f10adb2a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3fbf0e'},body:JSON.stringify({sessionId:'3fbf0e',location:'heroslider.tsx:frameCheck',message:'Hero slider frame timing (blur active)',data:{avgFrameTime_ms:avgBefore.toFixed(2),maxFrameTime_ms:Math.max(...framesBefore).toFixed(2),slideIndex:index,isMobile:window.innerWidth<768},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
        counting = 31;
      }
    };
    requestAnimationFrame(measureFrames);
  }, [index]);
  // #endregion

  const resetTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Browser timers drive the hero autoplay cadence.
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => resetTimeout();
  }, [index]);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-10 pt-24 sm:px-6 sm:pt-28 md:pb-14 md:pt-32 lg:min-h-screen"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/home-imgs/hero-bg.avif"
          alt="Operaciones logisticas"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(1,80,149,0.38),_transparent_34%),linear-gradient(135deg,rgba(32,47,76,0.85)_0%,rgba(22,36,61,0.80)_40%,rgba(1,80,149,0.90)_100%)] opacity-80" />
      </div>
      <div className="absolute inset-x-0 top-0 z-0 h-72 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_58%)] blur-3xl" />

      <div className="section-shell relative z-10">
        <div className="grid items-center gap-8 lg:content-center lg:items-end lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 pt-6 text-white sm:space-y-8 lg:pr-6 lg:pt-0"
          >
            <div className="section-label border-white/20 bg-white/8 text-white">
              Logistica simple y eficiente
            </div>

            <div className="relative w-full max-w-4xl">
              <div className="relative min-h-[14.5rem] sm:min-h-[15.5rem] md:min-h-[18rem] lg:min-h-[19rem]">
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
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#202F4C] transition-transform hover:-translate-y-0.5 sm:px-6"
              >
                Ver servicios
                <FiArrowRight />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/14 sm:px-6"
              >
                Contactar
                <FiPhoneCall />
              </Link>
            </div>

            <div className="flex gap-3">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.title}
                  className={`h-2 rounded-full transition-all ${
                    slideIndex === index ? "w-12 bg-white" : "w-6 bg-white/35"
                  }`}
                  onClick={() => setIndex(slideIndex)}
                  aria-label={`Ir al slide ${slideIndex + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden w-full lg:flex lg:justify-end"
          >
            <div className="w-full max-w-sm rounded-[1.5rem] border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 md:max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#015095]">
                Enfoque
              </p>
              <p className="mt-3 text-xl font-semibold leading-tight text-[#202F4C] sm:text-2xl">
                Empresa logistica mexico-americana para operaciones nacionales e internacionales.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5E6878]">
                Un solo equipo coordinando transporte, estrategia y seguimiento para cada operacion.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
