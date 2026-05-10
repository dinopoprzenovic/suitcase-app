'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Info, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Notification } from '@/lib/data';

// Map every notification type to an icon config
const TYPE_CONFIG: Record<
  string,
  { icon: React.FC<{ className?: string; strokeWidth?: number }>; color: string; bg: string }
> = {
  booking: { icon: CheckCircle,   color: 'text-[#22C55E]',  bg: 'bg-[#22C55E]/10' },
  price:   { icon: AlertTriangle, color: 'text-[#F59E0B]',  bg: 'bg-[#F59E0B]/10' },
  trip:    { icon: Info,          color: 'text-blue-500',   bg: 'bg-blue-50' },
  group:   { icon: Info,          color: 'text-blue-500',   bg: 'bg-blue-50' },
  gift:    { icon: CheckCircle,   color: 'text-[#E8643A]',  bg: 'bg-[#E8643A]/10' },
  system:  { icon: Info,          color: 'text-[#737373]',  bg: 'bg-[#F5F5F5]' },
  info:    { icon: Info,          color: 'text-blue-500',   bg: 'bg-blue-50' },
  success: { icon: CheckCircle,   color: 'text-[#22C55E]',  bg: 'bg-[#22C55E]/10' },
  warning: { icon: AlertTriangle, color: 'text-[#F59E0B]',  bg: 'bg-[#F59E0B]/10' },
  alert:   { icon: AlertTriangle, color: 'text-red-500',    bg: 'bg-red-50' },
};

const FALLBACK_CONFIG = TYPE_CONFIG.info;

interface NotificationPanelProps {
  notifications: Notification[];
}

export function NotificationPanel({ notifications: initial }: NotificationPanelProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(initial);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-[#E5E5E5] bg-white hover:bg-[#F5F5F5] transition-colors duration-150"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 text-[#737373]" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8643A] rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-white leading-none">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown — full width of phone frame */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="absolute right-0 top-11 w-[300px] bg-white border border-[#E5E5E5] rounded-xl shadow-lg overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#F5F5F5]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0A0A0A]">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-[#E8643A]/10 text-[#E8643A] text-[10px] font-semibold rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] text-[#737373] hover:text-[#E8643A] transition-colors duration-150"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-[#737373] hover:text-[#0A0A0A] transition-colors duration-150"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List */}
            <ul className="divide-y divide-[#F5F5F5] max-h-[300px] overflow-y-auto">
              {items.length === 0 ? (
                <li className="px-3 py-6 text-center text-xs text-[#737373]">
                  No notifications
                </li>
              ) : (
                items.map((n) => {
                  const { icon: Icon, color, bg } = TYPE_CONFIG[n.type] ?? FALLBACK_CONFIG;
                  return (
                    <li
                      key={n.id}
                      className={[
                        'flex items-start gap-2.5 px-3 py-2.5 transition-colors duration-100',
                        !n.read ? 'bg-[#FAFAFA]' : 'bg-white',
                      ].join(' ')}
                    >
                      <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`w-3.5 h-3.5 ${color}`} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-[#0A0A0A] leading-snug">
                            {n.title}
                          </p>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-[9px] text-[#737373] whitespace-nowrap">{n.time}</span>
                            {!n.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E8643A] shrink-0" />
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-[#737373] mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationPanel;
