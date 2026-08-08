import React from 'react';
import {
  Workflow,
  Plane,
  Cpu,
  Database,
  BrainCircuit,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const SystemWorkflow: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Multispectral Drone & IoT Data Capture',
      desc: 'DJI Drones perform aerial NDVI scans while ESP32 soil nodes measure moisture, NPK, and temperature.',
      icon: Plane,
    },
    {
      step: '02',
      title: 'MQTT / Cellular Cloud Ingestion',
      desc: 'Telemetry packets are pushed via lightweight MQTT protocol to Firebase Realtime Engine.',
      icon: Database,
    },
    {
      step: '03',
      title: 'TensorFlow AI Feature Extraction',
      desc: 'CNN models process images to detect leaf pathogens, weed clusters, and nitrogen deficiency.',
      icon: BrainCircuit,
    },
    {
      step: '04',
      title: 'Explainable AI Recommendation Engine',
      desc: 'Generates step-by-step fertigation plans, water saving calculations, and profit boost forecasts.',
      icon: CheckCircle2,
    },
    {
      step: '05',
      title: 'Farmer Dashboard & Solenoid Control',
      desc: 'Displays actionable insights on web/mobile app and automatically triggers drip irrigation valves.',
      icon: Workflow,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Workflow className="w-6 h-6 text-emerald-700" />
            <span>AGROMAN End-to-End System Workflow</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Data pipeline from edge IoT sensors & drone vision to automated solenoid valve actuation.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200">
          5-Stage Automated Pipeline
        </span>
      </div>

      {/* WORKFLOW PIPELINE FLOW */}
      <div className="space-y-4">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-green-900 text-white flex items-center justify-center font-black font-mono text-base shrink-0 shadow-md">
                  {item.step}
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block text-emerald-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
