"use client";
import dynamic from "next/dynamic";
import AQAlert from "../components/AQAlert";

import { useState } from "react";
// import { getAirQuality } from "../lib/api";
import AQCard from "../components/AQCard";
import WeatherCard from "../components/WeatherCard";
import AQMap from "../components/AQMap";
const AQMapSection = dynamic(() => import("../components/AQMapSection"), { ssr: false });
import AQInfoPanel from "../components/AQInfoPanel";
import Hero from "../components/Hero";
import { MapPin, Activity, ShoppingCart, Grid } from 'lucide-react';

export default function HomePage() {
  const [cityData, setCityData] = useState(null);
  const [selected, setSelected] = useState(null);
  const handleSearch = async (city) => {
    const data = await getAirQuality(city);
    setCityData(data);
  };

  return (
    <div className="space-y-8">
      <Hero />

      <AQAlert />

      <div id="dashboard" className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
        {/* Left-most: vertical dashboard menu */}
        {/* <div className="hidden md:block md:col-span-1">
          <nav className="dashboard-menu sticky top-6 space-y-3">
            <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-transparent hover:bg-white/6 text-white"><Grid size={18} /></button>
            <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-transparent hover:bg-white/6 text-white"><MapPin size={18} /></button>
            <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-transparent hover:bg-white/6 text-white"><Activity size={18} /></button>
            <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-transparent hover:bg-white/6 text-white"><ShoppingCart size={18} /></button>
          </nav>
        </div> */}
              

        {/* Center: info panel */}

        <div className="md:col-span-2">
          {selected ? (
            <AQInfoPanel location={selected} />
          ) : (
            <div className="aq-info-strong rounded-xl shadow-xl p-6 text-white">
              <div className="text-sm text-gray-300">Select a location on the map to view details</div>
            </div>
          )}
        </div>

        {/* Right: map and other content */}
        <div className="md:col-span-3">
          <AQMapSection onSelect={(loc) => setSelected(loc)} />
        </div>
      </div>


      {/* Weather section anchor */}
      <section id="weather">
        {cityData ? (
        <div className="grid gap-6">
          {/* Air Quality Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cityData.ground?.map((d, i) => (
              <AQCard key={i} pollutant={d.pollutant} value={d.value} units={d.units} rating={d.rating} />
            ))}
          </div>

          {/* Weather Info */}
          {cityData.weather && <WeatherCard weather={cityData.weather} />}

          {/* Interactive Map */}
          <AQMap city={cityData.city} />
        </div>
        ) : (
          <p className="text-center text-gray-600"></p>
        )}
      </section>

      <section id="about" className="py-6 text-center text-sm text-gray-600">
        <p>About: This app provides interactive air quality visualizations and weather info.</p>
      </section>
    </div>
  );
}
