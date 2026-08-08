import React, { useState } from 'react';
import {
  Sprout,
  MapPin,
  Maximize2,
  Activity,
  BrainCircuit,
  Droplets,
  Calendar,
  X,
  Plane,
  Cpu,
  BarChart2,
  Sparkles,
} from 'lucide-react';
import { Farm } from '../../types';

interface FarmManagementProps {
  farms: Farm[];
}

export const FarmManagement: React.FC<FarmManagementProps> = ({ farms }) => {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Sprout className="w-6 h-6 text-emerald-700" />
            <span>Farm Management & Health Directory</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time multispectral health analytics across 4 primary demo estates in Kerala, Karnataka, and Punjab.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200">
            Total Monitored Area: 160.5 Acres
          </span>
        </div>
      </div>

      {/* FARM CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6">
        {farms.map((farm) => (
          <div
            key={farm.id}
            onClick={() => setSelectedFarm(farm)}
            className="bg-white rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            {/* Image Header with Health Overlay */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={farm.image}
                alt={farm.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Status Tags */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-emerald-800/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {farm.id}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-emerald-900 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {farm.state}
                </span>
              </div>

              {/* Health Score Pill */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-lg flex items-center gap-2">
                <div className="text-right">
                  <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block">
                    Health Score
                  </span>
                  <span className="text-sm font-black font-mono text-emerald-800">
                    {farm.healthScore}/100
                  </span>
                </div>
              </div>

              {/* Farm Title & Location on Image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-lg font-bold group-hover:text-emerald-300 transition-colors">
                  {farm.name}
                </h3>
                <p className="text-xs text-emerald-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{farm.location}</span>
                </p>
              </div>
            </div>

            {/* Farm Details Grid */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] text-gray-400 font-medium block">Cultivated Crop</span>
                  <span className="font-bold text-gray-800">{farm.crop}</span>
                </div>

                <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] text-gray-400 font-medium block">Total Area</span>
                  <span className="font-bold text-gray-800">{farm.area}</span>
                </div>

                <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] text-gray-400 font-medium block">Soil Profile</span>
                  <span className="font-bold text-gray-800">{farm.soilType}</span>
                </div>

                <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] text-gray-400 font-medium block">Water Status</span>
                  <span
                    className={`font-bold ${
                      farm.waterStatus === 'Optimal'
                        ? 'text-emerald-700'
                        : farm.waterStatus === 'Deficient'
                        ? 'text-amber-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {farm.waterStatus}
                  </span>
                </div>
              </div>

              {/* AI Score & Inspection Footer */}
              <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-emerald-700" />
                  <span className="text-gray-500 font-medium">AI Confidence Score:</span>
                  <strong className="text-emerald-900 font-mono font-bold">{farm.aiScore}%</strong>
                </div>

                <button className="flex items-center gap-1 text-emerald-800 font-bold hover:underline">
                  <span>Inspection Specs</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FARM DETAIL MODAL */}
      {selectedFarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-emerald-950/70 backdrop-blur-md"
            onClick={() => setSelectedFarm(null)}
          />

          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Image Banner */}
            <div className="relative h-44 overflow-hidden shrink-0">
              <img
                src={selectedFarm.image}
                alt={selectedFarm.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedFarm(null)}
                className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] font-mono font-bold bg-emerald-500 text-emerald-950 px-2 py-0.5 rounded-md">
                  {selectedFarm.id}
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedFarm.name}</h3>
                <p className="text-xs text-emerald-200 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {selectedFarm.location}, {selectedFarm.state}
                  </span>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Key Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-emerald-50 p-3 rounded-2xl text-center border border-emerald-100">
                  <Activity className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-mono block">Health Index</span>
                  <span className="text-lg font-black text-emerald-900 font-mono">
                    {selectedFarm.healthScore}/100
                  </span>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl text-center border border-emerald-100">
                  <Cpu className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-mono block">IoT Probes</span>
                  <span className="text-lg font-black text-emerald-900 font-mono">
                    {selectedFarm.sensorsCount} Nodes
                  </span>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl text-center border border-emerald-100">
                  <Plane className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-mono block">Drones Fleet</span>
                  <span className="text-lg font-black text-emerald-900 font-mono">
                    {selectedFarm.dronesAssigned} Units
                  </span>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl text-center border border-emerald-100">
                  <BarChart2 className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-mono block">Yield Forecast</span>
                  <span className="text-xs font-bold text-emerald-900">{selectedFarm.yieldForecast}</span>
                </div>
              </div>

              {/* Detailed Specs List */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider font-mono">
                  Full Agronomic Specifications
                </h4>

                <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs border border-emerald-100">
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Soil Type & Profile:</span>
                    <strong className="text-gray-800">{selectedFarm.soilType}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Cultivated Area:</span>
                    <strong className="text-gray-800">{selectedFarm.area}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Water & Irrigation Balance:</span>
                    <strong className="text-emerald-700">{selectedFarm.waterStatus}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">GPS Coordinates:</span>
                    <strong className="font-mono text-gray-800">
                      {selectedFarm.latitude}° N, {selectedFarm.longitude}° E
                    </strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Last Inspection Stream:</span>
                    <strong className="text-gray-800">{selectedFarm.lastInspection}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
