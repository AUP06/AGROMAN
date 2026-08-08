import React from 'react';

// Circular Progress Ring Gauge (e.g. 75% Moisture Level)
export const CircularMoistureGauge: React.FC<{
  percentage: number;
  label?: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
}> = ({
  percentage,
  label = 'Moisture Level',
  sublabel = 'Optimal range',
  size = 120,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/80 backdrop-blur-md p-4 rounded-[24px] border border-emerald-100 shadow-sm text-center sm:text-left">
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="text-emerald-100"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="text-emerald-500 transition-all duration-1000 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-900 tracking-tight font-sans">
            {percentage}%
          </span>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-extrabold text-slate-900">{label}</h4>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{sublabel}</p>
        <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
          HEALTHY
        </span>
      </div>
    </div>
  );
};

// Semi-Circle Arc Gauge (e.g. Crop Health Score 85/100)
export const SemiCircleHealthGauge: React.FC<{
  score: number;
  maxScore?: number;
  title?: string;
  statusText?: string;
}> = ({ score, maxScore = 100, title = 'Crop Health Score', statusText = 'Excellent' }) => {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const angle = (percentage / 100) * 180;

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-[24px] border border-emerald-100 shadow-sm flex flex-col items-center text-center justify-between">
      <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">{title}</span>
      <div className="relative w-36 h-20 my-2 overflow-hidden flex items-end justify-center">
        {/* Semi circle arc track */}
        <div className="w-36 h-36 rounded-full border-[12px] border-emerald-100 absolute top-0 border-b-transparent border-l-transparent transform rotate-[-45deg]" />
        {/* Semi circle arc progress */}
        <div
          className="w-36 h-36 rounded-full border-[12px] border-emerald-500 absolute top-0 border-b-transparent border-l-transparent transition-transform duration-1000 ease-out"
          style={{
            transform: `rotate(${-45 + (percentage / 100) * 180}deg)`,
          }}
        />
        {/* Needle Value Text */}
        <div className="relative z-10 pb-1">
          <span className="text-2xl font-black text-slate-900 font-sans">{score}</span>
          <span className="text-xs text-slate-400 font-bold">/{maxScore}</span>
        </div>
      </div>
      <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
        {statusText}
      </span>
    </div>
  );
};

// N-P-K Soil Status Breakdown
export const SoilNutrientBar: React.FC<{
  nitrogen: 'High' | 'Optimal' | 'Low';
  phosphorus: 'High' | 'Optimal' | 'Low';
  potassium: 'High' | 'Optimal' | 'Low';
  ph: number;
}> = ({ nitrogen, phosphorus, potassium, ph }) => {
  const getBadgeColor = (val: 'High' | 'Optimal' | 'Low') => {
    switch (val) {
      case 'High':
      case 'Optimal':
        return 'bg-emerald-500 text-white';
      case 'Low':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-slate-400 text-white';
    }
  };

  const getWidth = (val: 'High' | 'Optimal' | 'Low') => {
    switch (val) {
      case 'High':
        return 'w-[85%] bg-emerald-500';
      case 'Optimal':
        return 'w-[65%] bg-emerald-400';
      case 'Low':
        return 'w-[30%] bg-amber-500';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] border border-emerald-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-900">Soil Status</h3>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
          NPK Telemetry
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Nitrogen</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${getBadgeColor(nitrogen)}`}>
            {nitrogen}
          </span>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className={`h-full rounded-full ${getWidth(nitrogen)}`} />
          </div>
        </div>

        <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Phosphorus</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${getBadgeColor(phosphorus)}`}>
            {phosphorus}
          </span>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className={`h-full rounded-full ${getWidth(phosphorus)}`} />
          </div>
        </div>

        <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Potassium</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${getBadgeColor(potassium)}`}>
            {potassium}
          </span>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className={`h-full rounded-full ${getWidth(potassium)}`} />
          </div>
        </div>
      </div>

      {/* pH Meter Bar */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-600">Soil pH</span>
        <span className="text-xs font-extrabold text-slate-900">{ph} Neutral</span>
      </div>
      <div className="w-full bg-gradient-to-r from-red-400 via-emerald-500 to-blue-500 h-2 rounded-full relative">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow-md"
          style={{ left: `${((ph - 4) / 6) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Water Efficiency Bar Distribution
export const WaterEfficiencyBars: React.FC<{
  efficiencyPct: number;
}> = ({ efficiencyPct }) => {
  const bars = [30, 45, 60, 80, 95, 100, 85, 70, 90, 75, 60, 85, 95, 100, 80, 65, 50, 70, 85, 90, 95, 80, 60, 40];

  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] border border-emerald-100 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-extrabold text-slate-900">Water Efficiency</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
            High
          </span>
          <span className="text-sm font-extrabold text-slate-900 font-mono">{efficiencyPct}%</span>
        </div>
      </div>

      <div className="flex items-end justify-between h-10 gap-1 pt-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              i < (efficiencyPct / 100) * bars.length
                ? 'bg-emerald-500'
                : 'bg-emerald-100'
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
};
