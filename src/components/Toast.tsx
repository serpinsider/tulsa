'use client';

import { useEffect } from 'react';
import { UNIFIED_COLORS } from '@/styles/unified-colors';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: {
      bg: UNIFIED_COLORS.status.success + '20',
      border: UNIFIED_COLORS.status.success,
      text: UNIFIED_COLORS.status.success
    },
    error: {
      bg: UNIFIED_COLORS.status.error + '20',
      border: UNIFIED_COLORS.status.error,
      text: UNIFIED_COLORS.status.error
    },
    info: {
      bg: UNIFIED_COLORS.brand.gold + '20',
      border: UNIFIED_COLORS.brand.gold,
      text: UNIFIED_COLORS.brand.gold
    }
  };

  const style = colors[type];

  return (
    <div
      className="fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg max-w-md animate-slide-in-right"
      style={{
        backgroundColor: style.bg,
        border: `2px solid ${style.border}`,
        color: style.text
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-xl leading-none opacity-70 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  );
}


