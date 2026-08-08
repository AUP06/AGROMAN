import React from 'react';
import {
  Home,
  Layers,
  Plane,
  ScanLine,
  Sprout,
  Zap,
  Droplets,
  CloudSun,
  Bot,
  TrendingUp,
  Store,
  ShieldAlert,
  BarChart3,
  FileSpreadsheet,
  Workflow,
  Sliders,
  Camera,
  Cpu,
  MapPin,
  Calendar,
  UserCheck,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavCategory {
  title: string;
  items: Array<{
    id: ActiveTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const categories: NavCategory[] = [
    {
      title: 'CORE ECOSYSTEM',
      items: [
        { id: 'landing', label: 'Home', icon: Home },
        { id: 'digital_twin', label: 'Digital Farm Twin', icon: Layers, badge: '3D GIS' },
        { id: 'drone', label: 'Drone Mission', icon: Plane, badge: 'Autonomous' },
        { id: 'scanner', label: 'AI Crop Scanner', icon: ScanLine, badge: 'Vision' },
      ],
    },
    {
      title: 'PRECISION OPERATIONS',
      items: [
        { id: 'nitrogen', label: 'Disease & Nitrogen AI', icon: Sprout },
        { id: 'precision_spraying', label: 'Precision Spraying', icon: Zap, badge: 'Spot Spray' },
        { id: 'irrigation', label: 'Smart Irrigation', icon: Droplets },
        { id: 'weather', label: 'Weather Intelligence', icon: CloudSun },
        { id: 'assistant', label: 'AI Farmer Assistant', icon: Bot, badge: 'Voice' },
      ],
    },
    {
      title: 'YIELD & MARKET',
      items: [
        { id: 'yield_prediction', label: 'Yield Prediction', icon: TrendingUp },
        { id: 'marketplace', label: 'Produce Marketplace', icon: Store, badge: 'Direct' },
        { id: 'wildlife', label: 'Wildlife Protection', icon: ShieldAlert, badge: 'Thermal' },
      ],
    },
    {
      title: 'ANALYTICS & WORKFLOW',
      items: [
        { id: 'analytics', label: 'Impact Analytics', icon: BarChart3 },
        { id: 'reports', label: 'Reports System', icon: FileSpreadsheet },
        { id: 'workflow', label: 'Closed-Loop AI', icon: Workflow, badge: 'Timeline' },
        { id: 'settings', label: 'System Settings', icon: Sliders },
      ],
    },
    {
      title: 'EXTENDED TELEMETRY',
      items: [
        { id: 'live_camera', label: 'Live Drone Camera', icon: Camera },
        { id: 'iot', label: 'IoT Sensor Network', icon: Cpu },
        { id: 'map', label: 'Smart GIS Farm Map', icon: MapPin },
        { id: 'profile', label: 'Team AGROMAN', icon: UserCheck },
        { id: 'about', label: 'SIH 2026 Project', icon: Info },
      ],
    },
  ];

  const handleSelect = (id: ActiveTab) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between py-4 px-3 overflow-y-auto custom-scrollbar">
      {/* Top Toggle & Header */}
      <div>
        <div className="flex items-center justify-between mb-4 px-2">
          {!collapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Navigation
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-xl text-gray-500 hover:text-emerald-800 hover:bg-emerald-50 transition-colors ml-auto"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Categories */}
        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category.title}>
              {!collapsed && (
                <h4 className="px-3 mb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-900/60 font-mono">
                  {category.title}
                </h4>
              )}
              <div className="space-y-1">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group relative ${
                        isActive
                          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/20'
                          : 'text-gray-700 hover:bg-emerald-50/90 hover:text-emerald-900'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? 'text-white scale-110'
                            : 'text-emerald-700 group-hover:scale-110'
                        }`}
                      />

                      {!collapsed && (
                        <span className="truncate flex-1 text-left font-medium">{item.label}</span>
                      )}

                      {!collapsed && item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                            isActive
                              ? 'bg-emerald-900/40 text-emerald-100 border border-emerald-500/30'
                              : 'bg-emerald-100/80 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute right-0 top-2 bottom-2 w-1 bg-amber-300 rounded-l-full shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom SIH 2026 Badge */}
      {!collapsed && (
        <div className="mt-8 p-3 rounded-2xl bg-gradient-to-br from-emerald-900 to-green-950 text-white border border-emerald-700/50 text-center">
          <p className="text-[10px] uppercase font-mono tracking-widest text-emerald-300">
            SIH 2026 PROTOTYPE
          </p>
          <p className="text-xs font-bold mt-0.5 text-white">Team AGROMAN</p>
          <div className="mt-2 text-[9px] text-emerald-200/80 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Smart Agriculture AI</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block bg-white border-r border-emerald-100 h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 z-20 shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-emerald-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative bg-white w-72 max-w-full h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
