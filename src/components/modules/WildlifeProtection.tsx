import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  Eye,
  AlertTriangle,
  Radio,
  Bell,
  Volume2,
  CheckCircle2,
  Camera,
  Compass,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface ThreatAlert {
  id: string;
  type: 'Wild Boar' | 'Elephant' | 'Monkey' | 'Deer' | 'Thermal Fire Risk' | 'Unauthorized Person';
  location: string;
  time: string;
  risk: 'Critical' | 'High' | 'Medium';
  thermalHeatIndex: string;
  recommendedAction: string;
}

export const WildlifeProtection: React.FC = () => {
  const [nightVision, setNightVision] = useState(true);
  const [isAlerting, setIsAlerting] = useState(false);

  const threats: ThreatAlert[] = [
    {
      id: 'SEC-109',
      type: 'Wild Boar',
      location: 'Zone B Border (East Perimeter Fence)',
      time: '02:14 AM (Night Patrol)',
      risk: 'High',
      thermalHeatIndex: '38.6°C Sign',
      recommendedAction: 'Trigger perimeter acoustic repelling sound + Strobe Light Beacon #3.',
    },
    {
      id: 'SEC-108',
      type: 'Elephant',
      location: 'Forest Corridor Sector 1',
      time: '01:48 AM',
      risk: 'Critical',
      thermalHeatIndex: '39.2°C Massive Signature',
      recommendedAction: 'Alert Forest Guard Whatsapp & Trigger Elephant Deterrent Frequency (Acoustic 14kHz).',
    },
    {
      id: 'SEC-107',
      type: 'Thermal Fire Risk',
      location: 'Zone C Biomass Storage Area',
      time: '11:22 PM',
      risk: 'Critical',
      thermalHeatIndex: '78.4°C High Heat Point',
      recommendedAction: 'Dispatch emergency night inspection & verify soil moisture probe #12.',
    },
  ];

  const triggerSoundDeterrent = () => {
    setIsAlerting(true);
    setTimeout(() => setIsAlerting(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Thermal Surveillance & Perimeter Defense</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Wildlife Protection & Night Patrol
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Thermal imaging drones and AI vision early-warning system for crop damage prevention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNightVision(!nightVision)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              nightVision
                ? 'bg-slate-950 text-[#8CE854] border border-[#8CE854]/40 shadow-md'
                : 'bg-emerald-100 text-emerald-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{nightVision ? 'Thermal Night Mode ACTIVE' : 'Switch to Thermal HUD'}</span>
          </button>
        </div>
      </div>

      {/* THERMAL CAMERA HUD STAGE */}
      <div
        className={`relative rounded-[32px] overflow-hidden border-2 shadow-2xl p-6 min-h-[420px] flex flex-col justify-between font-mono select-none transition-all duration-500 ${
          nightVision
            ? 'bg-slate-950 border-emerald-500/80 text-[#8CE854]'
            : 'bg-slate-900 border-slate-700 text-white'
        }`}
      >
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop"
          alt="Night Thermal Feed"
          className={`absolute inset-0 w-full h-full object-cover opacity-40 transition-all duration-500 ${
            nightVision ? 'filter hue-rotate-90 contrast-125' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />

        {/* TOP TELEMETRY HUD */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-black/70 p-3.5 rounded-2xl border border-white/10 text-xs">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-red-500 animate-ping" />
            <span className="font-bold text-white">NIGHT PATROL DRONE THERMAL FLIR CAM #3</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-300">SENSOR TEMP: -12°C FLIR</span>
            <span className="bg-red-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px]">
              2 ANIMAL THREATS DETECTED
            </span>
          </div>
        </div>

        {/* MID SCREEN TARGETING */}
        <div className="relative z-10 my-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-52 h-52 rounded-full border-2 border-dashed border-red-500/80 flex items-center justify-center bg-red-950/20 backdrop-blur-xs">
            <div className="w-24 h-24 rounded-2xl border-2 border-red-500 bg-red-500/30 flex flex-col items-center justify-center animate-pulse">
              <ShieldAlert className="w-8 h-8 text-red-400" />
              <span className="text-[10px] font-black text-white mt-1">WILD BOAR (96%)</span>
            </div>
          </div>

          {isAlerting && (
            <div className="bg-red-600 text-white p-4 rounded-2xl font-sans font-bold text-xs flex items-center gap-3 shadow-2xl animate-bounce">
              <Volume2 className="w-6 h-6" />
              <span>Acoustic Acoustic Frequency & Strobe Flash Triggered!</span>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 bg-black/70 p-3.5 rounded-2xl border border-white/10 text-xs font-sans">
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Target Coords: 9.5922° N, 76.5218° E (Zone B East Fence)</span>
          </div>

          <button
            onClick={triggerSoundDeterrent}
            className="bg-red-600 hover:bg-red-700 text-white font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>Trigger Acoustic Repeller</span>
          </button>
        </div>
      </div>

      {/* RECENT THREAT ALERTS TABLE */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs space-y-6">
        <h3 className="text-xl font-extrabold text-slate-900">Perimeter Intrusion Log</h3>

        <div className="space-y-3">
          {threats.map((threat) => (
            <div
              key={threat.id}
              className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shrink-0 ${
                    threat.risk === 'Critical' ? 'bg-red-600' : 'bg-amber-600'
                  }`}
                >
                  {threat.type === 'Thermal Fire Risk' ? <Flame className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900">{threat.type}</h4>
                    <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md">
                      {threat.risk}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{threat.location} • {threat.time}</p>
                  <p className="text-xs font-semibold text-emerald-900 mt-1">Action: {threat.recommendedAction}</p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-slate-500 shrink-0">
                {threat.thermalHeatIndex}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
