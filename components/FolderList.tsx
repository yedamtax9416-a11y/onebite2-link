"use client";

import { useState } from "react";
import type { Folder } from "./types";
import { useFolders } from "./FolderContext";
import ConfirmModal from "./ConfirmModal";

type FolderListProps = {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
};

export default function FolderList({
  folders,
  selectedFolderId,
  onSelectFolder,
}: FolderListProps) {
  const { removeFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  const handleConfirmDelete = () => {
    if (!folderToDelete) return;
    removeFolder(folderToDelete.id);
    if (folderToDelete.id === selectedFolderId) {
      onSelectFolder(null);
    }
    setFolderToDelete(null);
  };

  return (
    <nav className="mt-2 flex flex-col gap-1">
      <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
        폴더
      </p>
      {folders.map((folder) => {
        const isSelected = folder.id === selectedFolderId;
        return (
          <div
            key={folder.id}
            className={`group flex items-center justify-between rounded-xl pr-1 text-sm font-semibold transition-all ${
              isSelected
                ? "gradient-bg text-white shadow-md shadow-indigo-500/30"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectFolder(folder.id)}
              className="min-w-0 flex-1 truncate px-3 py-2.5 text-left"
            >
              {folder.name}
            </button>
            <div className="relative flex h-7 w-7 shrink-0 items-center justify-center">
              <span
                className={`absolute transition-opacity group-hover:opacity-0 ${
                  isSelected ? "text-white/80" : "text-zinc-400"
                }`}
              >
                {folder.count}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFolderToDelete(folder);
                }}
                aria-label={`${folder.name} 폴더 삭제`}
                className={`absolute flex h-7 w-7 items-center justify-center rounded-lg opacity-0 transition-opacity group-hover:opacity-100 ${
                  isSelected
                    ? "text-white hover:bg-white/20"
                    : "text-zinc-400 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M6 7h12M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7m-7.5 0 .6 12.03A2 2 0 0 0 10.09 21h3.82a2 2 0 0 0 1.99-1.97L16.5 7" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
      <ConfirmModal
        isOpen={folderToDelete !== null}
        title="폴더를 삭제할까요?"
        message={
          folderToDelete
            ? `'${folderToDelete.name}' 폴더를 삭제하면 되돌릴 수 없습니다.`
            : ""
        }
        confirmLabel="삭제"
        onConfirm={handleConfirmDelete}
        onClose={() => setFolderToDelete(null)}
      />
    </nav>
  );
}
