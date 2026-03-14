import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiArrowRight } from "react-icons/fi";
import { blsContent } from "./components/home/blsContent";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar";
import WhatsAppFloatingButton from "./components/ui/whatsAppFloatButton";

export function meta() {
  return [
    { title: "Contacto | BL Solutions" },
    {
      name: "description",
      content:
        "Solicita una evaluacion de tu ruta Mexico-USA. Sin costo, sin compromiso.",
    },
  ];
}

export default function Contacto() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean | null; message: string }>({
    success: null,
    message: "",
  });

  const contactItems: Array<{ icon: ReactNode; title: string; text: string; href?: string }> = [
    {
      icon: <FiMapPin />,
      title: "Direccion",
      text: blsContent.contact.address,
    },
    {
      icon: <FiPhone />,
      title: "Telefono",
      text: blsContent.contact.phone,
      href: `tel:${blsContent.contact.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: <FiMail />,
      title: "Correo electronico",
      text: blsContent.contact.email,
      href: `mailto:${blsContent.contact.email}`,
    },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

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
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      {/* --- Page Hero --- */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(1,80,149,0.38),_transparent_34%),linear-gradient(135deg,_#202F4C_0%,_#16243d_40%,_#015095_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_58%)] blur-3xl" />

        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="section-label mb-6 border-white/20 bg-white/8 text-white">
              Evaluacion estrategica
            </div>
            <h1 className="text-4xl font-extrabold leading-[0.96] tracking-[-0.05em] sm:text-5xl md:text-6xl">
              Revisemos tu ruta Mexico-USA
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              {blsContent.nextStep.action} {blsContent.nextStep.conditions}
            </p>
          </div>
        </div>
      </section>

      {/* --- Contact Form & Info --- */}
      <section className="px-6 py-20 md:py-24">
        <div className="section-shell">
          <div className="glass-panel mx-auto grid w-full max-w-6xl gap-6 p-4 sm:p-5 md:grid-cols-2 md:p-6 lg:gap-8">
            {/* Left - Contact Info */}
            <div className="min-w-0 rounded-[2rem] bg-[#132633] p-6 text-white sm:p-7 md:p-8">
              <div className="mb-8 space-y-4">
                <h2 className="text-3xl font-extrabold leading-[1] tracking-[-0.04em] sm:text-4xl">
                  Hablemos de tu operacion
                </h2>
                <p className="text-base leading-8 text-white/72">
                  Te ayudamos a identificar riesgos, detectar fugas de costo y proponer mejoras concretas.
                </p>
              </div>

              <div className="mb-6 space-y-3">
                {blsContent.nextStep.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white/86"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                  >
                    {benefit}
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                {contactItems.map((item, index) => {
                  const Wrapper = item.href ? motion.a : motion.div;

                  return (
                    <Wrapper
                      key={item.title}
                      {...(item.href ? { href: item.href } : {})}
                      className="flex min-w-0 items-start space-x-4 rounded-[1.4rem] border border-white/10 bg-white/6 p-4 transition-colors hover:bg-white/10"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 100 }}
                    >
                      <div className="mt-1 text-2xl text-[#9bc5dd]">{item.icon}</div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-1 break-words text-white/72">{item.text}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

            {/* Right - Form */}
            <div className="min-w-0 rounded-[2rem] bg-white p-5 sm:p-6 md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#015095]">
                  Formulario
                </p>
                <p className="mt-3 text-2xl font-semibold text-[#202F4C]">
                  Cuentanos sobre tu operacion
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
                  className="w-full rounded-full bg-[#202F4C] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#015095] disabled:cursor-not-allowed disabled:opacity-50"
                  whileHover={isSubmitting ? {} : { scale: 1.03 }}
                  whileTap={isSubmitting ? {} : { scale: 0.97 }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
      <Footer />
    </main>
  );
}
