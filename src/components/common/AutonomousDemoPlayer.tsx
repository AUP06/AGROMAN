import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  X,
  Sparkles,
  CheckCircle2,
  Plane,
  Layers,
  ScanLine,
  Sprout,
  Zap,
  FileSpreadsheet,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface AutonomousDemoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AutonomousDemoPlayer: React.FC<AutonomousDemoPlayerProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      title: '1. Drone Mission Starts',
      tab: 'drone' as ActiveTab,
      desc: 'AGRO-DRONE Alpha takes off autonomously to scan Sector 3 Kuttanad Paddy Estate.',
      icon: Plane,
    },
    {
      title: '2. Farm Scan & Multispectral Imaging',
      tab: 'digital_twin' as ActiveTab,
      desc: '3D Orthomosaic layer processing live plant reflectance and leaf water stress.',
      icon: Layers,
    },
    {
      title: '3. AI Detects Early Pest Hotspot',
      tab: 'scanner' as ActiveTab,
      desc: 'Vision AI identifies Fall Armyworm larvae in Zone B (37 m² hotspot detected).',
      icon: ScanLine,
    },
    {
      title: '4. Digital Twin Zone B Alert',
      tab: 'digital_twin' as ActiveTab,
      desc: 'Digital Twin updates Zone B status to Red (Immediate Action Required).',
      icon: Layers,
    },
    {
      title: '5. AI Recommendation Generated',
      tab: 'nitrogen' as ActiveTab,
      desc: 'Explainable AI computes spot-spraying dosage and 78% chemical reduction plan.',
      icon: Sprout,
    },
    {
      title: '6. Precision Spraying Dispatched',
      tab: 'precision_spraying' as ActiveTab,
      desc: 'AgroDrone Beta flies directly to Zone B hotspot and executes targeted spot spray.',
      icon: Zap,
    },
    {
      title: '7. Closed-Loop AI Farm Report',
      tab: 'reports' as ActiveTab,
      desc: 'PDF SIH 2026 Audit Report generated with water saved and yield impact metrics.',
      icon: FileSpreadsheet,
    },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    // Auto navigate to active tab
    setActiveTab(steps[currentStep].tab);

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 6000); // 6 seconds per demo step

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, isOpen]);

  if (!isOpen) return null;

  const currentStepObj = steps[currentStep];
  const StepIcon = currentStepObj.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setActiveTab(steps[currentStep + 1].tab);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    setActiveTab(steps[0].tab);
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-[480px] z-50 bg-slate-950 text-white rounded-3xl p-5 shadow-2xl border-2 border-[#8CE854] animate-in slide-in-from-bottom duration-300 font-sans">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-emerald-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8CE854] animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8CE854]">
            AUTONOMOUS AI DEMO SIMULATOR
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ACTIVE STEP DETAILS */}
      <div className="flex items-start gap-3 bg-emerald-950/80 p-3.5 rounded-2xl border border-emerald-800">
        <div className="w-10 h-10 rounded-xl bg-[#8CE854] text-slate-950 flex items-center justify-center shrink-0 font-black">
          <StepIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-extrabold text-white truncate">{currentStepObj.title}</h4>
          <p className="text-xs text-emerald-200/90 leading-relaxed mt-0.5">{currentStepObj.desc}</p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="my-3 space-y-1">
        <div className="flex justify-between text-[10px] font-mono text-emerald-300 font-bold">
          <span>STEP {currentStep + 1} OF {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% COMPLETE</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-[#8CE854] transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handleRestart}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 text-xs font-bold flex items-center gap-1.5"
          title="Restart Demo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-xl bg-[#8CE854] hover:bg-[#78d641] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-slate-950" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5"
            title="Next Step"
          >
            <span>Next</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
