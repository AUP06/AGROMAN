import React from 'react';
import { ShieldCheck, Award, Sparkles, Play } from 'lucide-react';

interface DemoBannerProps {
  onOpenSIHModal: () => void;
  onStartAutonomousDemo?: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  onOpenSIHModal,
  onStartAutonomousDemo,
}) => {
  return (
    <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-950 text-white text-xs py-2 px-4 shadow-md flex flex-wrap items-center justify-between gap-2 z-40 border-b border-emerald-700/50">
      <div className="flex items-center gap-2 font-medium">
        <span className="bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border border-emerald-400/40 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-300" />
          Prototype Mode
        </span>
        <span className="hidden md:inline text-emerald-100">
          Simulated for <strong className="text-white">Smart India Hackathon 2026</strong> evaluation.
        </span>
      </div>

      <div className="flex items-center gap-2">
        {onStartAutonomousDemo && (
          <button
            onClick={onStartAutonomousDemo}
            className="flex items-center gap-1.5 bg-[#8CE854] hover:bg-[#78d641] text-slate-950 px-3 py-1 rounded-full font-black transition-all shadow-sm hover:scale-105 active:scale-95 text-[11px]"
          >
            <Play className="w-3 h-3 fill-slate-950" />
            <span>Start Autonomous Demo</span>
          </button>
        )}

        <button
          onClick={onOpenSIHModal}
          className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-full font-semibold transition-all shadow-sm hover:scale-105 active:scale-95 text-[11px]"
        >
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">Team AGROMAN Pitch</span>
          <Sparkles className="w-3 h-3 text-amber-200 animate-pulse" />
        </button>
      </div>
    </div>
  );
};

