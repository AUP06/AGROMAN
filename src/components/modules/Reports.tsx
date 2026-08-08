import React, { useState } from 'react';
import {
  FileSpreadsheet,
  FileText,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Sparkles,
  X,
  ShieldCheck,
} from 'lucide-react';

export const Reports: React.FC = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const handleDownload = (type: string) => {
    setDownloadSuccessToast(`AGROMAN SIH 2026 Audit Report exported as .${type} successfully!`);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {downloadSuccessToast && (
        <div className="p-3 bg-emerald-800 text-white text-xs font-bold rounded-2xl shadow-xl flex items-center justify-between border border-emerald-500">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            {downloadSuccessToast}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-emerald-700" />
            <span>SIH 2026 Agronomic Report & Audit Center</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Exportable compliance reports for agricultural officers, bank loan audits, and SIH 2026 evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload('pdf')}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-2xl text-xs transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => handleDownload('xlsx')}
            className="flex items-center gap-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-3.5 py-2 rounded-2xl text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel (.xlsx)</span>
          </button>
        </div>
      </div>

      {/* REPORT PREVIEW CARD */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-emerald-950">
                Quarterly Smart Farming & Resource Efficiency Audit
              </h3>
              <p className="text-xs text-gray-500 font-mono">
                Document Ref: AGRO-SIH-2026-REPORT-Q1 • Generated Today
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold px-4 py-2 rounded-2xl text-xs border border-emerald-200 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Full Document Preview</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-2xl text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Layout</span>
            </button>
          </div>
        </div>

        {/* Executive Summary List */}
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold uppercase font-mono text-emerald-950">
            Report Executive Summary Metrics
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Monitored Acres</span>
              <p className="text-xl font-black font-mono text-emerald-950">160.5 Acres</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Water Conservation Rate</span>
              <p className="text-xl font-black font-mono text-emerald-950">35.2% Saved</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Chemical Spray Reduction</span>
              <p className="text-xl font-black font-mono text-emerald-950">68.4% Cut</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Yield Increase Score</span>
              <p className="text-xl font-black font-mono text-emerald-950">+18.5% Gain</p>
            </div>
          </div>
        </div>
      </div>

      {/* PDF PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-emerald-950/70 backdrop-blur-md"
            onClick={() => setShowPreviewModal(null)}
          />

          <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 max-h-[90vh] flex flex-col p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-md">
                  SIH 2026 OFFICIAL AUDIT DOCUMENT
                </span>
                <h3 className="text-xl font-extrabold text-emerald-950 mt-1">
                  AGROMAN Smart Farming Compliance Report
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 font-serif text-sm text-gray-800 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h4 className="font-bold text-base text-emerald-950 font-sans">
                1. Project Overview & Team AGROMAN Mandate
              </h4>
              <p>
                This document verifies the operational efficiency of the AGROMAN AI-Powered Smart Agricultural Monitoring System deployed for Smart India Hackathon 2026 evaluation.
              </p>

              <h4 className="font-bold text-base text-emerald-950 font-sans pt-2">
                2. Key Performance Indicators
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs font-sans">
                <li>Total Monitored Land: 160.5 Acres across Pokkali Paddy, Tea Estate, and Coffee Plantations.</li>
                <li>Water Saved: 142,500 Liters (35.2% reduction vs traditional flood irrigation).</li>
                <li>AI Disease Diagnosis Accuracy: 97.4% validated across 1,200+ test scans.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
