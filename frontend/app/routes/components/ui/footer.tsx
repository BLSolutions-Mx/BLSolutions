import type { ReactNode } from "react";
import { Link } from "react-router";

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
  return (
    <footer className="px-6 pb-8 pt-16">
      <div className="section-shell overflow-hidden rounded-[2rem] border border-[rgba(94,104,120,0.14)] bg-[#f5f8fc] shadow-[0_20px_60px_rgba(32,47,76,0.08)]">
        <div className="grid gap-10 px-8 py-10 md:grid-cols-[1.3fr_1fr] md:px-10 md:py-12">
          <div className="space-y-5">
            <Link to="/" prefetch="intent" className="inline-flex items-center gap-3">
              <img
                src="/bls_logo.webp"
                alt="BLS - Best Logistics Solutions"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="max-w-2xl text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-[#202F4C] md:text-[1.75rem]">
              <span className="text-[#015095] font-bold">Consultoría y logística</span> 
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#202F4C]">Empresa</p>
              <div className="flex flex-col gap-3">
                <FooterLink to="/">Inicio</FooterLink>
                <FooterLink to="/consultoria">Consultoría</FooterLink>
                <FooterLink to="/nosotros">Nosotros</FooterLink>
                <FooterLink to="/contacto">Contacto</FooterLink>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#202F4C]">Servicios</p>
              <div className="flex flex-col gap-3">
                <FooterLink to="/servicios/caja-seca">Caja Seca</FooterLink>
                <FooterLink to="/servicios/plataforma">Plataforma</FooterLink>
                <FooterLink to="/servicios/caja-refrigerada">Caja Refrigerada</FooterLink>
                <FooterLink to="/servicios/intermodal">Intermodal</FooterLink>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(94,104,120,0.14)] px-8 py-5 text-xs text-[#5E6878] md:px-10">
          &copy; {new Date().getFullYear()} BL Solutions. Todos los derechos reservados. -
          Desarrollado por{" "}
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
