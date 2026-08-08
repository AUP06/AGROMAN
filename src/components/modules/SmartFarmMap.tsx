import React, { useState } from 'react';
import {
  MapPin,
  Plane,
  Cpu,
  User,
  CloudSun,
  Droplets,
  Layers,
  X,
  Sparkles,
  Maximize2,
} from 'lucide-react';

interface MapMarker {
  id: string;
  name: string;
  type: 'drone' | 'sensor' | 'farmer' | 'weather' | 'pump' | 'field';
  top: string;
  left: string;
  status: string;
  details: string;
}

export const SmartFarmMap: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const markers: MapMarker[] = [
    {
      id: 'MARK-01',
      name: 'AGRO-DRONE Alpha (In Flight)',
      type: 'drone',
      top: '32%',
      left: '42%',
      status: 'Autopilot NDVI Scanning',
      details: 'Altitude: 42.5m • Battery: 88% • Speed: 8.4 m/s • Camera: Multispectral RedEdge-P',
    },
    {
      id: 'MARK-02',
      name: 'ESP32 Soil Node 101',
      type: 'sensor',
      top: '25%',
      left: '25%',
      status: 'Online (Good)',
      details: 'Moisture: 42.8% • Temp: 28.4°C • NPK: 145-48-192 mg/kg • Battery: 94%',
    },
    {
      id: 'MARK-03',
      name: 'ESP32 Soil Node 102',
      type: 'sensor',
      top: '62%',
      left: '68%',
      status: 'Moisture Warning (21.4%)',
      details: 'Moisture: 21.4% • Temp: 31.2°C • NPK: 110-32-160 mg/kg • Trigger Drip Recommended',
    },
    {
      id: 'MARK-04',
      name: 'Team Lead Annamol A Abraham',
      type: 'farmer',
      top: '78%',
      left: '30%',
      status: 'Active on Field',
      details: 'GPS Mobile Sync Active • Equipped with Handheld Soil EC Meter',
    },
    {
      id: 'MARK-05',
      name: 'Microclimate Weather Station',
      type: 'weather',
      top: '18%',
      left: '80%',
      status: 'Live Syncing',
      details: '29.5°C • SW 11 km/h • Humidity: 74% • Solar Irradiance: 840 W/m²',
    },
    {
      id: 'MARK-06',
      name: 'Central Irrigation Pump Station',
      type: 'pump',
      top: '82%',
      left: '75%',
      status: 'Standby / Motor Ready',
      details: '7.5 HP Electric Pump • Solenoid Valves #1 - #4 Connected • Tank Level: 84%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-700" />
            <span>Smart GIS Interactive Farm Map</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time geolocation overlay for drones, soil probes, irrigation valves, and microclimate stations.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200">
          Green Acres Estate Map View
        </span>
      </div>

      {/* MAP VIEWPORT CANVASTAGE */}
      <div className="relative rounded-3xl overflow-hidden bg-emerald-950 h-[360px] sm:h-[460px] lg:h-[540px] border-2 border-emerald-800 shadow-2xl select-none group">
        {/* Background Satellite Map Image */}
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200"
          alt="Farm Satellite Map"
          className="w-full h-full object-cover opacity-80"
        />

        {/* Grid Lines Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* INTERACTIVE MAP MARKERS */}
        {markers.map((marker) => {
          let markerBg = 'bg-emerald-600 text-white';
          let Icon = Cpu;

          if (marker.type === 'drone') {
            markerBg = 'bg-amber-500 text-emerald-950 animate-bounce shadow-lg shadow-amber-500/50';
            Icon = Plane;
          } else if (marker.type === 'farmer') {
            markerBg = 'bg-blue-600 text-white';
            Icon = User;
          } else if (marker.type === 'weather') {
            markerBg = 'bg-purple-600 text-white';
            Icon = CloudSun;
          } else if (marker.type === 'pump') {
            markerBg = 'bg-cyan-600 text-white';
            Icon = Droplets;
          }

          return (
            <button
              key={marker.id}
              onClick={() => setSelectedMarker(marker)}
              className={`absolute p-2.5 rounded-2xl border border-white/40 shadow-xl transition-all hover:scale-125 group/marker ${markerBg}`}
              style={{ top: marker.top, left: marker.left }}
              title={marker.name}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}

        {/* MAP LEGEND */}
        <div className="absolute top-4 left-4 p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] space-y-1.5 font-mono">
          <span className="font-bold text-emerald-300 block border-b border-white/10 pb-1">MAP LAYERS</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Drone Autopilot Position</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>ESP32 Sensor Probes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Farmer Location</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
            <span>Pump Station & Valves</span>
          </div>
        </div>

        {/* POPUP MODAL CARD ON MARKER CLICK */}
        {selectedMarker && (
          <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 bg-white rounded-3xl p-5 shadow-2xl border border-emerald-100 z-20 text-gray-800 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-start justify-between border-b border-emerald-100 pb-2 mb-3">
              <div>
                <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                  {selectedMarker.id}
                </span>
                <h3 className="text-sm font-extrabold text-emerald-950 mt-1">{selectedMarker.name}</h3>
              </div>
              <button
                onClick={() => setSelectedMarker(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-emerald-800">Status: {selectedMarker.status}</p>
              <p className="text-gray-600 leading-relaxed bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                {selectedMarker.details}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
