import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("nosotros", "routes/nosotros.tsx"),
  route("servicios", "routes/servicios.tsx"),
  route("servicios/terrestre", "routes/servicios/terrestre.tsx"),
  route("servicios/aereo", "routes/servicios/aereo.tsx"),
  route("servicios/maritimo", "routes/servicios/maritimo.tsx"),
  route("servicios/complementarios", "routes/servicios/complementarios.tsx"),
  route("contacto", "routes/contacto.tsx"),
] satisfies RouteConfig;
