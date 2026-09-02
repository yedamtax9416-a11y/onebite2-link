import type { Folder } from "./types";

type FolderListProps = {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string) => void;
};

export default function FolderList({
  folders,
  selectedFolderId,
  onSelectFolder,
}: FolderListProps) {
  return (
    <nav className="mt-2 flex flex-col gap-1">
      <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
        폴더
      </p>
      {folders.map((folder) => {
        const isSelected = folder.id === selectedFolderId;
        return (
          <button
            key={folder.id}
            type="button"
            onClick={() => onSelectFolder(folder.id)}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              isSelected
                ? "gradient-bg text-white shadow-md shadow-indigo-500/30"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <span className="truncate">{folder.name}</span>
            <span className={isSelected ? "text-white/80" : "text-zinc-400"}>
              {folder.count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
