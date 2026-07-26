import { useEffect } from "react";

export default function Modal({
  isOpen,
  title,
  message,
  type = "info",
  actionLabel = "Close",
  onAction,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toneStyles = {
    success: "from-emerald-500 to-teal-600",
    error: "from-rose-500 to-red-600",
    info: "from-violet-500 to-fuchsia-600",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 shadow-2xl">
        <div className={`mb-4 inline-flex rounded-full bg-linear-to-r px-3 py-1 text-sm font-semibold text-white ${toneStyles[type]}`}>
          {type === "success" ? "Success" : type === "error" ? "Notice" : "Info"}
        </div>

        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={onAction || onClose}
            className={`flex-1 rounded-xl bg-linear-to-r px-4 py-2.5 font-medium text-white transition hover:opacity-90 ${toneStyles[type]}`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
