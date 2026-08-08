import React, { useState, useEffect } from 'react';
import { Plane, ShieldCheck, Sparkles, Sprout, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing AGROMAN Neural Flight Core...');

  useEffect(() => {
    const steps = [
      { p: 20, t: 'Connecting ESP32 IoT Sensor Network...' },
      { p: 45, t: 'Calibrating DJI Drone Autopilot Flight Waypoints...' },
      { p: 70, t: 'Loading TensorFlow Vision AI Crop Disease Model...' },
      { p: 90, t: 'Synchronizing NASA Microclimate Satellite Feed...' },
      { p: 100, t: 'Welcome to AGROMAN - SIH 2026 Ready!' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].t);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onFinish, 600);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none">
      {/* Background Animated Particles & Parallax Crop Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#66BB6A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-bold">
            SMART INDIA HACKATHON 2026
          </span>
        </div>
        <button
          onClick={onFinish}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
        >
          <span>Skip Animation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Center Animation Stage */}
      <div className="flex flex-col items-center justify-center text-center z-10 max-w-2xl my-auto">
        {/* Flying Drone Animation Stage */}
        <div className="relative w-64 h-36 mb-8 flex items-center justify-center">
          {/* Animated Sky Clouds */}
          <div className="absolute top-2 left-0 w-16 h-6 bg-emerald-700/20 rounded-full blur-xs animate-pulse" />
          <div className="absolute top-6 right-2 w-20 h-8 bg-emerald-600/20 rounded-full blur-xs animate-pulse delay-300" />

          {/* Flying Drone Object */}
          <div className="relative z-10 animate-bounce transition-transform duration-1000">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 via-green-400 to-emerald-300 p-1 shadow-2xl shadow-emerald-500/50 flex items-center justify-center relative">
              <Plane className="w-10 h-10 text-emerald-950 animate-pulse" />
              {/* Drone Rotors */}
              <div className="absolute -top-3 -left-3 w-8 h-2 bg-emerald-300/80 rounded-full animate-spin" />
              <div className="absolute -top-3 -right-3 w-8 h-2 bg-emerald-300/80 rounded-full animate-spin" />
              <div className="absolute -bottom-3 -left-3 w-8 h-2 bg-emerald-300/80 rounded-full animate-spin" />
              <div className="absolute -bottom-3 -right-3 w-8 h-2 bg-emerald-300/80 rounded-full animate-spin" />
            </div>
            {/* Scanning Laser Cone */}
            <div className="w-24 h-20 bg-gradient-to-b from-emerald-400/40 via-green-400/10 to-transparent mx-auto -mt-2 clip-triangle animate-pulse" />
          </div>

          {/* Growing Crops Field below drone */}
          <div className="absolute bottom-0 inset-x-0 h-8 flex items-end justify-center gap-3 border-b-2 border-emerald-500/40 pb-1">
            <Sprout className="w-6 h-6 text-emerald-400 animate-pulse" />
            <Sprout className="w-7 h-7 text-emerald-300 animate-pulse delay-100" />
            <Sprout className="w-8 h-8 text-green-400 animate-pulse delay-200" />
            <Sprout className="w-7 h-7 text-emerald-300 animate-pulse delay-300" />
            <Sprout className="w-6 h-6 text-emerald-400 animate-pulse delay-150" />
          </div>
        </div>

        {/* AGROMAN Brand Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-300 font-sans">
          AGROMAN
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-emerald-200 font-medium tracking-wide max-w-lg">
          AI-Powered Smart Agricultural Monitoring & Decision Support System
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-8">
          <div className="flex justify-between text-xs text-emerald-300 mb-2 font-mono">
            <span className="truncate max-w-[280px]">{statusText}</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-emerald-950/80 rounded-full p-0.5 border border-emerald-700/60 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-300 rounded-full transition-all duration-500 shadow-md shadow-emerald-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Team Info */}
      <div className="w-full max-w-4xl text-center text-xs text-emerald-300/80 z-10 border-t border-emerald-800/40 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Developed by <strong>Team AGROMAN</strong></span>
        </div>
        <span className="font-mono text-[11px] text-emerald-400">
          Annamol A Abraham • Amith U Pillai • Josh Abraham Jacob • Nikhil Suresh • Arjun S • Abhijith S
        </span>
      </div>
    </div>
  );
};
