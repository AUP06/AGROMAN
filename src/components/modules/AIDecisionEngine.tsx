import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Droplets,
  TrendingUp,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DecisionInsight } from '../../types';
import { DECISION_INSIGHTS } from '../../data/mockData';

export const AIDecisionEngine: React.FC = () => {
  const [selectedDecision, setSelectedDecision] = useState<DecisionInsight>(DECISION_INSIGHTS[0]);
  const [showLogic, setShowLogic] = useState(true);
  const [showAlternative, setShowAlternative] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-emerald-700" />
            <span>Explainable AI (XAI) Agronomic Decision Engine</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Transparent multi-agent decision support combining sensor telemetry, satellite remote sensing, and local crop science.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200">
          Neural Reasoner v3.1 Active
        </span>
      </div>

      {/* DECISION SELECTOR TABS */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {DECISION_INSIGHTS.map((dec) => (
          <button
            key={dec.id}
            onClick={() => {
              setSelectedDecision(dec);
              setShowAlternative(false);
            }}
            className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 ${
              selectedDecision.id === dec.id
                ? 'bg-emerald-800 text-white border-emerald-700 shadow-md'
                : 'bg-white text-gray-700 border-emerald-100 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{dec.farmName}</span>
            <span className="text-[10px] font-mono opacity-80">({dec.priority} Priority)</span>
          </button>
        ))}
      </div>

      {/* MAIN DECISION CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-lg space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-md">
                HIGH PRIORITY DECISION
              </span>
              <span className="text-xs font-mono text-gray-400">{selectedDecision.id}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
              {selectedDecision.farmName}
            </h3>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-gray-400 block">AI Confidence</span>
            <span className="text-3xl font-black font-mono text-emerald-800">
              {selectedDecision.confidence}%
            </span>
          </div>
        </div>

        {/* Problem vs Root Cause Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block mb-1">
              Identified Agronomic Problem
            </span>
            <p className="text-xs text-gray-800 font-semibold leading-relaxed">
              {selectedDecision.problem}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 block mb-1">
              Neural Causal Root Reason
            </span>
            <p className="text-xs text-gray-800 font-medium leading-relaxed">
              {selectedDecision.rootCause}
            </p>
          </div>
        </div>

        {/* Suggested Action Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-900 text-white shadow-md space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>PRIMARY SUGGESTED ACTION PLAN</span>
          </div>
          <h4 className="text-base sm:text-lg font-extrabold">{selectedDecision.suggestedAction}</h4>
          <p className="text-xs text-emerald-100">{selectedDecision.expectedImprovement}</p>
        </div>

        {/* Impact Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-blue-800 font-bold block">
                Calculated Water Savings
              </span>
              <p className="text-2xl font-black font-mono text-blue-950 mt-0.5">
                {selectedDecision.waterSavedLiters.toLocaleString()} <span className="text-xs font-normal">Liters</span>
              </p>
            </div>
            <Droplets className="w-8 h-8 text-blue-600 opacity-80" />
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-emerald-800 font-bold block">
                Estimated Net Yield & Profit Boost
              </span>
              <p className="text-2xl font-black font-mono text-emerald-950 mt-0.5">
                +{selectedDecision.profitIncreasePct}% <span className="text-xs font-normal">Return</span>
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-600 opacity-80" />
          </div>
        </div>

        {/* Explain Decision Logic Toggle Button */}
        <div className="pt-2 border-t border-emerald-100 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setShowLogic(!showLogic)}
              className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-4 py-2 rounded-2xl text-xs transition-colors"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>{showLogic ? 'Hide Decision Logic Tree' : 'Explain Decision Logic'}</span>
              {showLogic ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setShowAlternative(!showAlternative)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-2xl text-xs transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>{showAlternative ? 'Hide Alternative' : 'View Alternative Solution'}</span>
            </button>
          </div>

          {/* Explainable AI Step-by-Step Logic Tree */}
          {showLogic && (
            <div className="p-5 rounded-2xl bg-emerald-950 text-white font-mono text-xs space-y-3 animate-in fade-in duration-200 border border-emerald-800">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block border-b border-emerald-800 pb-2">
                EXPLAINABLE AI (XAI) INFERENCE LOGIC PIPELINE
              </span>
              <div className="space-y-2">
                {selectedDecision.xaiReasoning.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-emerald-100">
                    <span className="text-emerald-400 font-bold shrink-0">[Step {idx + 1}]</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alternative Solution Card */}
          {showAlternative && (
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2 animate-in fade-in duration-200">
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">
                Traditional Alternative Approach
              </span>
              <p className="text-gray-700">{selectedDecision.alternativeOption}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
