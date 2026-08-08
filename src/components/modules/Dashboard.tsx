import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Plane,
  Cpu,
  BrainCircuit,
  BatteryCharging,
  CloudCheck,
  AlertTriangle,
  CloudSun,
  Droplets,
  Activity,
  Zap,
  RotateCcw,
  RefreshCw,
  Bell,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Wind,
  Thermometer,
  Sun,
  Eye,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts';
import { Farm, DroneTelemetry, IoTSensor, ActiveTab } from '../../types';
import {
  CircularMoistureGauge,
  SemiCircleHealthGauge,
  SoilNutrientBar,
  WaterEfficiencyBars,
} from '../common/AgromanGauges';

interface DashboardProps {
  farms: Farm[];
  drones: DroneTelemetry[];
  sensors: IoTSensor[];
  setActiveTab: (tab: ActiveTab) => void;
  onTriggerIrrigation: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  farms,
  drones,
  sensors,
  setActiveTab,
  onTriggerIrrigation,
}) => {
  const [liveMoistureTrend, setLiveMoistureTrend] = useState([
    { time: '06:00', moisture: 38, temp: 24, humidity: 82, water: 420 },
    { time: '08:00', moisture: 35, temp: 26, humidity: 78, water: 380 },
    { time: '10:00', moisture: 30, temp: 29, humidity: 71, water: 310 },
    { time: '12:00', moisture: 24, temp: 32, humidity: 62, water: 250 },
    { time: '14:00', moisture: 21, temp: 31, humidity: 65, water: 290 },
    { time: '16:00', moisture: 28, temp: 29, humidity: 70, water: 340 },
    { time: '18:00', moisture: 34, temp: 27, humidity: 75, water: 410 },
  ]);

  const yieldData = [
    { week: 'Wk 1', yieldPaddy: 18.2, yieldTea: 10.4, yieldCoffee: 22.1 },
    { week: 'Wk 2', yieldPaddy: 19.8, yieldTea: 11.2, yieldCoffee: 24.5 },
    { week: 'Wk 3', yieldPaddy: 21.4, yieldTea: 12.8, yieldCoffee: 27.0 },
    { week: 'Wk 4', yieldPaddy: 24.2, yieldTea: 14.8, yieldCoffee: 31.5 },
  ];

  const diseaseTrend = [
    { month: 'Jan', blastIndex: 12, blightIndex: 8 },
    { month: 'Feb', blastIndex: 18, blightIndex: 11 },
    { month: 'Mar', blastIndex: 9, blightIndex: 5 },
    { month: 'Apr', blastIndex: 4, blightIndex: 2 },
  ];

  // Auto update simulated telemetry values every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMoistureTrend((prev) =>
        prev.map((item) => ({
          ...item,
          moisture: Math.max(18, Math.min(50, item.moisture + (Math.random() * 2 - 1))),
          temp: Math.max(20, Math.min(38, item.temp + (Math.random() * 0.4 - 0.2))),
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* TOP NATURE PHOTOGRAPHY HERO HEADER (MATCHING REFERENCE UI) */}
      <div className="relative rounded-[28px] overflow-hidden bg-emerald-950 text-white shadow-xl border border-emerald-800/40 min-h-[260px] flex flex-col justify-between p-6 sm:p-8">
        {/* Lush Farm Photo Background with Soft Blur Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105 transform hover:scale-100 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent" />

        {/* Top Greeting & Location Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
              alt="Anna Avatar"
              className="w-12 h-12 rounded-full border-2 border-emerald-400/80 shadow-md object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Hi, Good Morning Anna
                </h2>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono">
                  PRO AGRONOMIST
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 flex items-center gap-1 mt-0.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kuttanad, Kerala • Sawojajar, Jawa Timur</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerIrrigation}
              className="flex items-center gap-2 bg-[#8CE854] hover:bg-[#78d641] text-slate-950 font-extrabold px-4 py-2.5 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs"
            >
              <Droplets className="w-4 h-4 fill-slate-950" />
              <span>Trigger Drip Irrigation</span>
            </button>
            <button
              onClick={() => setActiveTab('drone')}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-2.5 rounded-2xl border border-white/30 backdrop-blur-md transition-all text-xs"
            >
              <Plane className="w-4 h-4 text-emerald-300" />
              <span>Drone Pilot HUD</span>
            </button>
          </div>
        </div>

        {/* Temperature & Weather Pill Widgets (Inspiration Image Style) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-end pt-6">
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black tracking-tighter text-white font-sans">
                26°C
              </span>
              <div>
                <span className="text-sm font-extrabold text-emerald-200 flex items-center gap-1">
                  <Sun className="w-4 h-4 text-amber-300" /> Sunny Day
                </span>
                <span className="text-xs text-emerald-300/70 block">8:45 AM | Live Telemetry</span>
              </div>
            </div>

            {/* Frosted Glass Telemetry Widgets */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-bold text-white">
                <Wind className="w-4 h-4 text-emerald-300" />
                <span>Wind 5 km/h</span>
              </div>
              <div className="bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-bold text-white">
                <Thermometer className="w-4 h-4 text-amber-300" />
                <span>Temp +12°C</span>
              </div>
              <div className="bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-bold text-white">
                <Droplets className="w-4 h-4 text-blue-300" />
                <span>Humidity 42.5%</span>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-xl border border-white/20 p-4 rounded-[22px] text-xs space-y-2">
            <div className="flex items-center justify-between text-emerald-200 font-mono font-bold text-[11px]">
              <span>AGROMAN MISSION CONTROL</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-emerald-100/90 leading-relaxed text-[11px]">
              4 Active Farms • 84 ESP32 IoT Nodes • 3 Drones on Autopilot • Real-time AI Disease Sentinel active.
            </p>
          </div>
        </div>
      </div>

      {/* INSPIRATION UI FEATURED WIDGETS ROW: Moisture Gauge + Crop Health Gauge + NPK Soil Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CircularMoistureGauge
          percentage={75}
          label="Moisture Level"
          sublabel="Optimal Range (35-80%)"
        />
        <SemiCircleHealthGauge
          score={85}
          maxScore={100}
          title="Crop Health Score"
          statusText="NDVI Index 0.88 - Optimal"
        />
        <WaterEfficiencyBars efficiencyPct={75} />
        <SoilNutrientBar nitrogen="High" phosphorus="Optimal" potassium="Low" ph={6.5} />
      </div>

      {/* 9 NASA CONTROL METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3">
        {[
          { label: 'Active Farms', value: '4 / 4', sub: '160.5 Acres', icon: Sprout, color: 'text-emerald-700' },
          { label: 'Connected IoT', value: '84 Nodes', sub: '99.8% Online', icon: Cpu, color: 'text-green-700' },
          { label: 'Drone Status', value: '2 Flying', sub: '1 Charging', icon: Plane, color: 'text-emerald-800' },
          { label: 'Crop Health', value: '94 / 100', sub: 'NDVI High', icon: Activity, color: 'text-emerald-700' },
          { label: 'Fleet Battery', value: '88%', sub: 'Avg Charge', icon: BatteryCharging, color: 'text-amber-600' },
          { label: 'Cloud Sync', value: 'Synced', sub: '0.2s Latency', icon: CloudCheck, color: 'text-blue-600' },
          { label: 'Active Alerts', value: '2 Flags', sub: '1 Moisture, 1 Disease', icon: AlertTriangle, color: 'text-red-500' },
          { label: 'Weather', value: '29.5°C', sub: 'SW 11 km/h', icon: CloudSun, color: 'text-amber-500' },
          { label: 'Water Usage', value: '18.4 kL', sub: '35% Saved', icon: Droplets, color: 'text-blue-700' },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-md p-3.5 rounded-[20px] border border-emerald-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${card.color}`} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-mono font-bold truncate">
                {card.label}
              </p>
              <h4 className="text-base font-extrabold text-slate-900 font-mono tracking-tight mt-0.5">
                {card.value}
              </h4>
              <p className="text-[9px] text-emerald-700/80 font-medium truncate mt-0.5">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* SMART FARM MAP SNIPPET CARD (INSPIRATION MATCH) */}
      <div className="relative rounded-[24px] overflow-hidden bg-slate-900 border border-emerald-200/50 shadow-md min-h-[220px] p-6 flex flex-col justify-between">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-base font-extrabold text-white">Smart Farm GIS Sector Map</h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-400/30">
              NDVI Live Heatmap
            </span>
          </div>

          <button
            onClick={() => setActiveTab('map')}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1.5 rounded-xl backdrop-blur-md text-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-300" />
            <span>See Full Map</span>
          </button>
        </div>

        {/* Floating Farm Telemetry Markers */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl my-4">
          <div className="bg-black/50 backdrop-blur-md border border-emerald-400/40 p-3 rounded-2xl flex items-center justify-between text-white">
            <div>
              <span className="text-[10px] text-emerald-300 font-bold block">Paddy Block 2A</span>
              <span className="text-xs font-extrabold">Soil Moisture: 72%</span>
            </div>
            <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
              OPTIMAL
            </span>
          </div>

          <div className="bg-black/50 backdrop-blur-md border border-emerald-400/40 p-3 rounded-2xl flex items-center justify-between text-white">
            <div>
              <span className="text-[10px] text-emerald-300 font-bold block">Tea Estate Sector 4</span>
              <span className="text-xs font-extrabold">Crop Health: 85/100</span>
            </div>
            <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
              GOOD
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Soil Moisture & Temp Chart */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-700" />
                <span>Real-Time Soil Moisture & Temperature Dynamics</span>
              </h3>
              <p className="text-xs text-slate-500">Live telemetry stream from ESP32 Node 101 & 102</p>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full font-mono font-bold">
              UPDATED LIVE
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={liveMoistureTrend}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#064E3B', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="moisture"
                  name="Soil Moisture (%)"
                  stroke="#2E7D32"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorMoisture)"
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  name="Temperature (°C)"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Yield & Disease Trend Stack */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-emerald-100 shadow-sm space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>Weekly Yield Forecast (Tons)</span>
              <span className="text-[10px] text-emerald-700 font-mono">+18% vs Avg</span>
            </h3>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldData}>
                  <XAxis dataKey="week" stroke="#9CA3AF" fontSize={10} />
                  <YAxis stroke="#9CA3AF" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#064E3B', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                  <Bar dataKey="yieldPaddy" name="Paddy" fill="#2E7D32" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="yieldTea" name="Tea" fill="#66BB6A" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="yieldCoffee" name="Coffee" fill="#A5D6A7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-emerald-100 shadow-sm space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>Crop Disease Risk Trend Index</span>
              <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">
                Low Outbreak Risk
              </span>
            </h3>

            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={diseaseTrend}>
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} />
                  <YAxis stroke="#9CA3AF" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#064E3B', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="blastIndex" name="Rice Blast" stroke="#EF4444" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="blightIndex" name="Tea Blight" stroke="#F59E0B" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: RECENT ACTIVITIES & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Telemetry Activities */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-700" />
              <span>Mission Control Activity Feed</span>
            </h3>
            <button
              onClick={() => setActiveTab('notifications')}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              View All Notifications
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                time: '10 min ago',
                title: 'Low Soil Moisture Alert - Paddy Block 2',
                desc: 'Moisture reached 21.4%. AI Decision Engine generated precision drip schedule.',
                tag: 'WARNING',
                tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
              },
              {
                time: '32 min ago',
                title: 'Multispectral Scan Complete - Tea Estate',
                desc: 'AGRO-DRONE Beta mapped 42 acres. Early Blister Blight identified in Sector 4.',
                tag: 'AI SCAN',
                tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
              },
              {
                time: '1 hour ago',
                title: 'Automated Drip Irrigation Completed',
                desc: '12,400 Liters delivered to Green Acres. Restored soil moisture to 42.8%.',
                tag: 'SUCCESS',
                tagColor: 'bg-green-100 text-green-900 border-green-300',
              },
            ].map((act, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 flex items-start justify-between gap-3 hover:bg-emerald-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-gray-900">{act.title}</h4>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${act.tagColor}`}
                    >
                      {act.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{act.desc}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-mono shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Matrix */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-emerald-100 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-emerald-100 pb-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>Quick Action Matrix</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Scan Leaf Image', icon: BrainCircuit, tab: 'scanner' as ActiveTab },
              { label: 'Live Drone HUD', icon: Plane, tab: 'live_camera' as ActiveTab },
              { label: 'IoT Sensor Node', icon: Cpu, tab: 'iot' as ActiveTab },
              { label: 'Pest Radar Map', icon: Activity, tab: 'pest' as ActiveTab },
              { label: 'Weather Windows', icon: CloudSun, tab: 'weather' as ActiveTab },
              { label: 'Audit Reports', icon: ArrowUpRight, tab: 'reports' as ActiveTab },
            ].map((btn, idx) => {
              const Icon = btn.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(btn.tab)}
                  className="p-3.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-700 hover:text-white text-emerald-950 transition-all flex flex-col items-center justify-center text-center gap-1.5 border border-emerald-200/80 group"
                >
                  <Icon className="w-5 h-5 text-emerald-700 group-hover:text-white transition-colors" />
                  <span className="text-xs font-bold leading-tight">{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
