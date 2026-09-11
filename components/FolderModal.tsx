"use client";

import { useState } from "react";

type FolderModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  initialName?: string;
  submitLabel?: string;
  isSaving?: boolean;
  onSave: (name: string) => void | Promise<void>;
  onClose: () => void;
};

export default function FolderModal({
  isOpen,
  title,
  description,
  initialName = "",
  submitLabel = "저장",
  isSaving = false,
  onSave,
  onClose,
}: FolderModalProps) {
  const [name, setName] = useState(initialName);

  if (!isOpen) return null;

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleSave = () => {
    if (!name.trim() || isSaving) return;
    onSave(name);
    setName("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-xl shadow-zinc-900/10"
      >
        <div>
          <h2 className="gradient-text text-lg font-extrabold">{title}</h2>
          <p className="mt-1 text-xs text-zinc-400">{description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="folder-name"
            className="text-sm font-semibold text-zinc-700"
          >
            폴더 이름
          </label>
          <input
            id="folder-name"
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            placeholder="예: 맛집"
            className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-100"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="gradient-bg rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md"
          >
            {isSaving ? "저장 중..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
