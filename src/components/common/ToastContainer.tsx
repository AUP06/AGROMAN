import React from 'react';
import { AlertTriangle, CheckCircle2, Info, X, Bell } from 'lucide-react';
import { NotificationItem } from '../../types';

interface ToastContainerProps {
  toasts: NotificationItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-blue-500" />;
        let borderClass = 'border-blue-200 bg-blue-50/95';

        if (toast.type === 'critical') {
          icon = <AlertTriangle className="w-4 h-4 text-red-500" />;
          borderClass = 'border-red-200 bg-red-50/95';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-500" />;
          borderClass = 'border-amber-200 bg-amber-50/95';
        } else if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
          borderClass = 'border-emerald-200 bg-emerald-50/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border backdrop-blur-md flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300 ${borderClass}`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0">{icon}</div>
              <div>
                <h5 className="text-xs font-bold text-gray-900">{toast.title}</h5>
                <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">{toast.message}</p>
                <span className="text-[9px] text-gray-400 font-mono mt-1 block">
                  {toast.timestamp}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-black/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
