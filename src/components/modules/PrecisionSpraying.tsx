import React, { useState } from 'react';
import {
  Zap,
  Plane,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Droplets,
  Leaf,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const PrecisionSpraying: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simCompleted, setSimCompleted] = useState(false);

  const startSpraySimulation = () => {
    setIsSimulating(true);
    setSimProgress(0);
    setSimCompleted(false);

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          setSimCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-emerald-700" />
            <span>Targeted Ag-Drone Micro-Spraying</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Precision Spraying Module
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Zero-waste autonomous spot spraying guided by computer vision hot-spot detection.
          </p>
        </div>

        <button
          onClick={startSpraySimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 bg-[#8CE854] hover:bg-[#78d641] disabled:opacity-50 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-md transition-all text-sm shrink-0"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isSimulating ? 'Spraying in Progress...' : 'Run Precision Spraying Demo'}</span>
        </button>
      </div>

      {/* DASHBOARD CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Target Hotspot</span>
          <p className="text-2xl font-black text-slate-900 mt-1">Zone B Sector 2</p>
          <p className="text-xs font-semibold text-emerald-800 mt-0.5">East Maize Field</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Affected Area</span>
          <p className="text-2xl font-black text-red-600 mt-1">37 m²</p>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">Out of 15,370 m² total</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Action Mode</span>
          <p className="text-xl font-black text-emerald-800 mt-1">Micro-Spot Spray</p>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">Neem Oil + Bio-Pesticide</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Drone Waypoint Route</span>
          <p className="text-xl font-black text-slate-900 mt-1">Auto-Generated</p>
          <p className="text-xs font-semibold text-emerald-700 mt-0.5">Flight Time: 4.2 mins</p>
        </div>
      </div>

      {/* SIMULATION & HUD DISPLAY */}
      <div className="relative rounded-[32px] overflow-hidden bg-slate-950 border-2 border-emerald-800 shadow-2xl p-6 text-white min-h-[420px] flex flex-col justify-between font-mono">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
          alt="Farmland precision route"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />

        {/* TOP HUD BAR */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-black/60 p-3.5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Plane className="w-4 h-4 text-[#8CE854] animate-bounce" />
            <span>AGRO-DRONE SPRAYER BETA • NOZZLE PRESSURE: 4.2 BAR</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-emerald-300">FLOW RATE: 0.8 L/min</span>
            <span className="bg-[#8CE854] text-slate-950 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
              {isSimulating ? 'SPRAYING ACTIVE' : simCompleted ? 'SPRAY COMPLETED' : 'READY TO DISPATCH'}
            </span>
          </div>
        </div>

        {/* MID CANVAS GRAPHIC / TARGETING GRID */}
        <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-48 h-48 rounded-full border-2 border-[#8CE854]/60 flex items-center justify-center bg-emerald-950/30 backdrop-blur-xs">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#8CE854] animate-spin" style={{ animationDuration: '12s' }} />
            
            {/* Target Hotspot Box */}
            <div className="w-20 h-20 rounded-xl border-2 border-red-500 bg-red-500/20 flex flex-col items-center justify-center animate-pulse">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <span className="text-[9px] font-bold text-white mt-1">37 m² HOTSPOT</span>
            </div>
          </div>

          {isSimulating && (
            <div className="w-full max-w-md bg-black/60 p-4 rounded-2xl border border-white/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-300">Precision Spray Progress</span>
                <span className="font-bold text-[#8CE854]">{simProgress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#8CE854] transition-all duration-300"
                  style={{ width: `${simProgress}%` }}
                />
              </div>
            </div>
          )}

          {simCompleted && (
            <div className="bg-emerald-950/90 text-emerald-100 p-4 rounded-2xl border border-emerald-500 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#8CE854] shrink-0" />
              <div className="text-left text-xs">
                <p className="font-bold text-white">Precision Spraying Successfully Finished!</p>
                <p className="text-[11px] text-emerald-200">
                  Targeted 37 m² area treated. 99.7% surrounding crops saved from chemical exposure.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM METRICS */}
        <div className="relative z-10 grid grid-cols-3 gap-2 bg-black/60 p-3.5 rounded-2xl border border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-gray-400">Chemical Saved</span>
            <p className="text-lg font-black text-[#8CE854]">78% Less Chemical</p>
          </div>
          <div>
            <span className="text-[9px] text-gray-400">Cost Saved</span>
            <p className="text-lg font-black text-white">₹4,200 / Acre</p>
          </div>
          <div>
            <span className="text-[9px] text-gray-400">Groundwater Safety</span>
            <p className="text-lg font-black text-emerald-300">Zero Toxic Runoff</p>
          </div>
        </div>
      </div>

      {/* TRADITIONAL VS PRECISION COMPARISON TABLE */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Traditional Spraying vs. AGROMAN Precision Spraying
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Quantifiable cost, environmental, and yield impact comparison on a 10-acre farm.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-emerald-50/80 text-emerald-900 uppercase font-mono font-bold text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-xl">Metric</th>
                <th className="p-3.5 text-red-700">Traditional Tractor/Manual Spray</th>
                <th className="p-3.5 bg-emerald-100/80 text-emerald-900 rounded-r-xl">AGROMAN Precision Drone Spray</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100 font-medium text-slate-700">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Coverage Target</td>
                <td className="p-3.5 text-red-600">100% Blanket Spray (Entire Field)</td>
                <td className="p-3.5 font-bold text-emerald-800 bg-emerald-50/40">Spot Spray Only (Affected Hotspots)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Pesticide Volume Used</td>
                <td className="p-3.5 text-slate-600">45 Liters / Season</td>
                <td className="p-3.5 font-bold text-emerald-800 bg-emerald-50/40">9.8 Liters / Season (-78%)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Labor & Fuel Cost</td>
                <td className="p-3.5 text-slate-600">₹6,500 / Acre</td>
                <td className="p-3.5 font-bold text-emerald-800 bg-emerald-50/40">₹1,800 / Acre (-72%)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Soil & Water Contamination</td>
                <td className="p-3.5 text-red-600">High Risk of Heavy Chemical Runoff</td>
                <td className="p-3.5 font-bold text-emerald-800 bg-emerald-50/40">Zero Groundwater Contamination</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Crop Trampling Damage</td>
                <td className="p-3.5 text-red-600">3-5% Crop Loss from Tractor Wheels</td>
                <td className="p-3.5 font-bold text-emerald-800 bg-emerald-50/40">0% Contact (Aerial Flight)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
