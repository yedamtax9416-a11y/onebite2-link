"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { LinkItem } from "./types";
import { supabase } from "@/lib/supabase";

type LinkContextValue = {
  links: LinkItem[];
  isAddingLink: boolean;
  addLink: (url: string, folderId: string | null) => Promise<void>;
};

const LinkContext = createContext<LinkContextValue | null>(null);

type LinkPreview = {
  title: string | null;
  description: string | null;
  image: string | null;
};

async function fetchLinkPreview(url: string): Promise<LinkPreview> {
  try {
    const response = await fetch(
      `/api/link-preview?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) {
      return { title: null, description: null, image: null };
    }
    return (await response.json()) as LinkPreview;
  } catch (error) {
    console.error("링크 미리보기 정보를 가져오지 못했습니다.", error);
    return { title: null, description: null, image: null };
  }
}

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);

  useEffect(() => {
    const loadLinks = async () => {
      const { data, error } = await supabase
        .from("links")
        .select("id, title, url, description, folder_id, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("링크 목록을 불러오지 못했습니다.", error);
        return;
      }

      setLinks(
        data.map((link) => ({
          id: String(link.id),
          title: link.title,
          url: link.url,
          description: link.description,
          folderId: link.folder_id === null ? null : String(link.folder_id),
          createdAt: link.created_at,
        }))
      );
    };

    loadLinks();
  }, []);

  const addLink = async (url: string, folderId: string | null) => {
    const trimmed = url.trim();
    if (!trimmed || isAddingLink) return;

    setIsAddingLink(true);
    try {
      const preview = await fetchLinkPreview(trimmed);

      const { data, error } = await supabase
        .from("links")
        .insert({
          url: trimmed,
          folder_id: folderId ? Number(folderId) : null,
          title: preview.title,
          description: preview.description,
          thumbnail_url: preview.image,
        })
        .select("id, title, url, description, folder_id, created_at")
        .single();

      if (error || !data) {
        console.error("링크를 추가하지 못했습니다.", error);
        return;
      }

      setLinks((prev) => [
        {
          id: String(data.id),
          title: data.title,
          url: data.url,
          description: data.description,
          folderId: data.folder_id === null ? null : String(data.folder_id),
          createdAt: data.created_at,
        },
        ...prev,
      ]);
    } finally {
      setIsAddingLink(false);
    }
  };

  return (
    <LinkContext.Provider value={{ links, isAddingLink, addLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}
