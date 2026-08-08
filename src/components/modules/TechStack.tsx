import React from 'react';
import {
  Layers,
  Plane,
  Cpu,
  BrainCircuit,
  Database,
  Globe,
  Radio,
  Code,
  Sparkles,
} from 'lucide-react';

export const TechStack: React.FC = () => {
  const stackItems = [
    {
      title: 'Autonomous DJI & Pixhawk Drones',
      desc: 'Multispectral RedEdge-P and Thermal cameras running RTK GPS positioning for sub-centimeter field mapping.',
      icon: Plane,
      badge: 'Hardware',
    },
    {
      title: 'ESP32 Microcontrollers',
      desc: 'Low-power 32-bit dual-core Wi-Fi & Bluetooth microcontrollers interfacing with soil NPK and moisture probes.',
      icon: Cpu,
      badge: 'Hardware',
    },
    {
      title: 'TensorFlow & OpenCV Vision AI',
      desc: 'Custom Convolutional Neural Networks (CNN) for real-time leaf disease detection and NDVI spectral index calculations.',
      icon: BrainCircuit,
      badge: 'AI Engine',
    },
    {
      title: 'Firebase & Cloud Storage Engine',
      desc: 'Real-time telemetry synchronization, secure user authentication, and high-performance cloud data pipelines.',
      icon: Database,
      badge: 'Cloud Platform',
    },
    {
      title: 'Google Maps GIS Platform',
      desc: 'Custom vector overlays for high-resolution satellite field boundaries, heatmaps, and spatial marker tracking.',
      icon: Globe,
      badge: 'GIS Mapping',
    },
    {
      title: 'MQTT & REST Protocol Layer',
      desc: 'Ultra-lightweight publish-subscribe telemetry streaming for low-bandwidth rural farm connections.',
      icon: Radio,
      badge: 'Protocols',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-700" />
            <span>AGROMAN Hardware & Software Tech Architecture</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Production-ready technology stack engineered for Smart India Hackathon 2026.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200">
          SIH 2026 Ready Stack
        </span>
      </div>

      {/* TECH CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stackItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-xl transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-md">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
