import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  Filter,
} from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  setNotifications,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'info' | 'success'>('all');

  const filtered = notifications.filter(
    (n) => filterType === 'all' || n.type === filterType
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-700" />
            <span>Telemetry Notification & Alert Center</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time alerts triggered by drone vision AI, ESP32 moisture probes, and weather radar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-2xl border border-emerald-200 transition-colors"
          >
            Mark All Read
          </button>
          <button
            onClick={clearAll}
            className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-2xl border border-red-200 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(['all', 'critical', 'warning', 'info', 'success'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all border ${
              filterType === type
                ? 'bg-emerald-800 text-white border-emerald-700 shadow-xs'
                : 'bg-white text-gray-700 border-emerald-100 hover:bg-emerald-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS FEED */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-emerald-100 text-center text-gray-400 text-xs">
            No notifications matching this filter category.
          </div>
        ) : (
          filtered.map((item) => {
            let icon = <Info className="w-5 h-5 text-blue-500" />;
            let badgeBg = 'bg-blue-100 text-blue-900 border-blue-300';

            if (item.type === 'critical') {
              icon = <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce" />;
              badgeBg = 'bg-red-100 text-red-900 border-red-300';
            } else if (item.type === 'warning') {
              icon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
              badgeBg = 'bg-amber-100 text-amber-900 border-amber-300';
            } else if (item.type === 'success') {
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
              badgeBg = 'bg-emerald-100 text-emerald-900 border-emerald-300';
            }

            return (
              <div
                key={item.id}
                className={`p-4 rounded-3xl border transition-all flex items-start justify-between gap-4 ${
                  item.read
                    ? 'bg-white border-emerald-100 opacity-75'
                    : 'bg-emerald-50/60 border-emerald-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-gray-900">{item.title}</h4>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${badgeBg}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] text-gray-400 font-mono mt-2 block">
                      {item.category} • {item.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
