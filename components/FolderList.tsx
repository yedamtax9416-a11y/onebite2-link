"use client";

import { useState } from "react";
import type { Folder } from "./types";
import { useFolders } from "./FolderContext";
import ConfirmModal from "./ConfirmModal";
import FolderModal from "./FolderModal";

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
  const { renameFolder, removeFolder } = useFolders();
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);
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
            <div className="relative flex h-7 w-14 shrink-0 items-center justify-end">
              <span
                className={`absolute right-0 transition-opacity group-hover:opacity-0 ${
                  isSelected ? "text-white/80" : "text-zinc-400"
                }`}
              >
                {folder.count}
              </span>
              <div className="absolute right-0 flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFolderToEdit(folder);
                  }}
                  aria-label={`${folder.name} 폴더 수정`}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    isSelected
                      ? "text-white hover:bg-white/20"
                      : "text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700"
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
                    <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFolderToDelete(folder);
                  }}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
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
          </div>
        );
      })}
      <FolderModal
        key={folderToEdit ? folderToEdit.id : "closed"}
        isOpen={folderToEdit !== null}
        title="폴더 이름 수정"
        description="새로운 폴더 이름을 입력하세요."
        initialName={folderToEdit?.name}
        onClose={() => setFolderToEdit(null)}
        onSave={(name) => {
          if (folderToEdit) {
            renameFolder(folderToEdit.id, name);
          }
          setFolderToEdit(null);
        }}
      />
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
