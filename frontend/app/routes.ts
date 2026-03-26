import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("nosotros", "routes/nosotros.tsx"),
  route("servicios", "routes/servicios.tsx"),
  route("consultoria", "routes/consultoria.tsx"),
  route("servicios/terrestre", "routes/servicios/terrestre.tsx"),
  route("servicios/aereo", "routes/servicios/aereo.tsx"),
  route("servicios/intermodal", "routes/servicios/intermodal.tsx"),
  route("servicios/almacenamiento", "routes/servicios/almacenamiento.tsx"),
  route("contacto", "routes/contacto.tsx"),
] satisfies RouteConfig;
