import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("nosotros", "routes/nosotros.tsx"),
  route("servicios", "routes/servicios.tsx"),
  route("consultoria", "routes/consultoria.tsx"),
  route("servicios/caja-seca", "routes/servicios/caja-seca.tsx"),
  route("servicios/plataforma", "routes/servicios/plataforma.tsx"),
  route("servicios/caja-refrigerada", "routes/servicios/caja-refrigerada.tsx"),
  route("servicios/intermodal", "routes/servicios/intermodal.tsx"),
  route("servicios/almacenamiento", "routes/servicios/almacenamiento.tsx"),
  route("contacto", "routes/contacto.tsx"),
] satisfies RouteConfig;
