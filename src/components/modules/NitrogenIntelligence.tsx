import React, { useState } from 'react';
import {
  Sprout,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  Droplets,
  Layers,
  ArrowRight,
  ShieldAlert,
  BarChart2,
} from 'lucide-react';

export const NitrogenIntelligence: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<'N' | 'P' | 'K'>('N');

  const nutrientData = {
    N: {
      title: 'Nitrogen (N) Deficiency Analysis',
      status: 'Critical Low in Zone C',
      score: 62,
      symptoms: 'Pale green to yellowing older leaves (chlorosis), stunted tiller development, reduced protein synthesis.',
      cause: 'Heavy monsoon leaching + delayed split-dose application.',
      leafTexture: 'Brittle leaf tip, light yellow vein pattern',
      recommendation: 'Foliar spray of 2% Liquid Nano Urea (400 ml/acre) via Precision Drone Flight tomorrow at 07:00 AM.',
      organicAlternative: 'Azo-Spirillum bio-fertilizer + Vermicompost tea extract.',
      expectedRecovery: '4 - 6 Days',
    },
    P: {
      title: 'Phosphorus (P) Nutrient Health',
      status: 'Optimal (Zone A, B, C)',
      score: 88,
      symptoms: 'Normal dark green leaves with healthy root elongation and early grain fill.',
      cause: 'Balanced baseline DAP application during tilling.',
      leafTexture: 'Normal thick cuticle, healthy dark leaf margin',
      recommendation: 'Maintain soil pH around 6.5 to keep P bio-available.',
      organicAlternative: 'Rock phosphate + PSBs (Phosphate Solubilizing Bacteria).',
      expectedRecovery: 'Healthy (No Action)',
    },
    K: {
      title: 'Potassium (K) Stress Index',
      status: 'Moderate Deficit in Zone D',
      score: 74,
      symptoms: 'Marginal leaf scorch/browning, reduced drought & pest resistance.',
      cause: 'High fruit-set potassium demand in tomato crop.',
      leafTexture: 'Brown leaf tips, curled margins',
      recommendation: 'Drip fertigation with MOP (Muriate of Potash) 5 kg/acre.',
      organicAlternative: 'Wood ash suspension + Kelp meal extract.',
      expectedRecovery: '5 - 7 Days',
    },
  };

  const current = nutrientData[selectedElement];

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Spectral & Leaf Texture Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Nitrogen & Nutrient Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time multispectral N-P-K nutrient profiling and bio-fertilizer optimization.
          </p>
        </div>

        {/* ELEMENT SELECTOR */}
        <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded-2xl border border-emerald-200">
          {(['N', 'P', 'K'] as const).map((elem) => (
            <button
              key={elem}
              onClick={() => setSelectedElement(elem)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                selectedElement === elem
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {elem === 'N' ? 'Nitrogen (N)' : elem === 'P' ? 'Phosphorus (P)' : 'Potassium (K)'}
            </button>
          ))}
        </div>
      </div>

      {/* OVERALL SCORE & MAIN CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SCORE CARD */}
        <div className="bg-emerald-950 text-white rounded-[28px] p-6 sm:p-8 border border-emerald-800 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
              Macro-Nutrient Index
            </span>
            <h3 className="text-2xl font-bold mt-1 text-white">{current.title}</h3>
            <p className="text-xs text-emerald-200/80 mt-2">{current.status}</p>
          </div>

          <div className="text-center py-4 my-2 border-y border-emerald-800/80">
            <span className="text-6xl font-black text-[#8CE854] font-sans tracking-tight">
              {current.score}
            </span>
            <span className="text-lg font-bold text-emerald-300"> / 100</span>
            <p className="text-xs text-emerald-200 mt-1 font-mono">Nutrient Health Score</p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-emerald-200">
              <span>Primary Deficit:</span>
              <span className="font-bold text-white">{selectedElement === 'N' ? 'Nitrogen' : selectedElement === 'P' ? 'Phosphorus' : 'Potassium'}</span>
            </div>
            <div className="flex items-center justify-between text-emerald-200">
              <span>Est. Recovery:</span>
              <span className="font-bold text-[#8CE854]">{current.expectedRecovery}</span>
            </div>
          </div>
        </div>

        {/* AI DIAGNOSIS & RECOMMENDATION DETAILS */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[28px] p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Computer Vision Leaf Diagnosis</h3>
              <p className="text-xs text-slate-500">Multispectral camera band analysis (680nm RedEdge + 780nm NIR)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Visible Symptoms</span>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">{current.symptoms}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Root Cause Analysis</span>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">{current.cause}</p>
            </div>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-emerald-900 text-white space-y-2 border border-emerald-700">
              <div className="flex items-center gap-2 text-[#8CE854] text-xs font-bold uppercase font-mono">
                <Sparkles className="w-4 h-4" />
                <span>Precision Action (Recommended)</span>
              </div>
              <p className="text-sm font-semibold text-emerald-100">{current.recommendation}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-emerald-200 space-y-2 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Organic Bio-Fertilizer Alternative
              </span>
              <p className="text-xs font-semibold text-slate-700">{current.organicAlternative}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
