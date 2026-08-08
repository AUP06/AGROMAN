import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  Sunrise,
  Sunset,
  Clock,
  Plane,
  Sprout,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { WeatherData } from '../../types';
import { CURRENT_WEATHER } from '../../data/mockData';

export const WeatherIntelligence: React.FC = () => {
  const w: WeatherData = CURRENT_WEATHER;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-amber-500" />
            <span>Hyper-Local Microclimate Weather Intelligence</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time NASA satellite feeds & localized ground microclimate weather station.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200">
          Kuttanad Station Live
        </span>
      </div>

      {/* TODAY'S METRICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">Temperature</span>
          <p className="text-2xl font-black font-mono text-emerald-950 mt-1">{w.temp}°C</p>
          <span className="text-[10px] text-emerald-700">Feels like 31°C</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">Humidity</span>
          <p className="text-2xl font-black font-mono text-emerald-950 mt-1">{w.humidity}%</p>
          <span className="text-[10px] text-emerald-700">High Canopy Moisture</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">Rain Probability</span>
          <p className="text-2xl font-black font-mono text-emerald-950 mt-1">{w.rainProb}%</p>
          <span className="text-[10px] text-emerald-700">Clear Skies</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">Wind Vector</span>
          <p className="text-2xl font-black font-mono text-emerald-950 mt-1">
            {w.windSpeed} <span className="text-xs font-normal">km/h</span>
          </p>
          <span className="text-[10px] text-emerald-700">Direction: {w.windDir}</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">UV Index</span>
          <p className="text-2xl font-black font-mono text-emerald-950 mt-1">{w.uvIndex} / 12</p>
          <span className="text-[10px] text-amber-600 font-bold">Moderate Solar Angle</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">Sun Cycle</span>
          <p className="text-xs font-bold text-gray-800 mt-2 flex items-center gap-1">
            <Sunrise className="w-3.5 h-3.5 text-amber-500" /> {w.sunrise}
          </p>
          <p className="text-xs font-bold text-gray-800 mt-1 flex items-center gap-1">
            <Sunset className="w-3.5 h-3.5 text-amber-600" /> {w.sunset}
          </p>
        </div>
      </div>

      {/* OPTIMAL AGRI WINDOW RECOMMENDATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm border-b border-emerald-100 pb-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span>Optimal Drip Irrigation Window</span>
          </div>
          <p className="text-sm font-bold text-emerald-950">{w.bestIrrigationTime}</p>
          <p className="text-xs text-gray-500">
            Minimizes root evapotranspiration loss by 40% compared to afternoon watering.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm border-b border-emerald-100 pb-2">
            <Plane className="w-5 h-5 text-emerald-700" />
            <span>Optimal Drone Flight & Spray Window</span>
          </div>
          <p className="text-sm font-bold text-emerald-950">{w.bestDroneFlightWindow}</p>
          <p className="text-xs text-gray-500">
            Guarantees clean RTK GPS satellite lock with wind turbulence under 12 km/h.
          </p>
        </div>
      </div>

      {/* 5-DAY FORECAST ROW */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider font-mono">
          5-Day Microclimate Forecast
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {w.forecast.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center space-y-1"
            >
              <span className="text-xs font-bold font-mono text-emerald-900 block">{f.day}</span>
              <p className="text-lg font-black text-gray-900 font-mono">
                {f.tempHigh}° <span className="text-xs text-gray-400 font-normal">{f.tempLow}°</span>
              </p>
              <span className="text-[10px] text-gray-600 font-medium block">{f.condition}</span>
              <span className="text-[9px] text-blue-600 font-bold font-mono">Rain: {f.rainChance}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
