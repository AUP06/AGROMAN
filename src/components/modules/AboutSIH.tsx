import React from 'react';
import { Info, Award, ShieldCheck, Sparkles, CheckCircle2, Users } from 'lucide-react';
import { TeamMember } from '../../types';

interface AboutSIHProps {
  teamMembers: TeamMember[];
}

export const AboutSIH: React.FC<AboutSIHProps> = ({ teamMembers }) => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-950 text-white shadow-2xl border border-emerald-700/50 space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-300" />
          <span className="text-xs font-mono font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-3 py-1 rounded-full uppercase">
            Smart India Hackathon 2026 Entry
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-green-200">
          AGROMAN — AI & Drone Agri Ecosystem
        </h1>

        <p className="text-sm text-emerald-100/90 leading-relaxed max-w-3xl">
          Designed and developed by <strong>Team AGROMAN</strong> to solve critical agricultural challenges in India: water scarcity, delayed pest outbreak diagnosis, and unoptimized fertilizer overuse.
        </p>
      </div>

      {/* MISSION, VISION, INNOVATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
          <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <span>Our Mission</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Empower Indian farmers with affordable drone aerial multispectral intelligence and IoT automated drip fertigation, increasing yield by 18%+ while saving 35% freshwater.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
          <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Core Innovation</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Transparent Explainable AI (XAI) that does not just give black-box advice, but shows clear causal reasoning, water saving math, and profit return calculations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
          <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>Future Scope</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Integration with PM-KUSUM solar pumps, regional Krishi Vigyan Kendra (KVK) advisory feeds, and autonomous drone fleet charging pad docking stations.
          </p>
        </div>
      </div>

      {/* TEAM MEMBERS FOOTER */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-emerald-950 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-700" />
          <span>Team AGROMAN Roster</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
          {teamMembers.map((m, idx) => (
            <div key={idx} className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <strong className="text-gray-900 block">{m.name}</strong>
              <span className="text-[10px] text-emerald-800 font-semibold">{m.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
