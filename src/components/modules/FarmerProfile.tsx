import React from 'react';
import { Users, MapPin, Star } from 'lucide-react';
import { TeamMember, Language } from '../../types';

interface FarmerProfileProps {
  teamMembers: TeamMember[];
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const FarmerProfile: React.FC<FarmerProfileProps> = ({
  teamMembers,
}) => {
  const leadMember = teamMembers[0];

  return (
    <div className="space-y-8">
      {/* FARMER / TEAM LEAD PROFILE CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-emerald-100 pb-6">
          <div className="flex items-center gap-5">
            {/* Lead Photo */}
            <div className="shrink-0">
              <img
                src={leadMember?.avatar}
                alt="Team Lead Annamol A Abraham (Demo Anna)"
                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-md"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-black text-emerald-950">
                  {leadMember?.name || 'Annamol A Abraham'}
                </h2>
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                  VERIFIED AGRI-INNOVATOR
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Green Acres Estate, Kuttanad, Alappuzha, Kerala</span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>AGROMAN Team Lead</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 px-4 py-2 rounded-2xl">
              Subscription: Pro Agri Enterprise
            </span>
          </div>
        </div>

        {/* Farmer Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Managed Land</span>
            <span className="text-xl font-black font-mono text-emerald-950">160.5 Acres</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Active Crop Cycles</span>
            <span className="text-xl font-black font-mono text-emerald-950">4 Farms</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Drones & IoT Probes</span>
            <span className="text-xl font-black font-mono text-emerald-950">87 Units</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Water Savings Badge</span>
            <span className="text-xl font-black font-mono text-emerald-950">142.5 kL</span>
          </div>
        </div>
      </div>

      {/* TEAM AGROMAN SIH 2026 MEMBERS SHOWCASE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-lg space-y-6">
        <div className="border-b border-emerald-100 pb-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-700" />
              <h3 className="text-2xl font-black text-emerald-950">Team AGROMAN - SIH 2026</h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Smart India Hackathon 2026 Core Development & Hardware Engineering Team
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {teamMembers.map((member, idx) => {
            return (
              <div
                key={idx}
                className="bg-emerald-50/60 p-4 rounded-3xl border border-emerald-100 text-center space-y-3 hover:shadow-xl transition-all hover:-translate-y-1 bg-white flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Member Avatar */}
                  <div className="mx-auto w-20 h-20">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500 shadow-md"
                    />
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-gray-900">{member.name}</h4>
                    <p className="text-[10px] text-emerald-800 font-bold mt-0.5">{member.role}</p>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">{member.college}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-100">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills.slice(0, 2).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[8px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
