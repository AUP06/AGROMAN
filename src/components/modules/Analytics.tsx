import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Droplets,
  Sprout,
  Activity,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';

export const Analytics: React.FC = () => {
  const waterSavedData = [
    { month: 'Jan', traditionalLiters: 48000, agromanLiters: 31200 },
    { month: 'Feb', traditionalLiters: 52000, agromanLiters: 33800 },
    { month: 'Mar', traditionalLiters: 45000, agromanLiters: 29250 },
    { month: 'Apr', traditionalLiters: 60000, agromanLiters: 39000 },
  ];

  const profitTrend = [
    { month: 'Jan', profit: 120000 },
    { month: 'Feb', profit: 145000 },
    { month: 'Mar', profit: 168000 },
    { month: 'Apr', profit: 198000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-700" />
            <span>SIH 2026 Impact & Agronomic Analytics</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Quantitative metrics evaluating resource efficiency, yield improvement, and carbon offset.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200">
          35% Water Saved • +18% Yield
        </span>
      </div>

      {/* KPI HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-1">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">Total Water Conserved</span>
          <p className="text-3xl font-black font-mono text-blue-700">142,500 L</p>
          <span className="text-xs font-bold text-emerald-800">35.2% Reduction vs Flood Irrigation</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-1">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">Net Profit Increase</span>
          <p className="text-3xl font-black font-mono text-emerald-800">+18.5%</p>
          <span className="text-xs font-bold text-emerald-800">₹78,000 Extra Revenue / Acre</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-1">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">Carbon Footprint Offset</span>
          <p className="text-3xl font-black font-mono text-green-700">4.2 Tons</p>
          <span className="text-xs font-bold text-emerald-800">CO2 Equivalent Saved via Drone Precision</span>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Saved Comparison Chart */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span>Water Consumption: Traditional vs AGROMAN Drip (Liters)</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterSavedData}>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#064E3B', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="traditionalLiters" name="Traditional Flood" fill="#94A3B8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="agromanLiters" name="AGROMAN Smart Drip" fill="#2E7D32" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit Boost Trend */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            <span>Net Farmer Income Trajectory (₹ / Quarter)</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitTrend}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#064E3B', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="profit" name="Net Revenue (₹)" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
