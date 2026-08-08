import React from 'react';
import { Award, ShieldCheck, X, Sparkles, CheckCircle2, Users, ArrowRight } from 'lucide-react';
import { TeamMember } from '../../types';

interface PitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamMembers: TeamMember[];
}

export const PitchModal: React.FC<PitchModalProps> = ({ isOpen, onClose, teamMembers }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-700/80 rounded-2xl border border-emerald-500">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold bg-amber-400 text-emerald-950 px-2 py-0.5 rounded uppercase">
                SIH 2026 INTERNAL SELECTION PITCH
              </span>
              <h3 className="text-xl font-black mt-1">AGROMAN — Pitch Presentation Deck</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-gray-800">
          {/* Problem Statement & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block">
                The Problem Statement
              </span>
              <h4 className="font-bold text-sm text-gray-900">Unoptimized Water & Chemical Overuse</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Traditional flood irrigation wastes up to 60% freshwater. Farmers suffer crop losses from undetected leaf pathogens due to late diagnosis and broad chemical broadcasting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 block">
                Our AGROMAN Solution
              </span>
              <h4 className="font-bold text-sm text-gray-900">AI + Drone + ESP32 Precision Ecosystem</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Autonomous multispectral drone imagery flags early pathogens, while ESP32 soil probes trigger smart drip solenoid valves — cutting water waste by 35% and boosting net profit by 18%+.
              </p>
            </div>
          </div>

          {/* Key Differentiators */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider font-mono text-emerald-950">
              Why AGROMAN Stands Out (SIH 2026 Innovation)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <strong className="text-emerald-900 block font-bold">1. Explainable AI (XAI)</strong>
                <p className="text-gray-600 text-[11px]">
                  Provides full step-by-step reasoning logic and financial ROI calculations instead of black-box predictions.
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <strong className="text-emerald-900 block font-bold">2. Sub-surface Drip Valve Loop</strong>
                <p className="text-gray-600 text-[11px]">
                  Direct hardware-to-cloud integration automatically triggers irrigation valves based on sensor thresholds.
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <strong className="text-emerald-900 block font-bold">3. Multilingual Voice Guidance</strong>
                <p className="text-gray-600 text-[11px]">
                  Supports Malayalam, Hindi, and English with voice audio synthesis for local farmer accessibility.
                </p>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-3 pt-4 border-t border-emerald-100">
            <h4 className="text-xs font-extrabold uppercase tracking-wider font-mono text-emerald-950">
              Developed by Team AGROMAN
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
              {teamMembers.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <strong className="text-gray-900 block font-bold">{m.name}</strong>
                  <span className="text-[10px] text-emerald-800 font-medium">{m.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
