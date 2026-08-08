import React, { useState, useEffect } from 'react';
import {
  Droplets,
  Power,
  Gauge,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap,
  RotateCcw,
} from 'lucide-react';

interface SmartIrrigationProps {
  onTriggerIrrigation?: () => void;
}

export const SmartIrrigation: React.FC<SmartIrrigationProps> = () => {
  const [isMotorOn, setIsMotorOn] = useState(false);
  const [tankLevel, setTankLevel] = useState(84); // %
  const [waterFlow, setWaterFlow] = useState(0); // L/min
  const [pipelinePressure, setPipelinePressure] = useState(14.2); // PSI
  const [valveOpen, setValveOpen] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState(21.4); // %

  // Irrigation loop simulation
  useEffect(() => {
    let interval: any;
    if (isMotorOn) {
      interval = setInterval(() => {
        setTankLevel((prev) => Math.max(10, prev - 0.2));
        setWaterFlow(48.5);
        setPipelinePressure(42.8);
        setValveOpen(true);
        setSoilMoisture((prev) => Math.min(55, +(prev + 0.4).toFixed(1)));
      }, 1000);
    } else {
      setWaterFlow(0);
      setPipelinePressure(14.2);
      setValveOpen(false);
    }
    return () => clearInterval(interval);
  }, [isMotorOn]);

  const toggleMotor = () => {
    setIsMotorOn(!isMotorOn);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Droplets className="w-6 h-6 text-blue-600" />
            <span>Automated Precision Smart Irrigation</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Micro-controller solenoid valve & sub-surface drip fertigation loop.
          </p>
        </div>

        <button
          onClick={toggleMotor}
          className={`flex items-center gap-2 font-extrabold px-6 py-3 rounded-2xl shadow-lg transition-all active:scale-95 text-xs ${
            isMotorOn
              ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
              : 'bg-emerald-700 hover:bg-emerald-800 text-white'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isMotorOn ? 'STOP IRRIGATION MOTOR' : 'START SMART IRRIGATION'}</span>
        </button>
      </div>

      {/* VISUAL DIAGRAM STAGE */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
        <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider font-mono">
          Hydraulic Flow & Valve Schematic Diagram
        </h3>

        {/* Animated Water Pipe Pipeline Viewport */}
        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-gray-900 to-emerald-950 text-white overflow-hidden shadow-2xl border border-emerald-800">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-center text-center relative z-10">
            {/* Water Tank Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-blue-300 uppercase mb-2">
                Main Water Tank
              </span>
              <div className="relative w-16 h-24 bg-gray-800 rounded-xl border border-blue-400 overflow-hidden flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500"
                  style={{ height: `${tankLevel}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-white drop-shadow">
                  {tankLevel.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Electric Motor Pump */}
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase mb-2">
                7.5 HP Electric Motor
              </span>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                  isMotorOn
                    ? 'border-emerald-400 bg-emerald-900/80 shadow-lg shadow-emerald-500/50 animate-spin'
                    : 'border-gray-600 bg-gray-800'
                }`}
              >
                <Power className={`w-8 h-8 ${isMotorOn ? 'text-emerald-400' : 'text-gray-500'}`} />
              </div>
              <span className="text-xs font-mono font-bold mt-2 text-white">
                {isMotorOn ? 'MOTOR RUNNING' : 'PUMP OFF'}
              </span>
            </div>

            {/* Solenoid Valve */}
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-purple-300 uppercase mb-2">
                Solenoid Valve #2
              </span>
              <div
                className={`w-16 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                  valveOpen ? 'bg-emerald-600 text-white' : 'bg-red-950 text-red-300 border border-red-700'
                }`}
              >
                {valveOpen ? 'VALVE OPEN' : 'CLOSED'}
              </div>
            </div>

            {/* Soil Field Output */}
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase mb-2">
                Soil Moisture Status
              </span>
              <p className="text-3xl font-black font-mono text-emerald-400">{soilMoisture}%</p>
              <span className="text-[10px] text-gray-300 mt-1 font-mono">Target: 45.0%</span>
            </div>
          </div>

          {/* Animated Water Particle Line when ON */}
          {isMotorOn && (
            <div className="mt-6 w-full h-3 bg-blue-950 rounded-full p-0.5 border border-blue-500/50 overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span className="text-[10px] uppercase font-mono text-gray-500 block">Water Flow Rate</span>
            <p className="text-2xl font-black font-mono text-emerald-950">{waterFlow} L/min</p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span className="text-[10px] uppercase font-mono text-gray-500 block">Line Pressure</span>
            <p className="text-2xl font-black font-mono text-emerald-950">{pipelinePressure} PSI</p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span className="text-[10px] uppercase font-mono text-gray-500 block">Daily Target</span>
            <p className="text-2xl font-black font-mono text-emerald-950">12,400 L</p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span className="text-[10px] uppercase font-mono text-gray-500 block">Efficiency Rating</span>
            <p className="text-2xl font-black font-mono text-emerald-950">98.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
