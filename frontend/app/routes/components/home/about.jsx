import React from "react";
import { motion } from "framer-motion";
import { blsContent } from "./blsContent";

export default function About() {
  return (
    <section id="about" className="scroll-mt-28 px-6 py-20 md:py-24">
      <div className="section-shell">
        <div className="section-grid mx-auto max-w-6xl lg:grid-cols-2">
          <div className="min-w-0 glass-panel overflow-hidden p-3">
            <img
              src="/home-imgs/about.avif"
              loading="lazy"
              decoding="async"
              alt="Equipo de logistica"
              className="h-[420px] w-full rounded-[1.6rem] object-cover md:h-[560px]"
            />
          </div>

          <div className="min-w-0 glass-panel p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-8 space-y-4">
              <div className="section-label">Quienes somos</div>
              <h2 className="section-title">Acompanamiento logistico para operaciones Mexico-USA</h2>
              <p className="section-copy max-w-2xl">
                {blsContent.about.description}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.12 }}
              className="mt-6 rounded-[1.75rem] bg-[#202F4C] px-6 py-5 text-white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                Lo que recibes
              </p>
              <p className="mt-3 text-lg font-semibold leading-8">
                {blsContent.proposal.promise}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
