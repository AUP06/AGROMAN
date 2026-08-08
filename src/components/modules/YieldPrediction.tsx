import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Award,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Sprout,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const YieldPrediction: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>Machine Learning Harvesting & Market Model</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Yield & Revenue Prediction
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Data-driven crop biomass estimation, harvest timing optimization, and market revenue forecasting.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950 text-white p-3 rounded-2xl border border-emerald-800 text-xs font-mono shrink-0">
          <Sparkles className="w-4 h-4 text-[#8CE854]" />
          <span>AI Model Confidence: <strong className="text-[#8CE854]">94.8%</strong></span>
        </div>
      </div>

      {/* HIGHLIGHT STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-900 to-green-950 text-white p-6 rounded-[24px] border border-emerald-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-300">Expected Yield</span>
            <Sprout className="w-5 h-5 text-[#8CE854]" />
          </div>
          <p className="text-3xl font-black text-white">6.8 Tons</p>
          <p className="text-xs font-medium text-emerald-200">+18% vs Regional Average</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-emerald-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Est. Market Price</span>
            <DollarSign className="w-5 h-5 text-emerald-700" />
          </div>
          <p className="text-3xl font-black text-slate-900">₹32 / kg</p>
          <p className="text-xs font-bold text-emerald-700">Grade A Organic Premium</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-emerald-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Estimated Revenue</span>
            <TrendingUp className="w-5 h-5 text-emerald-700" />
          </div>
          <p className="text-3xl font-black text-emerald-900">₹2.17 Lakhs</p>
          <p className="text-xs font-bold text-emerald-700">Net Margin: ~₹1.62 Lakhs</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-emerald-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Optimal Harvest Window</span>
            <Calendar className="w-5 h-5 text-emerald-700" />
          </div>
          <p className="text-2xl font-black text-slate-900">Nov 18 - 22, 2026</p>
          <p className="text-xs font-medium text-slate-500">Based on 14-day weather AI</p>
        </div>
      </div>

      {/* CROP BREAKDOWN TABLE */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs space-y-6">
        <h3 className="text-xl font-extrabold text-slate-900">Farm Sector Yield Breakdown</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-emerald-50 text-emerald-900 font-mono font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-xl">Sector / Crop</th>
                <th className="p-3.5">Area</th>
                <th className="p-3.5">Predicted Yield</th>
                <th className="p-3.5">Quality Grade</th>
                <th className="p-3.5">Est. Price / kg</th>
                <th className="p-3.5 text-right rounded-r-xl">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100 font-medium text-slate-700">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Zone A • Jyothi Paddy</td>
                <td className="p-3.5">4.5 Acres</td>
                <td className="p-3.5 font-bold text-emerald-800">3.2 Tons</td>
                <td className="p-3.5"><span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">Grade A+</span></td>
                <td className="p-3.5">₹34 / kg</td>
                <td className="p-3.5 text-right font-black text-slate-900">₹1,08,800</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Zone B • Hybrid Yellow Maize</td>
                <td className="p-3.5">3.8 Acres</td>
                <td className="p-3.5 font-bold text-emerald-800">1.9 Tons</td>
                <td className="p-3.5"><span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">Grade B+</span></td>
                <td className="p-3.5">₹28 / kg</td>
                <td className="p-3.5 text-right font-black text-slate-900">₹53,200</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Zone D • Organic Tomatoes</td>
                <td className="p-3.5">3.2 Acres</td>
                <td className="p-3.5 font-bold text-emerald-800">1.7 Tons</td>
                <td className="p-3.5"><span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">Grade A</span></td>
                <td className="p-3.5">₹32 / kg</td>
                <td className="p-3.5 text-right font-black text-slate-900">₹55,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
