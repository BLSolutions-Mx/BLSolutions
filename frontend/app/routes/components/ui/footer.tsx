import type { ReactNode } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link, useLocation } from "react-router";
import { getLocalizedPath, getLocaleFromPath } from "../../../lib/i18n";
import { getBlsContent } from "../home/blsContent";

type FooterLinkProps = {
  to: string;
  children: ReactNode;
};

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <Link
    to={to}
    prefetch="intent"
    className="text-sm text-[#5E6878] transition-colors hover:text-[#202F4C]"
  >
    {children}
  </Link>
);

const FlipFooterWrapper = () => <FlipFooter />;

const FlipFooter = () => {
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);
  const content = getBlsContent(locale);
  const companyLabel = locale === "en-US" ? "Company" : "Empresa";
  const servicesLabel = locale === "en-US" ? "Services" : "Servicios";
  const mobileLabel = locale === "en-US" ? "Mobile" : "Celular";
  const tagline = locale === "en-US" ? "Consulting and logistics" : "Consultoría y logística";
  const rightsLabel =
    locale === "en-US" ? "All rights reserved.-" : "Todos los derechos reservados.-";
  const developedBy = locale === "en-US" ? "Developed by" : "Desarrollado por";

  return (
    <footer className="bg-slate-50 px-6 pb-8 pt-16">
      <div className="section-shell overflow-hidden rounded-[2rem] border border-[rgba(94,104,120,0.14)] bg-[#f5f8fc] shadow-[0_20px_60px_rgba(32,47,76,0.08)]">
        <div className="grid gap-10 px-8 py-10 md:grid-cols-[1.3fr_1fr] md:px-10 md:py-12">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={getLocalizedPath("home", locale)}
                prefetch="intent"
                className="inline-flex items-center gap-3"
              >
                <img
                  src="/bls_logo.webp"
                  alt="BLS - Best Logistics Solutions"
                  className="h-14 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="max-w-2xl text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-[#202F4C] md:text-[1.75rem]">
              <span className="font-bold text-[#015095]">{tagline}</span>
            </p>
            <div className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-[#5E6878]">
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-start gap-3 transition-colors hover:text-[#202F4C]"
              >
                <FiMail className="mt-0.5 h-4 w-4 shrink-0 text-[#015095]" aria-hidden />
                <span>{content.contact.email}</span>
              </a>
              <p className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#015095]" aria-hidden />
                <span>
                  {content.contact.addressLines.map((line, i) => (
                    <span key={line}>
                      {i > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <div className="flex items-start gap-3">
                <FiPhone className="mt-0.5 h-4 w-4 shrink-0 text-[#015095]" aria-hidden />
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#202F4C]">
                    {mobileLabel}
                  </span>
                  {content.contact.phones
                    .find((phone) => phone.country === "Mexico")
                    ?.numbers.map((num) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-[#202F4C]"
                      >
                        {num}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#202F4C]">
                {companyLabel}
              </p>
              <div className="flex flex-col gap-3">
                <FooterLink to={getLocalizedPath("home", locale)}>
                  {locale === "en-US" ? "Home" : "Inicio"}
                </FooterLink>
                <FooterLink to={getLocalizedPath("consulting", locale)}>
                  {locale === "en-US" ? "Consulting" : "Consultoría"}
                </FooterLink>
                <FooterLink to={getLocalizedPath("about", locale)}>
                  {locale === "en-US" ? "About" : "Nosotros"}
                </FooterLink>
                <FooterLink to={getLocalizedPath("contact", locale)}>
                  {locale === "en-US" ? "Contact" : "Contacto"}
                </FooterLink>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#202F4C]">
                {servicesLabel}
              </p>
              <div className="flex flex-col gap-3">
                <FooterLink to={getLocalizedPath("ground", locale)}>
                  {locale === "en-US" ? "Over The Road" : "Terrestre"}
                </FooterLink>
                <FooterLink to={getLocalizedPath("air", locale)}>
                  {locale === "en-US" ? "Air" : "Aéreo"}
                </FooterLink>
                <FooterLink to={getLocalizedPath("intermodal", locale)}>Intermodal</FooterLink>
                <FooterLink to={getLocalizedPath("warehousing", locale)}>
                  {locale === "en-US" ? "Warehousing" : "Almacenamiento"}
                </FooterLink>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(94,104,120,0.14)] px-8 py-5 text-xs text-[#5E6878] md:px-10">
          &copy; {new Date().getFullYear()} BLS Operadora I, S.A. de C.V. {rightsLabel}{" "}
          {developedBy}{" "}
          <a
            href="https://www.blinkstudio.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#202F4C] italic"
          >
            Blink Studio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FlipFooterWrapper;
