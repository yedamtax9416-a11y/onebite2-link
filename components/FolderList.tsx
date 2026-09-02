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
      <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-zinc-400">
        폴더
      </p>
      {folders.map((folder) => {
        const isSelected = folder.id === selectedFolderId;
        return (
          <button
            key={folder.id}
            type="button"
            onClick={() => onSelectFolder(folder.id)}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isSelected
                ? "bg-zinc-900 text-white"
                : "text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <span className="truncate">{folder.name}</span>
            <span className={isSelected ? "text-zinc-300" : "text-zinc-400"}>
              {folder.count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
