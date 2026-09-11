"use client";

import { useState } from "react";
import type { Folder, LinkItem } from "./types";

type LinkModalProps = {
  isOpen: boolean;
  link: LinkItem | null;
  folders: Folder[];
  isSaving?: boolean;
  onSave: (updates: {
    url: string;
    title: string | null;
    description: string | null;
    folderId: string | null;
  }) => void | Promise<void>;
  onClose: () => void;
};

export default function LinkModal({
  isOpen,
  link,
  folders,
  isSaving = false,
  onSave,
  onClose,
}: LinkModalProps) {
  const [url, setUrl] = useState(link?.url ?? "");
  const [title, setTitle] = useState(link?.title ?? "");
  const [description, setDescription] = useState(link?.description ?? "");
  const [folderId, setFolderId] = useState(link?.folderId ?? "");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!url.trim() || isSaving) return;
    onSave({
      url,
      title: title.trim() ? title : null,
      description: description.trim() ? description : null,
      folderId: folderId || null,
    });
  };

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
          <h2 className="gradient-text text-lg font-extrabold">링크 수정</h2>
          <p className="mt-1 text-xs text-zinc-400">
            변경할 링크 정보를 입력하세요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-url-edit"
            className="text-sm font-semibold text-zinc-700"
          >
            링크 주소
          </label>
          <input
            id="link-url-edit"
            type="url"
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-title-edit"
            className="text-sm font-semibold text-zinc-700"
          >
            제목
          </label>
          <input
            id="link-title-edit"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-description-edit"
            className="text-sm font-semibold text-zinc-700"
          >
            설명
          </label>
          <textarea
            id="link-description-edit"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="resize-none rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-folder-edit"
            className="text-sm font-semibold text-zinc-700"
          >
            폴더
          </label>
          <select
            id="link-folder-edit"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          >
            <option value="">폴더 선택 안 함</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
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
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
