"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-zinc-900/20">
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="text-zinc-400 transition-colors hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
