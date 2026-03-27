import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiArrowRight, FiPhoneCall } from "react-icons/fi";

export default function HeroSlider() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-10 pt-24 sm:px-6 sm:pt-28 md:pb-14 md:pt-32 lg:min-h-screen"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/imgs/hero-bg.avif"
          alt="Operaciones logísticas"
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
              Logística simple y eficiente
            </div>

            <div className="space-y-4 sm:space-y-5">
              <h1 className="max-w-4xl text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-7xl">
              Soluciones logísticas diseñadas para impulsar tu empresa
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 md:text-2xl md:leading-9">
                Apoyamos operaciones nacionales e internacionales con soluciones logísticas claras y coordinadas.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/servicios"
                prefetch="intent"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#202F4C] transition-transform hover:-translate-y-0.5 sm:px-6"
              >
                Ver servicios
                <FiArrowRight />
              </Link>
              <Link
                to="/contacto"
                prefetch="intent"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/14 sm:px-6"
              >
                Contactar
                <FiPhoneCall />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
