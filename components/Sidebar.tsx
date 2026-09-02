"use client";

import type { Folder } from "./types";
import FolderList from "./FolderList";

type SidebarProps = {
  folders: Folder[];
  totalCount: number;
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
};

export default function Sidebar({
  folders,
  totalCount,
  selectedFolderId,
  onSelectFolder,
}: SidebarProps) {
  const isAllSelected = selectedFolderId === null;

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-1 border-r border-zinc-200/70 bg-white p-4 shadow-[1px_0_0_0_rgba(0,0,0,0.02)]">
      <button
        type="button"
        onClick={() => onSelectFolder(null)}
        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
          isAllSelected
            ? "gradient-bg text-white shadow-md shadow-indigo-500/30"
            : "text-zinc-600 hover:bg-zinc-100"
        }`}
      >
        <span>전체</span>
        <span
          className={
            isAllSelected
              ? "text-white/80"
              : "text-zinc-400"
          }
        >
          {totalCount}
        </span>
      </button>
      <FolderList
        folders={folders}
        selectedFolderId={selectedFolderId}
        onSelectFolder={onSelectFolder}
      />
    </aside>
  );
}
