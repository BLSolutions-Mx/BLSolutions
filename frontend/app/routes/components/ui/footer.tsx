import type { ReactNode } from "react";
import { Link } from "react-router";

type FooterLinkProps = {
  to: string;
  children: ReactNode;
};

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <Link to={to} className="text-sm text-[#5E6878] transition-colors hover:text-[#202F4C]">
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
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/bls_logo.webp"
                alt="BLS - Best Logistics Solutions"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="max-w-xl text-sm leading-7 text-[#5E6878] md:text-base">
              Logistica integral Mexico-USA con transporte, aduana, almacenamiento y coordinacion bajo un solo responsable.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <FooterLink to="/">Inicio</FooterLink>
            <FooterLink to="/servicios">Servicios</FooterLink>
            <FooterLink to="/nosotros">Nosotros</FooterLink>
            <FooterLink to="/contacto">Contacto</FooterLink>
            <FooterLink to="/servicios/terrestre">Terrestre</FooterLink>
            <FooterLink to="/servicios/aereo">Aereo</FooterLink>
            <FooterLink to="/servicios/maritimo">Maritimo</FooterLink>
            <FooterLink to="/servicios/complementarios">Complementarios</FooterLink>
          </div>
        </div>

        <div className="border-t border-[rgba(94,104,120,0.14)] px-8 py-5 text-xs text-[#5E6878] md:px-10">
          &copy; {new Date().getFullYear()} BL Solutions. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default FlipFooterWrapper;
