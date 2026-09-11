"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "./types";
import { supabase } from "@/lib/supabase";

type FolderContextValue = {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
  removeFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  useEffect(() => {
    const loadFolders = async () => {
      const { data, error } = await supabase
        .from("folders")
        .select("id, name")
        .order("id", { ascending: true });

      if (error) {
        console.error("폴더 목록을 불러오지 못했습니다.", error);
        return;
      }

      setFolders(
        data.map((folder) => ({
          id: String(folder.id),
          name: folder.name,
          count: 0,
        }))
      );
    };

    loadFolders();
  }, []);

  const addFolder = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || isAddingFolder) return;

    setIsAddingFolder(true);
    try {
      const { data, error } = await supabase
        .from("folders")
        .insert({ name: trimmed })
        .select("id, name")
        .single();

      if (error || !data) {
        console.error("폴더를 추가하지 못했습니다.", error);
        return;
      }

      setFolders((prev) => [
        ...prev,
        { id: String(data.id), name: data.name, count: 0 },
      ]);
    } finally {
      setIsAddingFolder(false);
    }
  };

  const renameFolder = async (id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const { error } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id);

    if (error) {
      console.error("폴더 이름을 수정하지 못했습니다.", error);
      return;
    }

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder
      )
    );
  };

  const removeFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        isAddingFolder,
        addFolder,
        renameFolder,
        removeFolder,
      }}
    >
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
