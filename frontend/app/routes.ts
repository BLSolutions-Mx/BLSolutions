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
  route("en", "routes/en/home.tsx"),
  route("en/about", "routes/en/about.tsx"),
  route("en/services", "routes/en/services.tsx"),
  route("en/consulting", "routes/en/consulting.tsx"),
  route("en/services/on-the-road", "routes/en/services/ground.tsx"),
  route("en/services/air", "routes/en/services/air.tsx"),
  route("en/services/intermodal", "routes/en/services/intermodal.tsx"),
  route("en/services/warehousing", "routes/en/services/warehousing.tsx"),
  route("en/contact", "routes/en/contact.tsx"),
] satisfies RouteConfig;
