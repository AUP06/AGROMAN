import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Sprout,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Plane,
  Eye,
  Zap,
  ChevronRight,
  X,
  Gauge,
  TrendingUp,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface ZoneData {
  id: string;
  name: string;
  status: 'Healthy' | 'Monitor' | 'Immediate Action';
  issue: string;
  healthScore: number;
  riskScore: number;
  diseaseProbability: number;
  waterReq: string;
  nutrientStatus: string;
  expectedYield: string;
  growthStage: string;
  area: string;
  crop: string;
  color: 'green' | 'yellow' | 'red';
  coords: string;
  lastDroneScan: string;
  aiRecommendation: string;
}

interface DigitalFarmTwinProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const DigitalFarmTwin: React.FC<DigitalFarmTwinProps> = ({ setActiveTab }) => {
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [activeLayer, setActiveLayer] = useState<'health' | 'moisture' | 'nitrogen' | 'rgb'>('health');

  const zones: ZoneData[] = [
    {
      id: 'ZONE-A',
      name: 'Zone A (North Paddy Block)',
      status: 'Healthy',
      issue: 'Optimal Growth Condition',
      healthScore: 96,
      riskScore: 4,
      diseaseProbability: 2,
      waterReq: 'Optimal (12 L/m²)',
      nutrientStatus: 'N: 145, P: 48, K: 180 (Balanced)',
      expectedYield: '7.2 Tons / Hectare',
      growthStage: 'Tillering Stage (Day 42)',
      area: '4.5 Acres',
      crop: 'Jyothi Paddy (Rice)',
      color: 'green',
      coords: 'Top Left Quad',
      lastDroneScan: '12 mins ago (AgroDrone Alpha)',
      aiRecommendation: 'No chemical intervention required. Continue micro-irrigation schedule at 06:00 AM.',
    },
    {
      id: 'ZONE-B',
      name: 'Zone B (East Maize Sector)',
      status: 'Immediate Action',
      issue: 'Early Pest Attack (Fall Armyworm Spores)',
      healthScore: 64,
      riskScore: 88,
      diseaseProbability: 86,
      waterReq: 'Moderate (18 L/m²)',
      nutrientStatus: 'N: 110 (Low), P: 42, K: 165',
      expectedYield: '5.1 Tons / Hectare (-22%)',
      growthStage: 'Vegetative V6 (Day 35)',
      area: '3.8 Acres',
      crop: 'Hybrid Yellow Maize',
      color: 'red',
      coords: 'Top Right Quad',
      lastDroneScan: '8 mins ago (AgroDrone Beta)',
      aiRecommendation: 'DISPATCH PRECISION SPRAY DRONE: 37 m² hot-spot identified. Apply organic Neem oil + Bacillus thuringiensis spray immediately to halt larvae spread.',
    },
    {
      id: 'ZONE-C',
      name: 'Zone C (South Wheat & Pulses)',
      status: 'Monitor',
      issue: 'Nitrogen Deficiency (Interveinal Chlorosis)',
      healthScore: 78,
      riskScore: 45,
      diseaseProbability: 18,
      waterReq: 'Optimal (15 L/m²)',
      nutrientStatus: 'N: 82 (Critical Low), P: 50, K: 172',
      expectedYield: '6.0 Tons / Hectare (-10%)',
      growthStage: 'Flowering Stage (Day 58)',
      area: '5.2 Acres',
      crop: 'Durum Wheat',
      color: 'yellow',
      coords: 'Bottom Left Quad',
      lastDroneScan: '25 mins ago (AgroDrone Alpha)',
      aiRecommendation: 'Foliar application of Liquid Nano Urea recommended during upcoming drone flight at 04:30 PM.',
    },
    {
      id: 'ZONE-D',
      name: 'Zone D (West Orchard & Vegetables)',
      status: 'Monitor',
      issue: 'Water Stress (Low Soil Moisture 22%)',
      healthScore: 72,
      riskScore: 58,
      diseaseProbability: 12,
      waterReq: 'High Deficit (+35 L/m² Needed)',
      nutrientStatus: 'N: 135, P: 46, K: 175',
      expectedYield: '6.4 Tons / Hectare (-8%)',
      growthStage: 'Fruit Setting (Day 48)',
      area: '3.2 Acres',
      crop: 'Organic Tomatoes & Chili',
      color: 'yellow',
      coords: 'Bottom Right Quad',
      lastDroneScan: '18 mins ago (AgroDrone Gamma)',
      aiRecommendation: 'Trigger Drip Irrigation Valve #4 for 45 minutes before ambient temperature peaks at 01:00 PM.',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER SECTION */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>Digital Twin GIS Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Digital Farm Twin
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time 3D spatial telemetry, multispectral zone mapping, and predictive plant health models.
          </p>
        </div>

        {/* LAYER SELECTOR */}
        <div className="flex flex-wrap items-center gap-2 bg-emerald-50/80 p-1.5 rounded-2xl border border-emerald-200">
          {[
            { id: 'health', label: 'NDVI Health', icon: Activity },
            { id: 'moisture', label: 'Moisture Map', icon: Droplets },
            { id: 'nitrogen', label: 'Nitrogen (N)', icon: Sprout },
            { id: 'rgb', label: 'True Color RGB', icon: Eye },
          ].map((layer) => {
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeLayer === layer.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-emerald-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{layer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE DIGITAL TWIN MAP CANVAS */}
      <div className="relative rounded-[32px] overflow-hidden bg-slate-950 border-2 border-emerald-800/80 shadow-2xl p-4 sm:p-6 text-white min-h-[480px] sm:min-h-[580px] flex flex-col justify-between select-none">
        {/* Background Satellite Orthomosaic Overlay */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
          alt="Digital Twin Farm Orthomosaic"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />

        {/* TOP MAP BAR */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-black/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <p className="text-xs font-bold text-white">3D GIS Farm Spatial Twin #KUTTANAD-01</p>
              <p className="text-[10px] text-emerald-300 font-mono">
                Lat: 9.5916° N, Lng: 76.5222° E • 16.7 Acres Total
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700 px-2.5 py-1 rounded-lg">
              ACTIVE LAYER: <span className="uppercase font-bold text-white">{activeLayer}</span>
            </span>
            <button
              onClick={() => setActiveTab('drone')}
              className="flex items-center gap-1.5 bg-[#8CE854] hover:bg-[#78d641] text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition-all shadow-md"
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Fly Drone Scan</span>
            </button>
          </div>
        </div>

        {/* ZONE GRID REPRESENTATION OVER MAP */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-6">
          {zones.map((zone) => {
            const isRed = zone.color === 'red';
            const isYellow = zone.color === 'yellow';

            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`group cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 backdrop-blur-md relative overflow-hidden ${
                  isRed
                    ? 'bg-red-950/40 border-red-500/80 hover:bg-red-900/60 shadow-lg shadow-red-950/50'
                    : isYellow
                    ? 'bg-amber-950/40 border-amber-500/80 hover:bg-amber-900/60 shadow-lg shadow-amber-950/50'
                    : 'bg-emerald-950/40 border-emerald-500/80 hover:bg-emerald-900/60 shadow-lg shadow-emerald-950/50'
                }`}
              >
                {/* Status Glow Indicator */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        isRed
                          ? 'bg-red-500/30 text-red-200 border-red-400'
                          : isYellow
                          ? 'bg-amber-500/30 text-amber-200 border-amber-400'
                          : 'bg-emerald-500/30 text-emerald-200 border-emerald-400'
                      }`}
                    >
                      {zone.id} • {zone.status}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-emerald-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {zone.area}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white mb-1 group-hover:text-[#8CE854] transition-colors">
                  {zone.name}
                </h3>
                <p className={`text-xs font-semibold mb-4 ${isRed ? 'text-red-300' : isYellow ? 'text-amber-200' : 'text-emerald-200'}`}>
                  Issue: {zone.issue}
                </p>

                {/* METRICS ROW */}
                <div className="grid grid-cols-3 gap-2 bg-black/40 p-2.5 rounded-xl border border-white/10 font-mono text-center">
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase">Health</span>
                    <p className={`text-sm font-extrabold ${isRed ? 'text-red-400' : isYellow ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {zone.healthScore}%
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase">Pest Risk</span>
                    <p className="text-sm font-extrabold text-white">{zone.diseaseProbability}%</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase">Est. Yield</span>
                    <p className="text-sm font-extrabold text-emerald-300">{zone.expectedYield.split(' ')[0]}</p>
                  </div>
                </div>

                {/* Action Hover Prompt */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Click for Full AI Diagnosis</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER LEGEND */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 bg-black/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> Green = Healthy (&gt;90%)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-3 h-3 rounded-full bg-amber-500" /> Yellow = Monitor (70-89%)
            </span>
            <span className="flex items-center gap-1.5 text-red-400 font-bold">
              <span className="w-3 h-3 rounded-full bg-red-500" /> Red = Action Required (&lt;70%)
            </span>
          </div>

          <p className="text-gray-400 text-[11px]">
            Updated live via AI Vision Orthomosaic • 4 Zones Syncing
          </p>
        </div>
      </div>

      {/* ZONE DETAILED AI MODAL */}
      {selectedZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-emerald-100 pb-4">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mb-2 ${
                    selectedZone.color === 'red'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : selectedZone.color === 'yellow'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {selectedZone.id} • {selectedZone.status}
                </span>
                <h2 className="text-2xl font-black text-slate-900">{selectedZone.name}</h2>
                <p className="text-xs text-slate-500">{selectedZone.crop} • Area: {selectedZone.area}</p>
              </div>

              <button
                onClick={() => setSelectedZone(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI DIAGNOSIS BOX */}
            <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-3 border border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase font-mono">
                <Sparkles className="w-4 h-4" />
                <span>AI Autonomous Recommendation</span>
              </div>
              <p className="text-sm font-medium text-emerald-100 leading-relaxed">
                {selectedZone.aiRecommendation}
              </p>
              <p className="text-[11px] text-emerald-300/80 font-mono">
                Last Telemetry Scan: {selectedZone.lastDroneScan}
              </p>
            </div>

            {/* DETAILED METRICS TABLE */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans">
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Health Score</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">{selectedZone.healthScore}%</p>
              </div>
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Disease Risk</p>
                <p className="text-xl font-black text-red-600 mt-0.5">{selectedZone.diseaseProbability}%</p>
              </div>
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Growth Stage</p>
                <p className="text-xs font-extrabold text-slate-900 mt-1">{selectedZone.growthStage}</p>
              </div>
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Water Need</p>
                <p className="text-xs font-bold text-slate-800 mt-1">{selectedZone.waterReq}</p>
              </div>
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100 col-span-2 sm:col-span-2">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Nutrient Status (NPK)</p>
                <p className="text-xs font-mono font-bold text-slate-800 mt-1">{selectedZone.nutrientStatus}</p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {selectedZone.color === 'red' && (
                <button
                  onClick={() => {
                    setSelectedZone(null);
                    setActiveTab('precision_spraying');
                  }}
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Zap className="w-4 h-4" />
                  <span>Deploy Targeted Drone Spray</span>
                </button>
              )}

              {selectedZone.color === 'yellow' && (
                <button
                  onClick={() => {
                    setSelectedZone(null);
                    setActiveTab('irrigation');
                  }}
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Droplets className="w-4 h-4" />
                  <span>Trigger Precision Irrigation</span>
                </button>
              )}

              <button
                onClick={() => {
                  setSelectedZone(null);
                  setActiveTab('scanner');
                }}
                className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>Run Crop Scanner Diagnosis</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
