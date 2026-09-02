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
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-zinc-200 bg-white p-4">
      <button
        type="button"
        onClick={() => onSelectFolder(null)}
        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isAllSelected
            ? "bg-zinc-900 text-white"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
      >
        <span>전체</span>
        <span className={isAllSelected ? "text-zinc-300" : "text-zinc-400"}>
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
