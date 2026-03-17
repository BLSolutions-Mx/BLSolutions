import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
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
        "Contacta a BL Solutions para revisar tu operación y definir la mejor solución en transporte, intermodal o consultoría.",
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

  const contactItems: Array<{ icon: ReactNode; title: string; content: ReactNode }> = [
    {
      icon: <FiMapPin />,
      title: "Dirección",
      content: (
        <div className="space-y-1 text-white/72">
          {blsContent.contact.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ),
    },
    {
      icon: <FiPhone />,
      title: "Teléfono",
      content: (
        <div className="space-y-4 text-white/72">
          {blsContent.contact.phones.map((group) => (
            <div key={group.country}>
              <p className="font-semibold text-white">{group.country}</p>
              <div className="mt-1 space-y-1">
                {group.numbers.map((number) => (
                  <a
                    key={number}
                    href={`tel:${number.replace(/\s+/g, "")}`}
                    className="block break-words transition-colors hover:text-white"
                  >
                    {number}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <FiMail />,
      title: "Correo electrónico",
      content: (
        <a
          href={`mailto:${blsContent.contact.email}`}
          className="break-words text-white/72 transition-colors hover:text-white"
        >
          {blsContent.contact.email}
        </a>
      ),
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
        message: "No se pudo conectar con el servidor. Intenta más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="app-shell" className="min-h-screen text-slate-950">
      <Navbar />

      <section className="relative overflow-hidden bg-[#0B1120] px-6 pb-20 pt-32 md:pb-32 md:pt-40">
        {/* Abstract Background Elements - Distinct from others */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#015095]/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[100px]" />
        </div>

        <div className="section-shell relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#0079e3] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#0079e3] shadow-[0_0_8px_#0079e3]" />
                Contacto
              </div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                Revisemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">tu operación</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Si necesitas transporte, intermodal o consultoría, cuéntanos qué estás moviendo y qué
                necesitas resolver.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
               {/* Abstract Contact/Map Graphic */}
               <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm p-8 flex items-center justify-center">
                     {/* Stylized Map Points */}
                     <div className="relative h-full w-full">
                        {/* Connecting Line */}
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                           <motion.path 
                              d="M 20,80 Q 50,20 80,33" 
                              stroke="url(#gradient-line)" 
                              strokeWidth="0.5" 
                              fill="none"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 2, ease: "easeInOut" }}
                           />
                           <defs>
                              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                 <stop offset="0%" stopColor="#0079e3" stopOpacity="0" />
                                 <stop offset="50%" stopColor="#0079e3" />
                                 <stop offset="100%" stopColor="#0079e3" stopOpacity="0" />
                              </linearGradient>
                           </defs>
                        </svg>

                        {/* Floating Cards */}
                        <motion.div 
                           className="absolute bottom-10 left-10 rounded-xl bg-[#1e293b] border border-white/10 p-4 shadow-xl flex items-center gap-3"
                           animate={{ y: [0, -5, 0] }}
                           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                           <div className="h-8 w-8 rounded-full bg-[#0079e3]/20 flex items-center justify-center">
                              <FiMapPin className="text-[#0079e3]" />
                           </div>
                           <div className="h-2 w-16 rounded-full bg-white/20" />
                        </motion.div>

                        <motion.div 
                           className="absolute top-10 right-10 rounded-xl bg-[#1e293b] border border-white/10 p-4 shadow-xl flex items-center gap-3"
                           animate={{ y: [0, 5, 0] }}
                           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                           <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <FiMail className="text-blue-400" />
                           </div>
                           <div className="h-2 w-20 rounded-full bg-white/20" />
                        </motion.div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-2 py-20 md:py-24">
        <div className="section-shell">
          <div className="glass-panel mx-auto grid w-full max-w-6xl gap-6 p-4 sm:p-5 md:grid-cols-2 md:p-6 lg:gap-8">
            <div className="relative min-w-0 overflow-hidden rounded-[2rem] bg-[#0B1120] p-6 text-white sm:p-7 md:p-8">
              <div className="absolute inset-0">
                <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#015095]/10 to-transparent" />
                <div className="absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-indigo-900/20 blur-[80px]" />
              </div>

              <div className="relative z-10 mb-8 space-y-4">
                <h2 className="text-3xl font-extrabold leading-[1] tracking-[-0.04em] sm:text-4xl">
                  Hablemos de tu operación
                </h2>
                <p className="text-base leading-8 text-white/72">
                  Cuanto más claro entendamos rutas, volúmenes y necesidades, mejor podremos
                  ayudarte.
                </p>
              </div>

              <div className="relative z-10 mb-6 space-y-3">
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

              <div className="relative z-10 space-y-6">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex min-w-0 items-start space-x-4 rounded-[1.4rem] border border-white/10 bg-white/6 p-4 transition-colors hover:bg-white/10"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 100 }}
                  >
                    <div className="mt-1 text-2xl text-[#9bc5dd]">{item.icon}</div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <div className="mt-1 break-words">{item.content}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="min-w-0 rounded-[2rem] bg-white p-5 sm:p-6 md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#015095]">
                  Formulario
                </p>
                <p className="mt-3 text-2xl font-semibold text-[#202F4C]">
                  Cuéntanos qué necesitas
                </p>
                <p className="mt-3 text-sm leading-7 text-[#5E6878]">
                  Comparte origen, destino, tipo de carga, volumen o reto actual. Con eso podemos
                  orientar mejor la conversación.
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
                    placeholder="Ejemplo: ruta, volumen, frecuencia, tipo de carga y principal necesidad."
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
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
      <Footer />
    </main>
  );
}
