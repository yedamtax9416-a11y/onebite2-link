"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Folder } from "./types";
import FolderList from "./FolderList";
import { supabase } from "@/lib/supabase";

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
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } finally {
      setIsSigningOut(false);
    }
  };

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
      <button
        type="button"
        onClick={handleLogout}
        disabled={isSigningOut}
        className="mt-auto rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSigningOut ? "로그아웃 중..." : "로그아웃"}
      </button>
      <Link
        href="/privacy"
        className="rounded-xl px-3 py-2 text-left text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-600"
      >
        개인정보 처리방침
      </Link>
    </aside>
  );
}
