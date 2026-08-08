import React from 'react';
import { Mic, Sparkles, Bot } from 'lucide-react';

interface FloatingVoiceButtonProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({ onOpen, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 flex items-center gap-2 group">
      {/* Tooltip Label */}
      <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/90 text-white text-xs font-black px-3 py-1.5 rounded-2xl border border-emerald-500/40 shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none transform translate-x-2 group-hover:translate-x-0">
        <Sparkles className="w-3.5 h-3.5 text-[#8CE854]" />
        <span>AGROMAN AI Voice</span>
      </div>

      {/* Floating Button */}
      <button
        onClick={onOpen}
        className="relative bg-gradient-to-tr from-emerald-800 via-green-600 to-[#8CE854] text-slate-950 p-4 rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white/80 group-hover:shadow-[#8CE854]/50 flex items-center justify-center"
        title="Open AGROMAN Voice Assistant"
      >
        <Bot className="w-6 h-6 text-slate-950 font-extrabold" />
        
        {/* Glowing Pulse Ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CE854] opacity-80"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
      </button>
    </div>
  );
};
