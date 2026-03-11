import React from "react";

const FooterLink = ({ href = "#", children }) => (
  <a href={href} className="text-sm text-slate-600 transition-colors hover:text-[#1f3644]">
    {children}
  </a>
);

const FlipFooterWrapper = () => <FlipFooter />;

const FlipFooter = () => {
  return (
    <footer className="px-6 pb-8 pt-16">
      <div className="section-shell overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f4f8fa] shadow-[0_20px_60px_rgba(31,54,68,0.08)]">
        <div className="grid gap-10 px-8 py-10 md:grid-cols-[1.3fr_1fr] md:px-10 md:py-12">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3">
              <img
                src="/bls_logo.webp"
                alt="BLS - Best Logistics Solutions"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-base">
              Soluciones de logistica, cobertura y transporte para operaciones nacionales e internacionales con atencion personalizada.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <FooterLink href="#hero">Inicio</FooterLink>
            <FooterLink href="#about">Nosotros</FooterLink>
            <FooterLink href="#services">Servicios</FooterLink>
            <FooterLink href="#coverage">Cobertura</FooterLink>
            <FooterLink href="#contact">Contacto</FooterLink>
            <FooterLink href="#aviso-privacidad">Aviso de Privacidad</FooterLink>
          </div>
        </div>

        <div className="border-t border-slate-200 px-8 py-5 text-xs text-slate-500 md:px-10">
          © {new Date().getFullYear()} Best Logistics Solutions. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default FlipFooterWrapper;
