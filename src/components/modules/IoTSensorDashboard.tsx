import React, { useState, useEffect } from 'react';
import {
  Cpu,
  RefreshCw,
  Zap,
  Battery,
  Wifi,
  Droplets,
  Thermometer,
  Wind,
  FlaskConical,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { IoTSensor } from '../../types';

interface IoTSensorDashboardProps {
  sensors: IoTSensor[];
}

export const IoTSensorDashboard: React.FC<IoTSensorDashboardProps> = ({ sensors: initialSensors }) => {
  const [sensorList, setSensorList] = useState<IoTSensor[]>(initialSensors);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Telemetry simulation loop every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorList((prev) =>
        prev.map((s) => ({
          ...s,
          soilMoisture: Math.max(12, Math.min(65, +(s.soilMoisture + (Math.random() * 1.6 - 0.8)).toFixed(1))),
          temperature: Math.max(18, Math.min(40, +(s.temperature + (Math.random() * 0.4 - 0.2)).toFixed(1))),
          humidity: Math.max(40, Math.min(95, +(s.humidity + (Math.random() * 1.2 - 0.6)).toFixed(1))),
          nitrogen: Math.max(80, Math.min(220, Math.round(s.nitrogen + (Math.random() * 4 - 2)))),
        }))
      );
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-700" />
            <span>ESP32 IoT Sensor Telemetry Network</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time NPK nutrients, soil moisture, microclimate, and RF signal telemetry streams.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-2xl border border-emerald-200 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-900 font-bold">MQTT Live Sync:</span>
          <span className="text-emerald-700">{lastSyncTime}</span>
        </div>
      </div>

      {/* SENSOR CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorList.map((sensor) => (
          <div
            key={sensor.id}
            className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-xl transition-all space-y-4 relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between border-b border-emerald-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {sensor.id}
                </span>
                <h3 className="text-sm font-extrabold text-gray-900 mt-1">{sensor.name}</h3>
                <p className="text-[11px] text-gray-500">{sensor.zone}</p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    sensor.status === 'Online'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {sensor.status}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mt-1">
                  <span className="flex items-center gap-0.5">
                    <Wifi className="w-3 h-3 text-emerald-600" />
                    {sensor.signal} dBm
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Battery className="w-3 h-3 text-amber-500" />
                    {sensor.battery}%
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-bold uppercase mb-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                  <span>Soil Moisture</span>
                </div>
                <p className="text-xl font-black font-mono text-emerald-950">
                  {sensor.soilMoisture}%
                </p>
              </div>

              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-bold uppercase mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                  <span>Temperature</span>
                </div>
                <p className="text-xl font-black font-mono text-emerald-950">
                  {sensor.temperature}°C
                </p>
              </div>

              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-bold uppercase mb-1">
                  <Wind className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Humidity</span>
                </div>
                <p className="text-xl font-black font-mono text-emerald-950">{sensor.humidity}%</p>
              </div>

              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-bold uppercase mb-1">
                  <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                  <span>pH Level</span>
                </div>
                <p className="text-xl font-black font-mono text-emerald-950">{sensor.ph}</p>
              </div>
            </div>

            {/* Macro Nutrients N-P-K Bar */}
            <div className="p-3 bg-gray-50 rounded-2xl border border-emerald-100 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-gray-500 block">
                NPK Soil Macro-Nutrients (mg/kg)
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded-xl border border-gray-200">
                  <span className="text-[9px] text-gray-400 font-bold block">NITROGEN (N)</span>
                  <strong className="text-emerald-900 font-mono">{sensor.nitrogen}</strong>
                </div>
                <div className="bg-white p-2 rounded-xl border border-gray-200">
                  <span className="text-[9px] text-gray-400 font-bold block">PHOSPHORUS (P)</span>
                  <strong className="text-emerald-900 font-mono">{sensor.phosphorus}</strong>
                </div>
                <div className="bg-white p-2 rounded-xl border border-gray-200">
                  <span className="text-[9px] text-gray-400 font-bold block">POTASSIUM (K)</span>
                  <strong className="text-emerald-900 font-mono">{sensor.potassium}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
