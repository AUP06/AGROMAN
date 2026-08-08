import React from 'react';
import {
  Plane,
  Sprout,
  Play,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BrainCircuit,
  Droplets,
  BarChart3,
  Award,
  Sparkles,
  CheckCircle2,
  Users,
  Layers,
  CloudSun,
  FileText,
  Zap,
} from 'lucide-react';
import { ActiveTab, TeamMember } from '../../types';

interface LandingPageProps {
  setActiveTab: (tab: ActiveTab) => void;
  teamMembers: TeamMember[];
  onOpenPitchModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setActiveTab,
  teamMembers,
  onOpenPitchModal,
}) => {
  return (
    <div className="space-y-12 pb-12">
      {/* HERO SECTION - AUTONOMOUS PRECISION ECOSYSTEM */}
      <section className="relative rounded-[32px] overflow-hidden bg-slate-950 text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-emerald-800/40 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between select-none">
        {/* Animated Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity scale-105 hover:scale-100 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-emerald-200 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
            <Award className="w-4 h-4 text-[#8CE854]" />
            <span>AI-Powered Autonomous Precision Agriculture Ecosystem</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8CE854] animate-ping shrink-0" />
          </div>

          {/* New Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white font-sans">
            Welcome to <span className="text-[#8CE854]">Agroman</span>
            <br />
            <span className="text-2xl sm:text-4xl text-emerald-100 font-extrabold">
              Autonomous Precision Farming
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-emerald-100/90 font-medium leading-relaxed max-w-2xl">
            Monitor crops, detect problems early, and make intelligent farming decisions using AI, drones, and precision analytics.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('digital_twin')}
              className="flex items-center justify-center gap-2.5 bg-[#8CE854] hover:bg-[#78d641] text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-sm sm:text-base"
            >
              <span>Explore Digital Farm Twin</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            <button
              onClick={onOpenPitchModal}
              className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-4 rounded-2xl border border-white/30 backdrop-blur-md transition-all text-sm sm:text-base"
            >
              <Play className="w-4 h-4 text-[#8CE854] fill-[#8CE854]" />
              <span>Watch Pitch Video</span>
            </button>
          </div>
        </div>

        {/* HERO WIDGETS ROW: Live Drone Status, Health Score, AI Rec, Weather, Today's Report */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-5 gap-3 mt-8 pt-4 border-t border-white/10 font-mono text-xs">
          {/* Live Drone Mission */}
          <div
            onClick={() => setActiveTab('drone')}
            className="p-3 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md hover:border-[#8CE854] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 text-[#8CE854] text-[10px] font-bold">
              <Plane className="w-3.5 h-3.5 animate-pulse" />
              <span>DRONE MISSION</span>
            </div>
            <p className="font-extrabold text-white mt-1 text-xs truncate">Zone B Patrol</p>
            <p className="text-[10px] text-emerald-300">Autopilot Active</p>
          </div>

          {/* Farm Health Score */}
          <div
            onClick={() => setActiveTab('digital_twin')}
            className="p-3 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md hover:border-[#8CE854] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>HEALTH SCORE</span>
            </div>
            <p className="font-black text-[#8CE854] mt-1 text-sm">94.2% Optimal</p>
            <p className="text-[10px] text-gray-300">4 Zones Synced</p>
          </div>

          {/* AI Recommendation */}
          <div
            onClick={() => setActiveTab('nitrogen')}
            className="p-3 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md hover:border-[#8CE854] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>AI RECOMMEND</span>
            </div>
            <p className="font-extrabold text-white mt-1 text-xs truncate">Spot Spray Zone B</p>
            <p className="text-[10px] text-amber-300">37 m² Hotspot</p>
          </div>

          {/* Weather Intelligence */}
          <div
            onClick={() => setActiveTab('weather')}
            className="p-3 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md hover:border-[#8CE854] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 text-sky-400 text-[10px] font-bold">
              <CloudSun className="w-3.5 h-3.5" />
              <span>WEATHER INTEL</span>
            </div>
            <p className="font-extrabold text-white mt-1 text-xs">28°C • 68% Hum</p>
            <p className="text-[10px] text-sky-300">Flight Window 4 PM</p>
          </div>

          {/* Today's Farm Report */}
          <div
            onClick={() => setActiveTab('reports')}
            className="p-3 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md hover:border-[#8CE854] cursor-pointer transition-all col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-2 text-emerald-300 text-[10px] font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>TODAY'S REPORT</span>
            </div>
            <p className="font-extrabold text-white mt-1 text-xs truncate">SIH 2026 Audit</p>
            <p className="text-[10px] text-[#8CE854]">Ready for Export</p>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM PILLARS GRID */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            COMPLETE AI ECOSYSTEM
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Autonomous Drone + Computer Vision + Cloud AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Unified precision farming platform developed for Smart India Hackathon 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Digital Farm Twin',
              desc: '3D spatial GIS mapping with zone-by-zone health scores, nitrogen stress indices, water requirements, and live drone orthomosaics.',
              action: 'Open Digital Twin',
              tab: 'digital_twin' as ActiveTab,
              icon: Layers,
            },
            {
              title: 'Precision Spot Spraying',
              desc: 'Zero-waste targeted pesticide spraying. Drones spray only affected 37 m² hotspots, saving 78% chemical cost and protecting soil.',
              action: 'View Precision Spraying',
              tab: 'precision_spraying' as ActiveTab,
              icon: Zap,
            },
            {
              title: 'Wildlife & Thermal Patrol',
              desc: 'Thermal night-patrol drones detect wild boars, elephants, and fire risks in real time, preventing crop damage and alerting farmers.',
              action: 'Open Thermal Patrol',
              tab: 'wildlife' as ActiveTab,
              icon: ShieldCheck,
            },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-md rounded-[24px] p-6 border border-emerald-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-4 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>

                <button
                  onClick={() => setActiveTab(card.tab)}
                  className="mt-6 w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-800 hover:text-white text-emerald-900 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>{card.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* TEAM SHOWCASE */}
      <section className="bg-white/80 backdrop-blur-md p-8 rounded-[28px] border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              <h3 className="text-xl font-extrabold text-slate-900">Team AGROMAN</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Precision Agriculture Innovation Team
            </p>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
          >
            View Full Team Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-center hover:bg-white hover:shadow-md transition-all"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-emerald-500 shadow-sm mb-2"
              />
              <h4 className="text-xs font-extrabold text-slate-900 truncate">{member.name}</h4>
              <p className="text-[10px] text-emerald-800 font-semibold mt-0.5 truncate">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

