import React from 'react';
import {
  Bug,
  AlertTriangle,
  Map,
  ShieldCheck,
  Calendar,
  Sparkles,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const PestPrediction: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Bug className="w-6 h-6 text-amber-600" />
            <span>Pest & Pathogen Outbreak Prediction Radar</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Predictive spatio-temporal modeling based on humidity, leaf moisture hours, and regional pest vector trends.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full border border-amber-300">
          Moderate Risk Warning
        </span>
      </div>

      {/* PEST RISK METERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Meter Gauge */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
            <h3 className="text-sm font-extrabold text-emerald-950">Regional Risk Index</h3>
            <span className="text-xs font-mono font-bold text-amber-600">Level 2 / 5</span>
          </div>

          <div className="text-center py-4">
            <div className="w-36 h-36 rounded-full border-8 border-amber-400 border-t-red-500 mx-auto flex flex-col items-center justify-center p-2 shadow-inner">
              <span className="text-3xl font-black font-mono text-emerald-950">38%</span>
              <span className="text-[10px] text-gray-500 uppercase font-mono font-bold">
                Outbreak Risk
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center">
            Humidity threshold (&gt;75%) coupled with 29°C temperature elevates Rice Stem Borer risk over next 48 hours.
          </p>
        </div>

        {/* Primary Detected Pest Profile */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
          <div className="flex justify-between items-start border-b border-emerald-100 pb-3">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-md">
                VECTOR FLAGGED
              </span>
              <h3 className="text-xl font-extrabold text-emerald-950 mt-1">
                Yellow Stem Borer (Scirpophaga incertulas)
              </h3>
              <p className="text-xs text-gray-500">Target Crop: Pokkali Rice Paddy (Green Acres)</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400 block">AI Confidence</span>
              <span className="text-2xl font-black font-mono text-emerald-800">95.2%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Spread Projection</span>
              <span className="font-bold text-amber-700">Localized to Block 2 & 3B</span>
            </div>

            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Recommended Drone Spray</span>
              <span className="font-bold text-emerald-900">Neem-based Azadirachtin 10,000 ppm</span>
            </div>
          </div>

          {/* Spray Schedule */}
          <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2 text-xs font-mono border border-emerald-800">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>OPTIMAL AUTOPILOT SPRAY SCHEDULE</span>
            </div>
            <p className="text-emerald-100">
              Dispatch AGRO-DRONE Beta tomorrow at 07:30 AM (Wind &lt; 10 km/h, zero rain interference).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
