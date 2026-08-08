import React, { useState } from 'react';
import { Calendar, Clock, Plane, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { ScheduledMission } from '../../types';
import { SCHEDULED_MISSIONS } from '../../data/mockData';

export const MissionScheduler: React.FC = () => {
  const [missions, setMissions] = useState<ScheduledMission[]>(SCHEDULED_MISSIONS);
  const [activeSlot, setActiveSlot] = useState<'All' | 'Morning' | 'Afternoon' | 'Evening'>('All');

  const filtered = missions.filter(
    (m) => activeSlot === 'All' || m.timeSlot === activeSlot
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-700" />
            <span>Autonomous Flight & Fertigation Mission Scheduler</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Schedule recurring drone multispectral scans and automated valve fertigation timings.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-2xl text-xs transition-colors shadow-xs">
          <Plus className="w-4 h-4" />
          <span>Schedule New Flight</span>
        </button>
      </div>

      {/* TIME SLOT TABS */}
      <div className="flex items-center gap-2">
        {(['All', 'Morning', 'Afternoon', 'Evening'] as const).map((slot) => (
          <button
            key={slot}
            onClick={() => setActiveSlot(slot)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
              activeSlot === slot
                ? 'bg-emerald-800 text-white border-emerald-700'
                : 'bg-white text-gray-700 border-emerald-100 hover:bg-emerald-50'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* MISSIONS FEED */}
      <div className="space-y-3">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl shrink-0">
                <Plane className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {m.id}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-gray-400">
                    {m.timeSlot} • {m.time}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 mt-1">{m.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Farm: {m.farmName} • Drone: {m.droneName}
                </p>
              </div>
            </div>

            <span
              className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                m.status === 'Completed'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : m.status === 'In Progress'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
