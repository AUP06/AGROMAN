import React from 'react';
import {
  Home,
  Sprout,
  CloudSun,
  ClipboardList,
  Lightbulb,
  Menu,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenMobileMenu: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileMenu,
}) => {
  const items = [
    { id: 'dashboard' as ActiveTab, label: 'Home', icon: Home },
    { id: 'farms' as ActiveTab, label: 'Crops', icon: Sprout },
    { id: 'weather' as ActiveTab, label: 'Weather', icon: CloudSun },
    { id: 'scheduler' as ActiveTab, label: 'Task', icon: ClipboardList },
    { id: 'decision' as ActiveTab, label: 'Insights', icon: Lightbulb },
  ];

  return (
    <div className="lg:hidden fixed bottom-2 left-2 right-2 z-50">
      <div className="bg-white/95 backdrop-blur-xl border border-emerald-100 shadow-2xl rounded-full px-1.5 sm:px-3 py-1.5 flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-0.5 px-1 sm:px-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-emerald-700 font-extrabold scale-105'
                  : 'text-slate-400 font-medium hover:text-emerald-700'
              }`}
            >
              <Icon
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isActive ? 'text-[#76C843] stroke-[2.5px]' : 'text-slate-400'
                }`}
              />
              <span
                className={`text-[9px] sm:text-[10px] mt-0.5 tracking-tight ${
                  isActive ? 'text-emerald-900 font-extrabold' : 'text-slate-400 font-medium'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#76C843] mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}

        <button
          onClick={onOpenMobileMenu}
          className="flex flex-col items-center justify-center py-0.5 px-1 sm:px-2.5 rounded-full text-slate-400 hover:text-emerald-700 font-medium transition-all"
          title="All Navigation Menu"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          <span className="text-[9px] sm:text-[10px] mt-0.5 tracking-tight text-slate-400">Menu</span>
        </button>
      </div>
    </div>
  );
};
