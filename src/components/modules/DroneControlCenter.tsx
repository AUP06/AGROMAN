import React, { useState, useEffect } from 'react';
import {
  Plane,
  BatteryCharging,
  Gauge,
  Navigation,
  Radio,
  Play,
  Pause,
  RotateCcw,
  AlertOctagon,
  Camera,
  CloudSun,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { DroneTelemetry, ActiveTab } from '../../types';

interface DroneControlCenterProps {
  drones: DroneTelemetry[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const DroneControlCenter: React.FC<DroneControlCenterProps> = ({
  drones,
  setActiveTab,
}) => {
  const [selectedDroneId, setSelectedDroneId] = useState<string>('DRONE-ALPHA');
  const [missionState, setMissionState] = useState<'IDLE' | 'RUNNING' | 'PAUSED' | 'RTH'>('RUNNING');
  const [missionProgress, setMissionProgress] = useState(68);
  const [altitude, setAltitude] = useState(42.5);
  const [speed, setSpeed] = useState(8.4);
  const [battery, setBattery] = useState(88);

  const currentDrone = drones.find((d) => d.id === selectedDroneId) || drones[0];

  // Flight simulation loop
  useEffect(() => {
    let interval: any;
    if (missionState === 'RUNNING') {
      interval = setInterval(() => {
        setMissionProgress((prev) => (prev >= 100 ? 0 : prev + 1));
        setAltitude((prev) => Math.max(30, Math.min(60, prev + (Math.random() * 0.8 - 0.4))));
        setSpeed((prev) => Math.max(4, Math.min(12, prev + (Math.random() * 0.4 - 0.2))));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [missionState]);

  const handleAction = (action: 'START' | 'PAUSE' | 'RESUME' | 'RTH' | 'STOP') => {
    if (action === 'START' || action === 'RESUME') {
      setMissionState('RUNNING');
    } else if (action === 'PAUSE') {
      setMissionState('PAUSED');
      setSpeed(0);
    } else if (action === 'RTH') {
      setMissionState('RTH');
      setSpeed(14.5);
    } else if (action === 'STOP') {
      setMissionState('IDLE');
      setSpeed(0);
      setAltitude(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* DJI FLIGHT PILOT TOP BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-950 via-emerald-950 to-gray-950 text-white shadow-2xl border border-emerald-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-emerald-400 animate-pulse" />
            <h2 className="text-xl font-extrabold tracking-wider text-emerald-100">
              DJI PILOT 2 AUTOPILOT CONTROL CENTER
            </h2>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] px-2 py-0.5 rounded-full">
              RTK STABILITY HIGH
            </span>
          </div>
          <p className="text-xs text-emerald-300/80 mt-1">
            Matrice 300 RTK • MicaSense RedEdge-P Multispectral + Thermal Camera Payload
          </p>
        </div>

        {/* Drone Switcher Tabs */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-emerald-800/50">
          {drones.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDroneId(d.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDroneId === d.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {d.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN TELEMETRY & FLIGHT DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Flight Parameters HUD */}
        <div className="space-y-4">
          {/* Telemetry Gauge Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase">Battery Level</span>
                <BatteryCharging className="w-4 h-4 text-emerald-700" />
              </div>
              <p className="text-2xl font-black font-mono text-emerald-950">{battery}%</p>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${battery}%` }}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase">Flight Altitude</span>
                <Gauge className="w-4 h-4 text-emerald-700" />
              </div>
              <p className="text-2xl font-black font-mono text-emerald-950">
                {altitude.toFixed(1)} <span className="text-xs font-normal">m</span>
              </p>
              <span className="text-[10px] text-emerald-700 font-mono">Target: 45.0m</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase">Ground Speed</span>
                <Navigation className="w-4 h-4 text-emerald-700" />
              </div>
              <p className="text-2xl font-black font-mono text-emerald-950">
                {speed.toFixed(1)} <span className="text-xs font-normal">m/s</span>
              </p>
              <span className="text-[10px] text-emerald-700 font-mono">Max: 15.0 m/s</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase">GPS Satellites</span>
                <Radio className="w-4 h-4 text-emerald-700" />
              </div>
              <p className="text-2xl font-black font-mono text-emerald-950">
                {currentDrone.satellites} <span className="text-xs font-normal">Sats</span>
              </p>
              <span className="text-[10px] text-emerald-700 font-mono">RTK Fix Lock</span>
            </div>
          </div>

          {/* Mission Progress Card */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-800">Autopilot Mission Progress</span>
              <span className="font-mono font-bold text-emerald-800">{missionProgress}%</span>
            </div>

            <div className="w-full h-3 bg-emerald-50 rounded-full p-0.5 border border-emerald-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-700 to-green-500 rounded-full transition-all duration-300"
                style={{ width: `${missionProgress}%` }}
              />
            </div>

            <p className="text-[11px] text-gray-500 font-mono">
              Current Waypoint: 14 / 22 • Sector 3B Paddy Survey
            </p>
          </div>

          {/* Weather Status */}
          <div className="bg-emerald-900 text-white p-4 rounded-3xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CloudSun className="w-4 h-4" />
                <span>Flight Weather Safety</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-md text-[10px]">
                SAFE TO FLY
              </span>
            </div>
            <p className="text-xs text-emerald-100">
              Wind: 11.2 km/h SW • Visibility: 10 km • No precipitation warning
            </p>
          </div>
        </div>

        {/* Center Live Camera & Controls Overlay */}
        <div className="lg:col-span-2 space-y-4">
          {/* Live Camera View Box */}
          <div className="relative rounded-3xl overflow-hidden bg-black aspect-video border-2 border-emerald-800 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000"
              alt="Drone Camera Feed"
              className="w-full h-full object-cover opacity-90"
            />

            {/* DJI HUD Visual Overlays */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none font-mono text-white text-xs">
              {/* Top Bar */}
              <div className="flex justify-between items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="font-bold text-red-400">REC 4K HDR</span>
                  <span className="text-emerald-300">NDVI SPECTRAL LIVE</span>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span>ALT: {altitude.toFixed(1)}m</span>
                  <span>SPD: {speed.toFixed(1)}m/s</span>
                  <span>BAT: {battery}%</span>
                </div>
              </div>

              {/* Crosshair Center Reticle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-emerald-400/80 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
              </div>

              {/* Bottom HUD Information */}
              <div className="flex justify-between items-end bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
                <div>
                  <p className="text-[10px] text-emerald-300">LAT: 9.4985° N • LNG: 76.3392° E</p>
                  <p className="text-[10px] text-gray-300">Target Field: Green Acres Paddy</p>
                </div>

                <button
                  onClick={() => setActiveTab('live_camera')}
                  className="pointer-events-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-xl text-xs transition-transform hover:scale-105"
                >
                  Fullscreen AI HUD Mode
                </button>
              </div>
            </div>
          </div>

          {/* FLIGHT CONTROL COMMAND BUTTONS */}
          <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAction('START')}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-2xl transition-all shadow-xs text-xs"
              >
                <Play className="w-4 h-4" />
                <span>Start Mission</span>
              </button>

              <button
                onClick={() => handleAction('PAUSE')}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2.5 rounded-2xl transition-all shadow-xs text-xs"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>

              <button
                onClick={() => handleAction('RESUME')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-2xl transition-all shadow-xs text-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => handleAction('RTH')}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold px-4 py-2.5 rounded-2xl transition-all shadow-xs text-xs"
              >
                <Plane className="w-4 h-4" />
                <span>Return Home (RTH)</span>
              </button>
            </div>

            <button
              onClick={() => handleAction('STOP')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold px-5 py-2.5 rounded-2xl shadow-md transition-all active:scale-95 text-xs"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>EMERGENCY STOP</span>
            </button>
          </div>
        </div>
      </div>

      {/* MISSION TIMELINE & FLIGHT HISTORY LOGS */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2 border-b border-emerald-100 pb-3">
          <Clock className="w-5 h-5 text-emerald-700" />
          <span>Autonomous Mission Timeline & Flight Audit History</span>
        </h3>

        <div className="space-y-3">
          {[
            {
              time: '08:30 AM',
              title: 'Block 3B Paddy NDVI Survey',
              drone: 'AGRO-DRONE Alpha',
              status: 'Completed',
              duration: '22 mins',
            },
            {
              time: '10:15 AM',
              title: 'Tea Estate Blister Blight Targeted Spraying',
              drone: 'AGRO-DRONE Beta',
              status: 'In Progress',
              duration: '14 mins',
            },
            {
              time: '02:00 PM',
              title: 'Coorg Coffee Thermal Canopy Mapping',
              drone: 'AGRO-DRONE Gamma',
              status: 'Scheduled',
              duration: '28 mins',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-emerald-800">{item.time}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-[11px] text-gray-500">{item.drone} • Estimated Duration: {item.duration}</p>
                </div>
              </div>

              <span
                className={`font-mono font-bold px-2.5 py-1 rounded-full text-[10px] ${
                  item.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : item.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
