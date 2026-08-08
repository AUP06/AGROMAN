import React, { useState, useEffect } from 'react';
import {
  Search,
  Mic,
  Bell,
  Globe,
  Sliders,
  Sparkles,
  Plane,
  Cpu,
  Menu,
  X,
  Volume2,
} from 'lucide-react';
import { ActiveTab, Language } from '../../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  unreadNotifications: number;
  onOpenCommandPalette: () => void;
  onOpenVoiceAssistant: () => void;
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  unreadNotifications,
  onOpenCommandPalette,
  onOpenVoiceAssistant,
  onToggleMobileSidebar,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const languageLabels: Record<Language, string> = {
    en: 'English',
    ml: 'മലയാളം',
    hi: 'हिंदी',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    kn: 'ಕನ್ನಡ',
    mr: 'मराठी',
    bn: 'বাংলা',
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      <div className="max-w-[1800px] w-full mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Branding & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
            title="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 via-green-600 to-emerald-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-emerald-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Plane className="w-5 h-5 text-emerald-300 animate-pulse" />
                <div className="absolute -bottom-1 -right-1 bg-amber-400 w-2.5 h-2.5 rounded-full border-2 border-emerald-900" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-emerald-950 font-sans">
                  AGROMAN
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200 uppercase">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] text-emerald-700/80 font-medium hidden sm:block">
                AI Smart Agriculture Platform
              </p>
            </div>
          </div>
        </div>

        {/* Center Search / Command Palette Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={onOpenCommandPalette}
            className="w-full bg-emerald-50/80 hover:bg-emerald-100/60 border border-emerald-200/80 rounded-2xl px-3.5 py-2 flex items-center justify-between text-xs text-emerald-800 transition-all shadow-xs group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="text-gray-500 group-hover:text-gray-700">
                Search farms, drones, crop diseases, AI insights...
              </span>
            </div>
            <kbd className="hidden lg:inline-block bg-white border border-emerald-200 text-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-mono shadow-xs">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right Tools & Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* AI Voice Assistant Trigger */}
          <button
            onClick={onOpenVoiceAssistant}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-semibold shadow-xs hover:shadow transition-all group shrink-0"
            title="Launch AGROMAN Voice Assistant"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-200 group-hover:scale-110 transition-transform animate-bounce" />
            <span className="hidden md:inline">AI Voice</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </button>

          {/* Language Switcher - hidden on mobile screens < sm */}
          <div className="relative group hidden sm:block">
            <button className="flex items-center gap-1 bg-gray-100 hover:bg-emerald-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-700 font-medium transition-colors">
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span className="uppercase font-semibold text-[11px]">{language}</span>
            </button>
            <div className="absolute right-0 mt-1 w-36 bg-white border border-emerald-100 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50 p-1">
              {(['en', 'ml', 'hi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    language === lang
                      ? 'bg-emerald-100/80 text-emerald-900 font-bold'
                      : 'hover:bg-emerald-50 text-gray-700'
                  }`}
                >
                  <span>{languageLabels[lang]}</span>
                  {language === lang && <Sparkles className="w-3 h-3 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Trigger */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative p-2 rounded-xl transition-colors ${
              activeTab === 'notifications'
                ? 'bg-emerald-100 text-emerald-900'
                : 'bg-gray-100 hover:bg-emerald-50 text-gray-700'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-xl transition-colors ${
              activeTab === 'settings'
                ? 'bg-emerald-100 text-emerald-900'
                : 'bg-gray-100 hover:bg-emerald-50 text-gray-700'
            }`}
            title="System Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Live Clock Display */}
          <div className="hidden lg:flex flex-col text-right pl-2 border-l border-emerald-100">
            <span className="text-[11px] font-mono font-bold text-emerald-900 leading-none">
              {time || '00:00:00'}
            </span>
            <span className="text-[9px] text-gray-400 font-medium">LIVE TELEMETRY</span>
          </div>
        </div>
      </div>
    </header>
  );
};
