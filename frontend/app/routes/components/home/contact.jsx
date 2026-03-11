import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const infoVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.2, type: "spring", stiffness: 100 },
  }),
};

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.6, duration: 0.6 },
  },
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          success: true,
          message: result.message || "Mensaje enviado con exito.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || "Hubo un error al enviar el mensaje.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        success: false,
        message: "No se pudo conectar con el servidor. Intenta mas tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="scroll-mt-28 px-6 py-20 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="section-shell">
        <motion.div
          className="glass-panel mx-auto grid max-w-6xl gap-6 p-5 md:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] md:p-6 lg:gap-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-[2rem] bg-[#132633] p-7 text-white md:p-8">
            <div className="mb-8 space-y-4">
              <div className="section-label border-white/15 bg-white/8 text-white">
                Contactanos
              </div>
              <h2 className="text-4xl font-extrabold leading-[1] tracking-[-0.04em]">
                Hablemos de tu siguiente movimiento logistico
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <FiMapPin />,
                  title: "Direccion",
                  text: "Bosque de Cafetos 14, Bosques de las Lomas, Miguel Hidalgo, Ciudad de Mexico, Mexico",
                },
                { icon: <FiPhone />, title: "Telefono", text: "+52 55 1486 8313" },
                {
                  icon: <FiMail />,
                  title: "Correo electronico",
                  text: "operations@blsolutions.com.mx",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="flex items-start space-x-4 rounded-[1.4rem] border border-white/10 bg-white/6 p-4"
                  custom={idx}
                  variants={infoVariants}
                >
                  <div className="mt-1 text-2xl text-[#9bc5dd]">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-white/72">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="rounded-[2rem] bg-white p-6 md:p-8" variants={formVariants}>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#346079]">
                Formulario
              </p>
              <p className="mt-3 text-2xl font-semibold text-[#1f3644]">
                Cuentanos sobre tu operacion
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
              <div>
                <label htmlFor="name" className="mb-2 block font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fbfd] p-4 focus:outline-none focus:ring-2 focus:ring-[#346079]"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-medium">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fbfd] p-4 focus:outline-none focus:ring-2 focus:ring-[#346079]"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-medium">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Escribe tu mensaje"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-36 w-full rounded-2xl border border-slate-200 bg-[#f8fbfd] p-4 focus:outline-none focus:ring-2 focus:ring-[#346079]"
                />
              </div>
              {submitStatus.message && (
                <div
                  className={`rounded-2xl p-3 text-center text-sm ${
                    submitStatus.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#1f3644] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#346079] disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={isSubmitting ? {} : { scale: 1.03 }}
                whileTap={isSubmitting ? {} : { scale: 0.97 }}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
