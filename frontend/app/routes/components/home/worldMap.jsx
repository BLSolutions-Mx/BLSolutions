// src/components/WorldMap.jsx
import React, { useRef, useMemo } from "react"; // Importa React y useRef, useMemo
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

// Valores por defecto directamente en la desestructuración
function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}) {
  const svgRef = useRef(null); 

  
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#00000040",
      shape: "circle",
      backgroundColor: "white",
    });
  }, [/* theme */]); 

  const projectPoint = (lat, lng) => {
    const mapWidth = 800;
    const mapHeight = 400; 
    const x = (lng + 180) * (mapWidth / 360);
    const y = ((-1 * lat) + 90) * (mapHeight / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const controlY = Math.min(start.y, end.y) - Math.abs(start.y - end.y) * 0.5 - 30;
    return `M ${start.x} ${start.y} Q ${midX} ${controlY} ${end.x} ${end.y}`;
  };

  return (
    <div className={`w-full aspect-[2/1] bg-white rounded-lg relative font-sans`}>
      {/* Reemplazo de next/image con <img> */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map background"
        draggable={false}
        loading="lazy" 
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400" 
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {/* Gradiente para las líneas */}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grupo para las líneas curvas */}
        <g>
          {dots.map((dot, i) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);
            return (
              <motion.path
                key={`path-${i}`} // Key única para el path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)" // Usa el gradiente definido
                strokeWidth="1.5" // Ajusta el grosor si es necesario
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.3 * i, // Ajusta el delay si es necesario
                  ease: "easeOut",
                }}
              />
            );
          })}
        </g>

        {/* Grupo para los puntos y animaciones */}
        <g>
          {dots.map((dot, i) => {
            const startCoords = projectPoint(dot.start.lat, dot.start.lng);
            const endCoords = projectPoint(dot.end.lat, dot.end.lng);
            return (
              // Usa React.Fragment o <> para agrupar elementos sin añadir nodos extra al DOM
              <React.Fragment key={`points-group-${i}`}>
                {/* Punto de inicio */}
                <g key={`start-${i}`}>
                  <circle
                    cx={startCoords.x}
                    cy={startCoords.y}
                    r="3" // Radio del punto base
                    fill={lineColor}
                  />
                  <circle
                    cx={startCoords.x}
                    cy={startCoords.y}
                    r="3" // Radio inicial de la animación
                    fill={lineColor}
                    opacity="0.6" // Opacidad inicial
                  >
                    {/* Animación SMIL estándar */}
                    <animate attributeName="r" from="3" to="10" dur="1.5s" begin={`${0.3 * i}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" begin={`${0.3 * i}s`} repeatCount="indefinite" />
                  </circle>
                  {/* Opcional: Etiqueta para el punto de inicio */}
                  {dot.start.label && (
                    <text
                      x={startCoords.x + 5}
                      y={startCoords.y - 5}
                      fontSize="8"
                      fill="black"
                      opacity="0.7"
                    >
                      {dot.start.label}
                    </text>
                  )}
                </g>
                {/* Punto final */}
                <g key={`end-${i}`}>
                  <circle
                    cx={endCoords.x}
                    cy={endCoords.y}
                    r="3"
                    fill={lineColor}
                  />
                  <circle
                    cx={endCoords.x}
                    cy={endCoords.y}
                    r="3"
                    fill={lineColor}
                    opacity="0.6"
                  >
                    <animate attributeName="r" from="3" to="10" dur="1.5s" begin={`${0.3 * i + 0.5}s`} repeatCount="indefinite" /> {/* Pequeño delay para el final */}
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" begin={`${0.3 * i + 0.5}s`} repeatCount="indefinite" />
                  </circle>
                   {/* Opcional: Etiqueta para el punto final */}
                   {dot.end.label && (
                    <text
                      x={endCoords.x + 5}
                      y={endCoords.y - 5}
                      fontSize="8"
                      fill="black"
                      opacity="0.7"
                    >
                      {dot.end.label}
                    </text>
                  )}
                </g>
              </React.Fragment>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default WorldMap;