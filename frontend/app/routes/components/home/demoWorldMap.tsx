import WorldMap, { type WorldMapDot } from "./worldMap";

function DemoWorldMap() {
  const exampleDots: WorldMapDot[] = [
    {
      start: { lat: 40.7128, lng: -74.006, label: "New York" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    {
      start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
    {
      start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
      end: { lat: 19.4326, lng: -99.1332, label: "Mexico City" },
    },
    {
      start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
      end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
    },
  ];

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 transition-colors duration-300 md:p-24">
        <h1 className="mb-6 text-2xl font-bold text-[#293840]">Mapa interactivo</h1>

        <div className="w-full max-w-5xl overflow-hidden">
          <WorldMap dots={exampleDots} lineColor="#0ea5e9" />
        </div>
      </main>
    </div>
  );
}

export default DemoWorldMap;
