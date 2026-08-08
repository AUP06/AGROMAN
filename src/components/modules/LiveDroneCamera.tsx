import React, { useState, useEffect } from 'react';
import {
  Camera,
  Video,
  Scan,
  Maximize2,
  Sparkles,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';

export const LiveDroneCamera: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [capturedSnaps, setCapturedSnaps] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleCapture = () => {
    const time = new Date().toLocaleTimeString();
    setCapturedSnaps((prev) => [`Frame Scan ${prev.length + 1} at ${time}`, ...prev]);
    setToastMessage('Frame captured & sent to AI Crop Diagnosis Engine!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // AI Detected Bounding Boxes
  const detections = [
    {
      id: 1,
      label: 'Pokkali Paddy Crop Health: High (NDVI 0.88)',
      confidence: '98.4%',
      top: '25%',
      left: '20%',
      width: '32%',
      height: '35%',
      color: 'border-emerald-400 text-emerald-300 bg-emerald-950/40',
    },
    {
      id: 2,
      label: 'Rice Blast Spore Cluster Flagged',
      confidence: '96.8%',
      top: '55%',
      left: '60%',
      width: '28%',
      height: '30%',
      color: 'border-red-500 text-red-300 bg-red-950/40 animate-pulse',
    },
    {
      id: 3,
      label: 'ESP32 IoT Node 101 Ground Marker',
      confidence: '99.1%',
      top: '70%',
      left: '15%',
      width: '18%',
      height: '20%',
      color: 'border-blue-400 text-blue-300 bg-blue-950/40',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3 bg-emerald-800 text-white text-xs font-bold rounded-2xl shadow-xl flex items-center justify-between border border-emerald-500">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            {toastMessage}
          </span>
        </div>
      )}

      {/* FULLSCREEN AI HUD CAMERA VIEW STAGE */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[620px] rounded-3xl overflow-hidden bg-black border-2 border-emerald-800 shadow-2xl flex flex-col justify-between font-mono select-none">
        {/* Background Camera Frame Image */}
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200"
          alt="Live Camera Feed"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />

        {/* AI BOUNDING BOX OVERLAYS */}
        {showBoundingBoxes &&
          detections.map((d) => (
            <div
              key={d.id}
              className={`absolute rounded-xl border-2 p-2 backdrop-blur-xs flex flex-col justify-between transition-all ${d.color}`}
              style={{ top: d.top, left: d.left, width: d.width, height: d.height }}
            >
              <div className="flex items-center justify-between text-[10px] font-bold bg-black/70 px-2 py-0.5 rounded-md">
                <span className="truncate">{d.label}</span>
                <span className="text-amber-300">{d.confidence}</span>
              </div>
              <div className="text-[9px] text-gray-200 bg-black/60 px-1.5 py-0.5 rounded w-fit">
                TensorFlow Vision Engine v2.4
              </div>
            </div>
          ))}

        {/* TOP HUD BAR */}
        <div className="relative z-10 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-2xl border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-red-400">
                {isRecording ? `REC ${formatTimer(recordTimer)}` : 'LIVE 4K ULTRA HD'}
              </span>
            </div>

            <span className="bg-emerald-800/80 text-emerald-200 px-3 py-1.5 rounded-2xl border border-emerald-500/40 text-[11px] font-bold">
              AI VISION OVERLAY ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className="flex items-center gap-1.5 bg-black/60 hover:bg-emerald-900/80 px-3 py-1.5 rounded-2xl border border-white/10 text-emerald-300 transition-colors"
            >
              {showBoundingBoxes ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{showBoundingBoxes ? 'Hide Bounding Boxes' : 'Show Bounding Boxes'}</span>
            </button>
          </div>
        </div>

        {/* CENTER CROSSHAIR */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-24 h-24 border border-emerald-400/50 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>

        {/* BOTTOM CAMERA CONTROLS BAR */}
        <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div className="text-xs">
            <p className="font-bold text-emerald-300">TARGET: Green Acres Paddy Field (Block 3B)</p>
            <p className="text-[10px] text-gray-300">
              Altitude: 42.5m • Ground Resolution: 1.2 cm/pixel • Camera: MicaSense RedEdge
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Snapshot Capture Button */}
            <button
              onClick={handleCapture}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-2.5 rounded-2xl shadow-lg transition-transform active:scale-95 text-xs"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Frame Scan</span>
            </button>

            {/* Record Toggle Button */}
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`flex items-center gap-2 font-extrabold px-5 py-2.5 rounded-2xl shadow-lg transition-transform active:scale-95 text-xs ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{isRecording ? 'Stop Recording' : 'Start Video Record'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* CAPTURED SCANS GALLERY */}
      {capturedSnaps.length > 0 && (
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Captured Frames Queue ({capturedSnaps.length})</span>
          </h4>
          <div className="flex gap-2 overflow-x-auto py-1">
            {capturedSnaps.map((snap, idx) => (
              <span
                key={idx}
                className="shrink-0 bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-mono px-3 py-1.5 rounded-xl font-bold"
              >
                {snap}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
