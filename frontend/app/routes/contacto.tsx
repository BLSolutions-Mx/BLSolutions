import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import { FiMail, FiMapPin } from "react-icons/fi";
import { Resend } from "resend";
import type { Route } from "./+types/contacto";
import { buildLocalizedPageMeta } from "../lib/build-page-meta";
import type { Locale } from "../lib/i18n";
import { toAbsoluteUrl } from "../lib/seo";
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
  success: boolean;
  message: string;
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

const CONTACT_REQUIRED_FIELDS: Array<keyof ContactFormData> = [
  "name",
  "email",
  "origin",
  "destination",
  "merchandiseType",
  "weight",
  "unitType",
];

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
    serviceUnavailableMessage:
      "El formulario ya está preparado para Resend, pero faltan las credenciales del servidor.",
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
    serviceUnavailableMessage:
      "The form is wired for Resend, but the server credentials are still missing.",
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
    serviceUnavailableMessage: string;
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

function getLocaleContent(locale: FormDataEntryValue | null) {
  return locale === "en-US" ? contentByLocale["en-US"] : contentByLocale["es-MX"];
}

function getFormValue(formData: FormData, field: keyof ContactFormData) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEnvValue(value: string | undefined) {
  if (!value) {
    return "";
  }

  return value.trim().replace(/^['"]|['"]$/g, "");
}

function maskEmail(value: string) {
  const [localPart = "", domainPart = ""] = value.split("@");

  if (!domainPart) {
    return value ? "[invalid-email]" : "[empty]";
  }

  const visibleLocalPart = localPart.slice(0, 2);
  return `${visibleLocalPart || "*"}***@${domainPart}`;
}

function summarizePayload(payload: ContactFormData) {
  return {
    nameLength: payload.name.length,
    email: maskEmail(payload.email),
    origin: payload.origin,
    destination: payload.destination,
    merchandiseType: payload.merchandiseType,
    weight: payload.weight,
    unitType: payload.unitType,
    hasAdditionalDetails: Boolean(payload.additionalDetails),
  };
}

function isResendErrorWithMessage(
  error: unknown,
): error is { name?: string; message?: string } {
  return typeof error === "object" && error !== null;
}

function getResendFailureMessage(
  content: (typeof contentByLocale)[Locale],
  error: unknown,
) {
  if (!isResendErrorWithMessage(error)) {
    return content.errorMessage;
  }

  const name = error.name?.toLowerCase() ?? "";
  const message = error.message?.toLowerCase() ?? "";

  if (
    name.includes("validation") ||
    message.includes("domain is not verified") ||
    message.includes("change the `from` address") ||
    message.includes("testing emails to your own email address")
  ) {
    return content.serviceUnavailableMessage;
  }

  if (name.includes("rate_limit") || name.includes("quota")) {
    return content.networkError;
  }

  return content.errorMessage;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildContactMessage(
  content: (typeof contentByLocale)[Locale],
  payload: ContactFormData,
) {
  return [
    `${content.labels.name}: ${payload.name}`,
    `${content.labels.email}: ${payload.email}`,
    `${content.payloadLabels.origin}: ${payload.origin}`,
    `${content.payloadLabels.destination}: ${payload.destination}`,
    `${content.payloadLabels.merchandiseType}: ${payload.merchandiseType}`,
    `${content.payloadLabels.weight}: ${payload.weight}`,
    `${content.payloadLabels.unitType}: ${payload.unitType}`,
    `${content.payloadLabels.additionalDetails}: ${payload.additionalDetails || "N/A"}`,
  ].join("\n");
}

function buildContactEmailHtml(
  content: (typeof contentByLocale)[Locale],
  payload: ContactFormData,
) {
  const summaryCards = [
    [content.payloadLabels.origin, payload.origin],
    [content.payloadLabels.destination, payload.destination],
    [content.payloadLabels.unitType, payload.unitType],
    [content.payloadLabels.weight, `${payload.weight} kg`],
  ];

  const rows = [
    [content.labels.name, payload.name],
    [content.labels.email, payload.email],
    [content.payloadLabels.origin, payload.origin],
    [content.payloadLabels.destination, payload.destination],
    [content.payloadLabels.merchandiseType, payload.merchandiseType],
    [content.payloadLabels.weight, payload.weight],
    [content.payloadLabels.unitType, payload.unitType],
    [content.payloadLabels.additionalDetails, payload.additionalDetails || "N/A"],
  ];

  const rowMarkup = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:14px 16px;border-top:1px solid #dbe4ee;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5b6472;background:#f8fbfd;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:14px 16px;border-top:1px solid #dbe4ee;font-size:15px;line-height:1.6;color:#0f172a;background:#ffffff;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const summaryMarkup = summaryCards
    .map(
      ([label, value]) => `
        <td style="width:50%;padding:6px;vertical-align:top;">
          <table style="width:100%;border-collapse:separate;border-spacing:0;background:#f8fbfd;border:1px solid #dbe4ee;border-radius:14px;">
            <tr>
              <td style="padding:14px 16px;">
                <div style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;">${escapeHtml(
                  label,
                )}</div>
                <div style="margin:0;font-size:16px;font-weight:700;line-height:1.4;color:#202f4c;">${escapeHtml(
                  value,
                )}</div>
              </td>
            </tr>
          </table>
        </td>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#e8f0f7;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" style="width:100%;max-width:720px;margin:0 auto;border-collapse:separate;border-spacing:0;">
      <tr>
        <td style="padding:0 0 18px;">
          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;background:linear-gradient(135deg,#0b1120 0%,#15345b 100%);border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 24px;color:#ffffff;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#7dd3fc;">BLS Contact</p>
                <h1 style="margin:0 0 12px;font-size:30px;line-height:1.1;color:#ffffff;">${escapeHtml(content.formTitle)}</h1>
                <p style="margin:0;max-width:520px;font-size:15px;line-height:1.7;color:#d7e7f5;">
                  ${escapeHtml(content.formDescription)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 18px;">
          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #d7e3ee;border-radius:24px;overflow:hidden;box-shadow:0 18px 50px rgba(15,23,42,0.08);">
            <tr>
              <td style="padding:24px 22px 18px;">
                <div style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#015095;">Resumen rápido</div>
                <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;"> 
                  <tr>${summaryMarkup}</tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 22px 24px;">
                <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;border:1px solid #dbe4ee;border-radius:18px;overflow:hidden;">
                  <tr>
                    <td colspan="2" style="padding:16px 18px;background:#202f4c;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#ffffff;">
                      Detalle de la solicitud
                    </td>
                  </tr>
                  ${rowMarkup}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;background:#f8fbfd;border:1px solid #d7e3ee;border-radius:18px;">
            <tr>
              <td style="padding:16px 18px;font-size:13px;line-height:1.7;color:#526071;">
                Responde directamente a este correo para contactar a <strong style="color:#202f4c;">${escapeHtml(
                  payload.name,
                )}</strong> en <a href="mailto:${escapeHtml(payload.email)}" style="color:#015095;text-decoration:none;">${escapeHtml(
                  payload.email,
                )}</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildReadableContactEmailHtml(
  content: (typeof contentByLocale)[Locale],
  payload: ContactFormData,
) {
  const isEnglish = content === contentByLocale["en-US"];
  const fallbackText = isEnglish ? "Not provided" : "No especificado";
  const quickSummaryLabel = isEnglish ? "Quick summary" : "Resumen rapido";
  const requestDetailsLabel = isEnglish ? "Request details" : "Detalle de la solicitud";
  const replyLabel = isEnglish
    ? "Reply directly to this email to contact"
    : "Responde directamente a este correo para contactar a";
  const footerLabel = isEnglish
    ? "Sent from the BLS website contact form."
    : "Enviado desde el formulario de contacto del sitio de BLS.";
  const logoUrl = toAbsoluteUrl("/bls_logo.png");

  const summaryCards = [
    [content.payloadLabels.origin, payload.origin],
    [content.payloadLabels.destination, payload.destination],
    [content.payloadLabels.unitType, payload.unitType],
    [content.payloadLabels.weight, `${payload.weight} kg`],
  ];

  const rows = [
    [content.labels.name, payload.name],
    [content.labels.email, payload.email],
    [content.payloadLabels.origin, payload.origin],
    [content.payloadLabels.destination, payload.destination],
    [content.payloadLabels.merchandiseType, payload.merchandiseType],
    [content.payloadLabels.weight, `${payload.weight} kg`],
    [content.payloadLabels.unitType, payload.unitType],
    [content.payloadLabels.additionalDetails, payload.additionalDetails || fallbackText],
  ];

  const summaryMarkup = summaryCards
    .map(
      ([label, value]) => `
        <td style="width:50%;padding:6px;vertical-align:top;">
          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;background:#f8fbfd;border:1px solid #dbe4ee;border-radius:14px;">
            <tr>
              <td style="padding:14px 16px;">
                <div style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">${escapeHtml(
                  label,
                )}</div>
                <div style="margin:0;font-size:16px;font-weight:700;line-height:1.45;color:#1e293b;">${escapeHtml(
                  value,
                )}</div>
              </td>
            </tr>
          </table>
        </td>`,
    )
    .join("");

  const rowMarkup = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:14px 16px;border-top:1px solid #dbe4ee;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#475569;background:#f8fbfd;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:14px 16px;border-top:1px solid #dbe4ee;font-size:15px;line-height:1.65;color:#0f172a;background:#ffffff;">${escapeHtml(
            value,
          )}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${isEnglish ? "en" : "es"}">
  <body style="margin:0;padding:24px;background:#f7fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" style="width:100%;max-width:720px;margin:0 auto;border-collapse:separate;border-spacing:0;">
      <tr>
        <td style="padding:0 0 18px;">
          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #dbe7f1;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:26px 30px 14px;background:#ffffff;">
                <img src="${escapeHtml(logoUrl)}" alt="BLS" width="160" style="display:block;width:160px;max-width:100%;height:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:0 30px 30px;background:#f3f8fc;border-top:1px solid #e4edf5;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#2f6f9f;">BLS Contact</p>
                <h1 style="margin:0 0 12px;font-size:30px;line-height:1.2;font-weight:700;color:#243b53;">${escapeHtml(
                  content.formTitle,
                )}</h1>
                <p style="margin:0;max-width:560px;font-size:15px;line-height:1.7;color:#52667a;">
                  ${escapeHtml(content.formDescription)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 18px;">
          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #d7e3ee;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:24px 22px 18px;">
                <div style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#2f6f9f;">${escapeHtml(
                  quickSummaryLabel,
                )}</div>
                <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;">
                  <tr>${summaryMarkup}</tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 22px 24px;">
                <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;border:1px solid #dbe4ee;border-radius:18px;overflow:hidden;">
                  <tr>
                    <td colspan="2" style="padding:16px 18px;background:#f1f6fa;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#35506b;">
                      ${escapeHtml(requestDetailsLabel)}
                    </td>
                  </tr>
                  ${rowMarkup}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #d7e3ee;border-radius:18px;">
            <tr>
              <td style="padding:18px 20px 10px;font-size:14px;line-height:1.7;color:#52667a;">
                ${escapeHtml(replyLabel)} <strong style="color:#243b53;">${escapeHtml(
                  payload.name,
                )}</strong> en <a href="mailto:${escapeHtml(payload.email)}" style="color:#2f6f9f;text-decoration:none;font-weight:700;">${escapeHtml(
                  payload.email,
                )}</a>.
              </td>
            </tr>
            <tr>
              <td style="padding:0 20px 18px;font-size:12px;line-height:1.6;color:#64748b;">
                ${escapeHtml(footerLabel)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const content = getLocaleContent(formData.get("locale"));
  const requestUrl = new URL(request.url);

  const payload: ContactFormData = {
    name: getFormValue(formData, "name"),
    email: getFormValue(formData, "email"),
    origin: getFormValue(formData, "origin"),
    destination: getFormValue(formData, "destination"),
    merchandiseType: getFormValue(formData, "merchandiseType"),
    weight: getFormValue(formData, "weight"),
    unitType: getFormValue(formData, "unitType"),
    additionalDetails: getFormValue(formData, "additionalDetails"),
  };

  const hasMissingFields = CONTACT_REQUIRED_FIELDS.some((field) => !payload[field]);
  if (hasMissingFields) {
    console.warn("Contact form validation failed", {
      pathname: requestUrl.pathname,
      locale: formData.get("locale"),
      payload: summarizePayload(payload),
    });

    return Response.json(
      { success: false, message: content.validationError },
      { status: 400 },
    );
  }

  const apiKey = normalizeEnvValue(process.env.RESEND_API_KEY ?? process.env.RESEND_API);
  const from = normalizeEnvValue(process.env.RESEND_FROM_EMAIL);
  const destinationEmail = normalizeEnvValue(process.env.CONTACT_TO_EMAIL);

  console.info("Contact form submission received", {
    pathname: requestUrl.pathname,
    locale: formData.get("locale"),
    payload: summarizePayload(payload),
    env: {
      hasResendApiKey: Boolean(apiKey),
      hasFromEmail: Boolean(from),
      hasDestinationEmail: Boolean(destinationEmail),
      fromDomain: from.includes("@") ? from.split("@").at(-1) : "[missing]",
      destinationEmail: maskEmail(destinationEmail),
    },
  });

  if (!apiKey || !from || !destinationEmail) {
    console.error("Contact form configuration missing", {
      pathname: requestUrl.pathname,
      locale: formData.get("locale"),
      env: {
        hasResendApiKey: Boolean(apiKey),
        hasFromEmail: Boolean(from),
        hasDestinationEmail: Boolean(destinationEmail),
      },
    });

    return Response.json(
      { success: false, message: content.serviceUnavailableMessage },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const subject =
    formData.get("locale") === "en-US"
      ? `New contact request from ${payload.name}`
      : `Nueva solicitud de contacto de ${payload.name}`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [destinationEmail],
      subject,
      html: buildReadableContactEmailHtml(content, payload),
      text: buildContactMessage(content, payload),
      replyTo: payload.email,
    });

    if (error) {
      console.error("Resend contact form error:", {
        pathname: requestUrl.pathname,
        locale: formData.get("locale"),
        name: error.name,
        message: error.message,
        payload: summarizePayload(payload),
        from,
        destinationEmail: maskEmail(destinationEmail),
      });

      return Response.json(
        {
          success: false,
          message: getResendFailureMessage(content, error),
        },
        { status: 502 },
      );
    }

    console.info("Contact form email sent", {
      pathname: requestUrl.pathname,
      locale: formData.get("locale"),
      to: maskEmail(destinationEmail),
      replyTo: maskEmail(payload.email),
    });
  } catch (error) {
    console.error("Unexpected Resend contact form error:", error);
    console.error("Contact form send failure context", {
      pathname: requestUrl.pathname,
      locale: formData.get("locale"),
      payload: summarizePayload(payload),
      from,
      destinationEmail: maskEmail(destinationEmail),
    });

    return Response.json(
      {
        success: false,
        message: getResendFailureMessage(content, error),
      },
      { status: 502 },
    );
  }

  return Response.json({
    success: true,
    message: content.successMessage,
  });
}

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
  const fetcher = useFetcher<ContactResponse>();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean | null; message: string }>({
    success: null,
    message: "",
  });
  const content = contentByLocale[locale];
  const sharedContent = getBlsContent(locale);
  const isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (!fetcher.data) {
      return;
    }

    setSubmitStatus(fetcher.data);

    if (fetcher.data.success) {
      setFormData(initialFormData);
    }
  }, [fetcher.data]);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!formData.merchandiseType || !formData.unitType) {
      event.preventDefault();
      setSubmitStatus({ success: false, message: content.validationError });
      return;
    }

    setSubmitStatus({ success: null, message: "" });
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

              <fetcher.Form method="post" onSubmit={handleSubmit} className="min-w-0 space-y-4 text-gray-900">
                <input type="hidden" name="locale" value={locale} />
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
                  <input type="hidden" name="merchandiseType" value={formData.merchandiseType} />
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
              </fetcher.Form>
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

/*
Pendiente para activar Resend en produccion:
1. Crear la API key en Resend y guardarla como RESEND_API_KEY.
2. Verificar el dominio de envio en Resend, tal como indican los prerrequisitos oficiales de Node.js.
3. Definir RESEND_FROM_EMAIL con una direccion del dominio verificado, por ejemplo:
   BLS Contacto <contacto@tu-dominio.com>
4. Definir CONTACT_TO_EMAIL con el correo interno que debe recibir las solicitudes.
5. Reiniciar el servidor despues de cargar esas variables de entorno.
6. Probar el formulario en /contacto y /en/contact para confirmar entrega y reply-to.
*/
