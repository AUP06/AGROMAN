import React, { useState } from 'react';
import { Sliders, Globe, Bell, ShieldCheck, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

interface SettingsProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Settings: React.FC<SettingsProps> = ({ language, setLanguage }) => {
  const [aiSensitivity, setAiSensitivity] = useState(0.85);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="border-b border-emerald-100 pb-4">
        <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
          <Sliders className="w-6 h-6 text-emerald-700" />
          <span>System Settings & Preferences</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Configure language, AI neural confidence thresholds, measurement units, and alert notifications.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-800 uppercase font-mono flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>Platform Language / ഭാഷ / भाषा</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'en' as Language, label: 'English' },
              { id: 'ml' as Language, label: 'മലയാളം' },
              { id: 'hi' as Language, label: 'हिंदी' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`p-3 rounded-2xl text-xs font-bold transition-all border ${
                  language === lang.id
                    ? 'bg-emerald-800 text-white border-emerald-700 shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Sensitivity Slider */}
        <div className="space-y-2 pt-4 border-t border-emerald-100">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-gray-800 uppercase font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Crop Disease Detection Sensitivity Threshold</span>
            </span>
            <span className="font-mono font-bold text-emerald-800">
              {(aiSensitivity * 100).toFixed(0)}% Confidence
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="0.99"
            step="0.01"
            value={aiSensitivity}
            onChange={(e) => setAiSensitivity(parseFloat(e.target.value))}
            className="w-full accent-emerald-700 h-2 bg-emerald-100 rounded-lg cursor-pointer"
          />
          <p className="text-[11px] text-gray-400">
            Higher values reduce false positive disease alerts but require higher camera image clarity.
          </p>
        </div>

        {/* Units Selector */}
        <div className="space-y-2 pt-4 border-t border-emerald-100">
          <label className="text-xs font-bold text-gray-800 uppercase font-mono block">
            Measurement Units Standard
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setUnits('metric')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border ${
                units === 'metric'
                  ? 'bg-emerald-800 text-white border-emerald-700'
                  : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              Metric (°C, meters, Liters)
            </button>
            <button
              onClick={() => setUnits('imperial')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border ${
                units === 'imperial'
                  ? 'bg-emerald-800 text-white border-emerald-700'
                  : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              Imperial (°F, feet, gallons)
            </button>
          </div>
        </div>

        {/* Sound & Notifications Toggles */}
        <div className="space-y-3 pt-4 border-t border-emerald-100 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800">Telemetry Alert Sound Effects</span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 accent-emerald-700"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800">SMS / WhatsApp Farmer Critical Alerts</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-emerald-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
