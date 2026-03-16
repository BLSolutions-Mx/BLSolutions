import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { blsContent } from "./blsContent";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = {
  success: boolean | null;
  message: string;
};

type ContactResponse = {
  success?: boolean;
  message?: string;
};

type ContactItem = {
  icon: ReactNode;
  title: string;
  text: string;
  href?: string;
};

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    success: null,
    message: "",
  });

  const contactItems: ContactItem[] = [
    {
      icon: <FiMapPin />,
      title: "Dirección",
      text: blsContent.contact.address,
    },
    {
      icon: <FiPhone />,
      title: "Teléfono",
      text: blsContent.contact.phone,
      href: `tel:${blsContent.contact.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: <FiMail />,
      title: "Correo electrónico",
      text: blsContent.contact.email,
      href: `mailto:${blsContent.contact.email}`,
    },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

      const result = (await response.json()) as ContactResponse;

      if (response.ok && result.success) {
        setSubmitStatus({
          success: true,
          message: result.message || "Mensaje enviado con éxito.",
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
    >
      <div className="section-shell">
        <motion.div
          className="glass-panel mx-auto grid w-full max-w-6xl gap-6 p-4 sm:p-5 md:grid-cols-2 md:p-6 lg:gap-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <div className="min-w-0 rounded-[2rem] bg-[#132633] p-6 text-white sm:p-7 md:p-8">
            <div className="mb-8 space-y-4">
              <div className="section-label border-white/15 bg-white/8 text-white">
                Evaluación estratégica
              </div>
              <h2 className="text-3xl font-extrabold leading-[1] tracking-[-0.04em] sm:text-4xl">
                Revisemos tu ruta México-USA
              </h2>
              <p className="text-base leading-8 text-white/72">
                {blsContent.nextStep.action} {blsContent.nextStep.conditions}
              </p>
            </div>

            <div className="mb-6 space-y-3">
              {blsContent.nextStep.benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white/86"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                >
                  {benefit}
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              {contactItems.map((item, index) =>
                item.href ? (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    className="flex min-w-0 items-start space-x-4 rounded-[1.4rem] border border-white/10 bg-white/6 p-4 transition-colors hover:bg-white/10"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                  >
                    <div className="mt-1 text-2xl text-[#9bc5dd]">{item.icon}</div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 break-words text-white/72">{item.text}</p>
                    </div>
                  </motion.a>
                ) : (
                  <motion.div
                    key={item.title}
                    className="flex min-w-0 items-start space-x-4 rounded-[1.4rem] border border-white/10 bg-white/6 p-4 transition-colors hover:bg-white/10"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                  >
                    <div className="mt-1 text-2xl text-[#9bc5dd]">{item.icon}</div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 break-words text-white/72">{item.text}</p>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>

          <motion.div
            className="min-w-0 rounded-[2rem] bg-white p-5 sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#015095]">
                Formulario
              </p>
              <p className="mt-3 text-2xl font-semibold text-[#202F4C]">
                Cuéntanos sobre tu operación
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5E6878]">
                Comparte origen, destino, tipo de carga o problema actual. Revisamos riesgos,
                fugas de costo y mejoras operativas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="min-w-0 space-y-4 text-gray-900">
              <div>
                <label htmlFor="name" className="mb-2 block font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre y empresa"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fbfd] p-4 focus:outline-none focus:ring-2 focus:ring-[#015095]"
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
                  placeholder="correo@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fbfd] p-4 focus:outline-none focus:ring-2 focus:ring-[#015095]"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-medium">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Ejemplo: ruta, volumen, frecuencia, tipo de carga y principal reto."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-36 w-full rounded-2xl border border-slate-200 bg-[#f8fbfd] p-4 focus:outline-none focus:ring-2 focus:ring-[#015095]"
                />
              </div>
              {submitStatus.message && (
                <div
                  className={`rounded-2xl p-3 text-center text-sm ${
                    submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#202F4C] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#015095] disabled:cursor-not-allowed disabled:opacity-50"
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
