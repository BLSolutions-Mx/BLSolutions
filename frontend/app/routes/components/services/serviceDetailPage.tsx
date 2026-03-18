import { Link } from "react-router";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Footer from "../ui/footer";
import Navbar from "../ui/navbar";

type ServiceDetailPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: IconType;
};

export default function ServiceDetailPage({
  eyebrow,
  title,
  description,
  image,
  icon: Icon,
}: ServiceDetailPageProps) {
  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-32 pt-28 md:pb-40 md:pt-36">
        <div className="absolute inset-0 -z-10">
          <img src={image} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,47,76,0.88)_0%,rgba(32,47,76,0.72)_50%,rgba(32,47,76,0.94)_100%)]" />
        </div>

        <div className="section-shell relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl">
              <Link
                to="/servicios"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:bg-white/14"
              >
                <FiArrowLeft />
                Volver a servicios
              </Link>
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/14 backdrop-blur-sm">
                  <Icon className="text-2xl text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  {eyebrow}
                </p>
              </div>
              <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                {title}
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="-mt-20 px-6 md:-mt-24">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel mx-auto max-w-5xl p-6 md:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[280px] overflow-hidden rounded-[2rem]">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#015095]">
                  {eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#202F4C] md:text-4xl">{title}</h2>
                <p className="mt-4 text-base leading-8 text-[#5E6878]">{description}</p>
                <Link
                  to="/contacto"
                  className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-[#202F4C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#015095]"
                >
                  Contactar
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
