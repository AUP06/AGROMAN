import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Plane,
  Sprout,
  Cpu,
  ScanLine,
  BrainCircuit,
  Droplets,
  Bug,
  CloudSun,
  FileSpreadsheet,
  Workflow,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 'dashboard' as ActiveTab, title: 'NASA Mission Control Dashboard', category: 'Control', icon: BrainCircuit },
    { id: 'drone' as ActiveTab, title: 'DJI Drone Telemetry & Flight Pilot', category: 'Hardware', icon: Plane },
    { id: 'live_camera' as ActiveTab, title: 'Live Drone Camera HUD & AI Object Detection', category: 'Hardware', icon: ScanLine },
    { id: 'iot' as ActiveTab, title: 'ESP32 Soil & Weather Sensor Network', category: 'Hardware', icon: Cpu },
    { id: 'scanner' as ActiveTab, title: 'AI Disease & Pest Crop Scanner', category: 'AI Tools', icon: ScanLine },
    { id: 'decision' as ActiveTab, title: 'Explainable AI (XAI) Decision Engine', category: 'AI Tools', icon: BrainCircuit },
    { id: 'irrigation' as ActiveTab, title: 'Automated Smart Drip & Valve Irrigation', category: 'Water Management', icon: Droplets },
    { id: 'pest' as ActiveTab, title: 'Pest Risk Radar & Outbreak Predictor', category: 'AI Tools', icon: Bug },
    { id: 'weather' as ActiveTab, title: 'Microclimate Weather & Flight Windows', category: 'Environment', icon: CloudSun },
    { id: 'farms' as ActiveTab, title: 'Farm Management & Health Ratings', category: 'Management', icon: Sprout },
    { id: 'reports' as ActiveTab, title: 'SIH 2026 PDF & Excel Audit Reports', category: 'Export', icon: FileSpreadsheet },
    { id: 'workflow' as ActiveTab, title: 'Hardware-to-AI System Data Pipeline', category: 'Architecture', icon: Workflow },
    { id: 'tech_stack' as ActiveTab, title: 'OpenCV, TensorFlow & ESP32 Tech Stack', category: 'Architecture', icon: Layers },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-emerald-100 flex items-center gap-3 bg-emerald-50/50">
          <Search className="w-5 h-5 text-emerald-700" />
          <input
            type="text"
            placeholder="Type a command or search feature (e.g. 'Drone', 'Irrigation', 'Pest')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-emerald-100/80 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-xs">
              No matching commands or tools found.
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd.id)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-emerald-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100/80 text-emerald-800 rounded-xl group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 group-hover:text-emerald-900">
                        {cmd.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">{cmd.category}</p>
                    </div>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-gray-50 border-t border-emerald-100 text-[10px] text-gray-400 flex items-center justify-between px-4 font-mono">
          <span>AGROMAN SIH 2026 Search Palette</span>
          <div className="flex items-center gap-2">
            <span>Press <kbd className="bg-white border px-1 rounded">ESC</kbd> to exit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
