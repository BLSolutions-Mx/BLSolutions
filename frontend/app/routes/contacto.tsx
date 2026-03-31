import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiMail, FiMapPin } from "react-icons/fi";
import { buildLocalizedPageMeta } from "../lib/build-page-meta";
import type { Locale } from "../lib/i18n";
import { getBlsContent } from "./components/home/blsContent";

type ContactFormData = {
  name: string;
  email: string;
  origin: string;
  destination: string;
  merchandiseType: string;
  weight: string;
  unitType: string;
  additionalDetails: string;
};

type ContactResponse = {
  success?: boolean;
  message?: string;
};

type DropdownOption = {
  value: string;
  label: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  origin: "",
  destination: "",
  merchandiseType: "",
  weight: "",
  unitType: "",
  additionalDetails: "",
};

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-[#f8fbfd] p-4 text-slate-900 transition-colors focus:border-[#015095] focus:outline-none focus:ring-2 focus:ring-[#015095]";

const selectWrapperClassName =
  "relative rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#f8fbfd_0%,#eef5fb_100%)] transition-colors";

const contentByLocale = {
  "es-MX": {
    eyebrow: "Contacto",
    title: "Revisemos tu operación",
    description:
      "Si necesitas transporte, intermodal o consultoría, cuéntanos qué estás moviendo y qué necesitas resolver.",
    asideTitle: "Hablemos de tu operación",
    asideDescription:
      "Atendemos nuevos proyectos únicamente a través del formulario. Mientras más claro quede el contexto de carga y ruta, mejor priorizamos la respuesta.",
    guidedTitle: "Solicitud guiada",
    guidedDescription:
      "Pedimos cada dato por separado para revisar la solicitud con menos fricción y sin depender de un mensaje libre incompleto.",
    formEyebrow: "Formulario",
    formTitle: "Cuéntanos qué necesitas",
    formDescription:
      "Capturamos los datos clave por separado para cotizar y canalizar mejor la solicitud.",
    labels: {
      name: "Nombre",
      email: "Correo",
      origin: "Origen",
      destination: "Destino",
      merchandiseType: "Tipo de mercancía",
      unitType: "Tipo de unidad requerida",
      weight: "Peso estimado (kg)",
      additionalDetails: "Detalles adicionales",
    },
    placeholders: {
      name: "Nombre y empresa",
      email: "correo@empresa.com",
      origin: "Ejemplo: Monterrey, NL",
      destination: "Ejemplo: Laredo, TX",
      merchandiseType: "Selecciona una categoría",
      unitType: "Ejemplo: 53 Dry Van",
      weight: "Ejemplo: 18000",
      additionalDetails: "Opcional: frecuencia, ventanas de entrega, requisitos especiales o comentarios.",
    },
    helper:
      "Comparte ciudad o cruce fronterizo cuando aplique. Si la carga necesita manejo especial, aclara el detalle abajo.",
    submit: "Enviar mensaje",
    submitting: "Enviando...",
    active: "Activo",
    validationError: "Selecciona el tipo de mercancía y la unidad requerida.",
    successMessage: "Mensaje enviado con éxito.",
    errorMessage: "Hubo un error al enviar el mensaje.",
    networkError: "No se pudo conectar con el servidor. Intenta más tarde.",
    merchandiseOptions: [
      { value: "Carga general", label: "Carga general" },
      { value: "Acero o metal", label: "Acero o metal" },
      { value: "Alimentos", label: "Alimentos" },
      { value: "Maquinaria", label: "Maquinaria" },
      { value: "Material peligroso", label: "Material peligroso" },
      { value: "Otra", label: "Otra" },
    ],
    unitOptions: [
      { value: "Caja seca 53", label: "Caja seca 53" },
      { value: "Caja refrigerada", label: "Caja refrigerada" },
      { value: "Plataforma", label: "Plataforma" },
      { value: "Intermodal", label: "Intermodal" },
      { value: "Aéreo", label: "Aéreo" },
      { value: "Marítimo", label: "Marítimo" },
      { value: "Otra", label: "Otra" },
    ],
    payloadLabels: {
      origin: "Origen",
      destination: "Destino",
      merchandiseType: "Tipo de mercancía",
      weight: "Peso",
      unitType: "Tipo de unidad requerida",
      additionalDetails: "Detalles adicionales",
    },
  },
  "en-US": {
    eyebrow: "Contact",
    title: "Let's review your operation",
    description:
      "If you need transportation, intermodal, or consulting support, tell us what you're moving and what needs to be solved.",
    asideTitle: "Let's talk about your operation",
    asideDescription:
      "We onboard new projects exclusively through this form. The clearer the cargo and route context is, the better we can prioritize the request.",
    guidedTitle: "Guided request",
    guidedDescription:
      "We ask for each data point separately so we can review the request with less friction and without relying on an incomplete free-form message.",
    formEyebrow: "Form",
    formTitle: "Tell us what you need",
    formDescription:
      "We capture the key data separately to quote and route the request more effectively.",
    labels: {
      name: "Name",
      email: "Email",
      origin: "Origin",
      destination: "Destination",
      merchandiseType: "Cargo type",
      unitType: "Required equipment",
      weight: "Estimated weight (kg)",
      additionalDetails: "Additional details",
    },
    placeholders: {
      name: "Name and company",
      email: "email@company.com",
      origin: "Example: Monterrey, NL",
      destination: "Example: Laredo, TX",
      merchandiseType: "Select a category",
      unitType: "Example: 53 Dry Van",
      weight: "Example: 18000",
      additionalDetails: "Optional: frequency, delivery windows, special requirements, or comments.",
    },
    helper:
      "Share the city or border crossing when relevant. If the cargo needs special handling, clarify it below.",
    submit: "Send message",
    submitting: "Sending...",
    active: "Active",
    validationError: "Select both the cargo type and required equipment.",
    successMessage: "Message sent successfully.",
    errorMessage: "There was an error sending the message.",
    networkError: "The server could not be reached. Try again later.",
    merchandiseOptions: [
      { value: "General cargo", label: "General cargo" },
      { value: "Steel or metal", label: "Steel or metal" },
      { value: "Food products", label: "Food products" },
      { value: "Machinery", label: "Machinery" },
      { value: "Hazardous materials", label: "Hazardous materials" },
      { value: "Other", label: "Other" },
    ],
    unitOptions: [
      { value: "53 dry van", label: "53 dry van" },
      { value: "Reefer", label: "Reefer" },
      { value: "Flatbed", label: "Flatbed" },
      { value: "Intermodal", label: "Intermodal" },
      { value: "Air", label: "Air" },
      { value: "Ocean", label: "Ocean" },
      { value: "Other", label: "Other" },
    ],
    payloadLabels: {
      origin: "Origin",
      destination: "Destination",
      merchandiseType: "Cargo type",
      weight: "Weight",
      unitType: "Required equipment",
      additionalDetails: "Additional details",
    },
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    asideTitle: string;
    asideDescription: string;
    guidedTitle: string;
    guidedDescription: string;
    formEyebrow: string;
    formTitle: string;
    formDescription: string;
    labels: Record<keyof ContactFormData, string>;
    placeholders: Record<keyof ContactFormData, string>;
    helper: string;
    submit: string;
    submitting: string;
    active: string;
    validationError: string;
    successMessage: string;
    errorMessage: string;
    networkError: string;
    merchandiseOptions: DropdownOption[];
    unitOptions: DropdownOption[];
    payloadLabels: {
      origin: string;
      destination: string;
      merchandiseType: string;
      weight: string;
      unitType: string;
      additionalDetails: string;
    };
  }
>;

type StyledDropdownProps = {
  id: keyof Pick<ContactFormData, "merchandiseType" | "unitType">;
  label: string;
  placeholder: string;
  value: string;
  options: DropdownOption[];
  activeLabel: string;
  onSelect: (name: StyledDropdownProps["id"], value: string) => void;
};

function StyledDropdown({
  id,
  label,
  placeholder,
  value,
  options,
  activeLabel,
  onSelect,
}: StyledDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <label htmlFor={id} className="mb-2 block font-medium">
        {label}
      </label>
      <div className={selectWrapperClassName}>
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#015095] ${
            value ? "text-slate-900" : "text-slate-400"
          }`}
        >
          <span>{selectedOption?.label ?? placeholder}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#015095] shadow-sm"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-30 overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]"
            >
              <div id={`${id}-listbox`} role="listbox" aria-labelledby={id} className="p-2">
                {options.map((option, index) => {
                  const isSelected = option.value === value;

                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSelect(id, option.value);
                        setIsOpen(false);
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.16 }}
                      className={`mb-1 flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-left text-sm transition-colors last:mb-0 ${
                        isSelected ? "bg-[#202F4C] text-white" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <span className="text-xs uppercase tracking-[0.18em]">{activeLabel}</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

type ContactPageProps = {
  locale: Locale;
};

export function meta() {
  return buildLocalizedPageMeta("contact", "es-MX");
}

export function ContactPage({ locale }: ContactPageProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean | null; message: string }>({
    success: null,
    message: "",
  });
  const content = contentByLocale[locale];
  const sharedContent = getBlsContent(locale);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownSelect = (
    name: "merchandiseType" | "unitType",
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.merchandiseType || !formData.unitType) {
      setSubmitStatus({ success: false, message: content.validationError });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const message = [
        `${content.payloadLabels.origin}: ${formData.origin}`,
        `${content.payloadLabels.destination}: ${formData.destination}`,
        `${content.payloadLabels.merchandiseType}: ${formData.merchandiseType}`,
        `${content.payloadLabels.weight}: ${formData.weight}`,
        `${content.payloadLabels.unitType}: ${formData.unitType}`,
        `${content.payloadLabels.additionalDetails}: ${formData.additionalDetails || "N/A"}`,
      ].join("\n");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, message }),
      });

      const result = (await response.json()) as ContactResponse;

      if (response.ok && result.success) {
        setSubmitStatus({
          success: true,
          message: result.message || content.successMessage,
        });
        setFormData(initialFormData);
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || content.errorMessage,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({ success: false, message: content.networkError });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen text-slate-950">
      <section className="relative overflow-hidden bg-[#0B1120] px-6 pb-20 pt-32 md:pb-32 md:pt-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#015095]/10 to-transparent" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[100px]" />
        </div>

        <div className="section-shell relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#0079e3] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#0079e3] shadow-[0_0_8px_#0079e3]" />
                {content.eyebrow}
              </div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                {content.title}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                {content.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm">
                  <div className="relative h-full w-full">
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

                    <div className="absolute bottom-10 left-10 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1e293b] p-4 shadow-xl">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0079e3]/20">
                        <FiMapPin className="text-[#0079e3]" />
                      </div>
                      <div className="h-2 w-16 rounded-full bg-white/20" />
                    </div>

                    <div className="absolute right-10 top-10 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1e293b] p-4 shadow-xl">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                        <FiMail className="text-blue-400" />
                      </div>
                      <div className="h-2 w-20 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="form" className="px-2 py-20 md:py-24">
        <div className="section-shell">
          <div className="glass-panel mx-auto grid w-full max-w-6xl gap-6 p-4 sm:p-5 md:grid-cols-2 md:p-6 lg:gap-8">
            <div className="relative min-w-0 overflow-hidden rounded-[2rem] bg-[#0B1120] p-6 text-white sm:p-7 md:p-8">
              <div className="absolute inset-0">
                <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#015095]/10 to-transparent" />
                <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-indigo-900/20 blur-[80px]" />
              </div>

              <div className="relative z-10 mb-8 space-y-4">
                <h2 className="text-3xl font-extrabold leading-[1] tracking-[-0.04em] sm:text-4xl">
                  {content.asideTitle}
                </h2>
                <p className="text-base leading-8 text-white/72">{content.asideDescription}</p>
              </div>

              <div className="relative z-10 mb-6 space-y-3">
                {sharedContent.nextStep.benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="reveal-left rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white/86"
                    style={{ ["--reveal-delay" as string]: `${index * 150}ms` }}
                  >
                    {benefit}
                  </div>
                ))}
              </div>

              <div className="reveal-left relative z-10 rounded-[1.6rem] border border-white/10 bg-white/6 p-5" style={{ ["--reveal-delay" as string]: "450ms" }}>
                <h3 className="text-lg font-semibold">{content.guidedTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{content.guidedDescription}</p>
              </div>
            </div>

            <div className="min-w-0 rounded-[2rem] bg-white p-5 sm:p-6 md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#015095]">
                  {content.formEyebrow}
                </p>
                <p className="mt-3 text-2xl font-semibold text-[#202F4C]">{content.formTitle}</p>
                <p className="mt-3 text-sm leading-7 text-[#5E6878]">{content.formDescription}</p>
              </div>

              <form onSubmit={handleSubmit} className="min-w-0 space-y-4 text-gray-900">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-medium">
                      {content.labels.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={content.placeholders.name}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={fieldClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-medium">
                      {content.labels.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={content.placeholders.email}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={fieldClassName}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="origin" className="mb-2 block font-medium">
                      {content.labels.origin}
                    </label>
                    <input
                      type="text"
                      id="origin"
                      name="origin"
                      placeholder={content.placeholders.origin}
                      value={formData.origin}
                      onChange={handleChange}
                      required
                      className={fieldClassName}
                    />
                  </div>
                  <div>
                    <label htmlFor="destination" className="mb-2 block font-medium">
                      {content.labels.destination}
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      placeholder={content.placeholders.destination}
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className={fieldClassName}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <StyledDropdown
                    id="merchandiseType"
                    label={content.labels.merchandiseType}
                    placeholder={content.placeholders.merchandiseType}
                    value={formData.merchandiseType}
                    options={content.merchandiseOptions}
                    activeLabel={content.active}
                    onSelect={handleDropdownSelect}
                  />
                  <div>
                    <label htmlFor="unitType" className="mb-2 block font-medium">
                      {content.labels.unitType}
                    </label>
                    <input
                      type="text"
                      id="unitType"
                      name="unitType"
                      placeholder={content.placeholders.unitType}
                      value={formData.unitType}
                      onChange={handleChange}
                      required
                      className={fieldClassName}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="weight" className="mb-2 block font-medium">
                    {content.labels.weight}
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder={content.placeholders.weight}
                    value={formData.weight}
                    onChange={handleChange}
                    inputMode="numeric"
                    min="0"
                    step="1"
                    required
                    className={fieldClassName}
                  />
                </div>
                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-[#5E6878]">
                  {content.helper}
                </div>
                <div>
                  <label htmlFor="additionalDetails" className="mb-2 block font-medium">
                    {content.labels.additionalDetails}
                  </label>
                  <textarea
                    id="additionalDetails"
                    name="additionalDetails"
                    rows={4}
                    placeholder={content.placeholders.additionalDetails}
                    value={formData.additionalDetails}
                    onChange={handleChange}
                    className={`${fieldClassName} min-h-32`}
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
                  {isSubmitting ? content.submitting : content.submit}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Contacto() {
  return <ContactPage locale="es-MX" />;
}
