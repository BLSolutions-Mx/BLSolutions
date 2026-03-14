import { Fragment, useMemo } from "react";
import { motion } from "framer-motion";

type MapPoint = {
  lat: number;
  lng: number;
  label?: string;
};

export type WorldMapDot = {
  start: MapPoint;
  end: MapPoint;
};

type WorldMapProps = {
  dots?: WorldMapDot[];
  lineColor?: string;
};

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;

const createMapBackground = () => {
  const circles: string[] = [];
  const spacing = 18;

  for (let y = 12; y < MAP_HEIGHT; y += spacing) {
    const offset = Math.floor(y / spacing) % 2 === 0 ? 0 : spacing / 2;
    for (let x = 12; x < MAP_WIDTH; x += spacing) {
      circles.push(`<circle cx="${x + offset}" cy="${y}" r="1.8" fill="#00000040" />`);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_WIDTH} ${MAP_HEIGHT}" preserveAspectRatio="none"><rect width="${MAP_WIDTH}" height="${MAP_HEIGHT}" fill="white" />${circles.join("")}</svg>`;
};

function WorldMap({ dots = [], lineColor = "#0ea5e9" }: WorldMapProps) {
  const svgMap = useMemo(() => createMapBackground(), []);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (MAP_WIDTH / 360);
    const y = (-lat + 90) * (MAP_HEIGHT / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const controlY = Math.min(start.y, end.y) - Math.abs(start.y - end.y) * 0.5 - 30;
    return `M ${start.x} ${start.y} Q ${midX} ${controlY} ${end.x} ${end.y}`;
  };

  return (
    <div className="relative aspect-[2/1] w-full rounded-lg bg-white font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map background"
        draggable={false}
        loading="lazy"
      />
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g>
          {dots.map((dot, index) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);

            return (
              <motion.path
                key={`path-${index}`}
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 * index, ease: "easeOut" }}
              />
            );
          })}
        </g>

        <g>
          {dots.map((dot, index) => {
            const startCoords = projectPoint(dot.start.lat, dot.start.lng);
            const endCoords = projectPoint(dot.end.lat, dot.end.lng);

            return (
              <Fragment key={`points-group-${index}`}>
                <g>
                  <circle cx={startCoords.x} cy={startCoords.y} r="3" fill={lineColor} />
                  <circle cx={startCoords.x} cy={startCoords.y} r="3" fill={lineColor} opacity="0.6">
                    <animate
                      attributeName="r"
                      from="3"
                      to="10"
                      dur="1.5s"
                      begin={`${0.3 * index}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="1.5s"
                      begin={`${0.3 * index}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
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
                <g>
                  <circle cx={endCoords.x} cy={endCoords.y} r="3" fill={lineColor} />
                  <circle cx={endCoords.x} cy={endCoords.y} r="3" fill={lineColor} opacity="0.6">
                    <animate
                      attributeName="r"
                      from="3"
                      to="10"
                      dur="1.5s"
                      begin={`${0.3 * index + 0.5}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="1.5s"
                      begin={`${0.3 * index + 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
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
              </Fragment>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default WorldMap;
