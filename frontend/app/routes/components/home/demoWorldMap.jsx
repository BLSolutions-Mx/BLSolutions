import React from 'react';
import WorldMap from "./worldMap";

function DemoWorldMap() {

   const exampleDots = [
     {
       start: { lat: 40.7128, lng: -74.006, label: "New York" }, // New York
       end: { lat: 51.5074, lng: -0.1278, label: "London" }, // London
     },
     {
       start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" }, // Tokyo
       end: { lat: -33.8688, lng: 151.2093, label: "Sydney" }, // Sydney
     },
     {
       start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" }, // San Francisco
       end: { lat: 19.4326, lng: -99.1332, label: "Mexico City" }, // Mexico City (Ejemplo añadido)
     },
     {
       start: { lat: 1.3521, lng: 103.8198, label: "Singapore" }, // Singapore
        end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" }, // Los Angeles
     }
   ];

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-white transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-6 text-[#293840]">
          Mapa interactivo
        </h1>

        <div className="w-full max-w-5xl overflow-hidden">
          <WorldMap
             dots={exampleDots}
             lineColor="#0ea5e9"
           />
        </div>
      </main>
    </div>
  );
}

export default DemoWorldMap;
