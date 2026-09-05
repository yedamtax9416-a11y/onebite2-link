"use client";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-xl shadow-zinc-900/10"
      >
        <div>
          <h2 className="text-lg font-extrabold text-zinc-900">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500">{message}</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-100"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/30 transition-all hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/40"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
