"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

type ToastProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};

function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    },7000);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      role="status"
      onClick={(e)=>e.stopPropagation()}
      className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-xl border border-black bg-gray-700 px-5 py-6 text-white shadow-lg"
    >
      <CheckCircle2 size={22} className="shrink-0 text-white" />

      <p className="text-sm font-medium">{message}</p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 text-white transition  cursor-pointer"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default Toast;