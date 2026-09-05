"use client";

import { useState } from "react";
import Link from "next/link";
import FolderModal from "./FolderModal";
import { useFolders } from "./FolderContext";

export default function Header() {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const { addFolder } = useFolders();

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-zinc-200/70 bg-white/80 px-6 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <span className="gradient-bg flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md shadow-indigo-500/30">
            한
          </span>
          <span className="gradient-text text-xl font-extrabold tracking-tight">
            한입 링크
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFolderModalOpen(true)}
            className="flex items-center gap-1 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-100"
          >
            <span className="text-base leading-none">+</span>
            새 폴더
          </button>
          <Link
            href="/new"
            className="gradient-bg flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40"
          >
            <span className="text-base leading-none">+</span>
            새 링크
          </Link>
        </div>
      </header>
      <FolderModal
        isOpen={isFolderModalOpen}
        title="새 폴더 만들기"
        description="폴더 이름을 입력하세요."
        onClose={() => setIsFolderModalOpen(false)}
        onSave={(name) => {
          addFolder(name);
          setIsFolderModalOpen(false);
        }}
      />
    </>
  );
}
