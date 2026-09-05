"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "./types";
import { folders as initialFolders } from "./mock-data";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setFolders((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, count: 0 },
    ]);
  };

  const removeFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  return (
    <FolderContext.Provider value={{ folders, addFolder, removeFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
