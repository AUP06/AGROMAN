import React, { useState } from 'react';
import {
  ScanLine,
  Upload,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { AIAnalysisResult } from '../../types';
import { AI_CROP_SCANS } from '../../data/mockData';

export const AICropScanner: React.FC = () => {
  const [selectedScan, setSelectedScan] = useState<AIAnalysisResult>(AI_CROP_SCANS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleSelectSample = (scan: AIAnalysisResult) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedScan(scan);
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <ScanLine className="w-6 h-6 text-emerald-700" />
            <span>AI Crop Disease & Pest Vision Scanner</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Convolutional Neural Network (CNN) diagnosis trained on 150,000+ agricultural leaf pathology images.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200">
          TensorFlow Lite AI Engine v2.4
        </span>
      </div>

      {/* SAMPLE SELECTOR / UPLOAD BAR */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider font-mono">
          Select Sample Leaf Photo or Upload New Inspection Frame
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {AI_CROP_SCANS.map((scan) => (
            <button
              key={scan.id}
              onClick={() => handleSelectSample(scan)}
              className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                selectedScan.id === scan.id
                  ? 'border-emerald-700 bg-emerald-50 ring-2 ring-emerald-600/30'
                  : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
              }`}
            >
              <img
                src={scan.sampleImage}
                alt={scan.diseaseName}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="truncate">
                <h4 className="text-xs font-bold text-gray-900 truncate">{scan.diseaseName}</h4>
                <p className="text-[10px] text-emerald-700 font-mono font-bold">
                  {scan.confidence}% Confidence
                </p>
              </div>
            </button>
          ))}

          {/* Upload Box */}
          <div className="p-3 rounded-2xl border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-emerald-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
            <Upload className="w-5 h-5 text-emerald-700 mb-1" />
            <span className="text-xs font-bold text-emerald-900">Upload Photo</span>
            <span className="text-[9px] text-gray-400">JPG, PNG or Camera</span>
          </div>
        </div>
      </div>

      {/* AI SCANNER STAGE & RESULTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Interactive Image & Heatmap Viewport */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <h3 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-emerald-700" />
              <span>Inspection Viewport</span>
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold font-mono transition-colors ${
                  showHeatmap ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showHeatmap ? 'Heatmap ON' : 'Toggle Heatmap'}
              </button>

              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold font-mono transition-colors ${
                  showComparison ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showComparison ? 'Healthy Comparison' : 'Original Leaf'}
              </button>
            </div>
          </div>

          {/* Leaf Viewport Frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-square bg-black border border-emerald-200 shadow-md">
            {isScanning ? (
              <div className="absolute inset-0 bg-emerald-950 flex flex-col items-center justify-center text-white space-y-3 p-4">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="text-xs font-mono font-bold text-emerald-200">
                  Running Neural Feature Extraction...
                </p>
                <div className="w-48 h-1.5 bg-emerald-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            ) : (
              <>
                <img
                  src={
                    showComparison
                      ? selectedScan.healthyComparisonImage
                      : showHeatmap
                      ? selectedScan.heatmapOverlay
                      : selectedScan.sampleImage
                  }
                  alt={selectedScan.diseaseName}
                  className="w-full h-full object-cover"
                />

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent animate-pulse" />

                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-[10px] font-mono">
                  {showComparison ? 'HEALTHY LEAF REFERENCE' : showHeatmap ? 'AI SPECTRAL HEATMAP' : 'PATHOLOGY INPUT FRAME'}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right AI Diagnosis Results Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                DIAGNOSIS RESULT
              </span>
              <h3 className="text-2xl font-extrabold text-emerald-950 mt-1">
                {selectedScan.diseaseName}
              </h3>
              <p className="text-xs text-gray-500 italic">{selectedScan.scientificName}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-gray-400 block">AI Confidence</span>
              <span className="text-3xl font-black font-mono text-emerald-800">
                {selectedScan.confidence}%
              </span>
            </div>
          </div>

          {/* Stats Badges Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Affected Area</span>
              <span className="text-base font-black text-emerald-900 font-mono">
                {selectedScan.affectedAreaPct}%
              </span>
            </div>

            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Severity Level</span>
              <span
                className={`text-base font-black ${
                  selectedScan.severity === 'Severe'
                    ? 'text-red-600'
                    : selectedScan.severity === 'Moderate'
                    ? 'text-amber-600'
                    : 'text-emerald-700'
                }`}
              >
                {selectedScan.severity}
              </span>
            </div>

            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Est. Recovery</span>
              <span className="text-base font-black text-emerald-900 font-mono">
                {selectedScan.recoveryDays} Days
              </span>
            </div>
          </div>

          {/* Treatment Recommendations */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider font-mono">
              Actionable Treatment & Prescription
            </h4>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3 text-xs">
              <div>
                <strong className="text-emerald-900 block font-bold mb-1">
                  1. Clinical Treatment Plan:
                </strong>
                <p className="text-gray-700 leading-relaxed">{selectedScan.recommendedTreatment}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-emerald-200/60">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">
                    Chemical Medicine Suggestion:
                  </span>
                  <span className="font-bold text-emerald-950">{selectedScan.chemicalMedicine}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">
                    Organic / Bio Alternative:
                  </span>
                  <span className="font-bold text-green-800">{selectedScan.organicAlternative}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-200/60 flex justify-between items-center text-xs">
                <span className="text-gray-500">Dosage Standard:</span>
                <strong className="text-emerald-900 font-mono">{selectedScan.dosage}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
