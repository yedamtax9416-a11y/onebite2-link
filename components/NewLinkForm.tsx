"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "./types";
import { useLinks } from "./LinkContext";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const { addLink, isAddingLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isAddingLink) return;

    await addLink(url, folderId || null);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-5 rounded-2xl border border-zinc-200/70 bg-white p-8 shadow-xl shadow-zinc-200/60"
    >
      <div>
        <h2 className="gradient-text text-lg font-extrabold">새 링크 추가</h2>
        <p className="mt-1 text-xs text-zinc-400">
          저장할 링크 주소와 폴더를 입력하세요.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="link-url"
          className="text-sm font-semibold text-zinc-700"
        >
          링크 주소
        </label>
        <input
          id="link-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="link-folder"
          className="text-sm font-semibold text-zinc-700"
        >
          폴더
        </label>
        <select
          id="link-folder"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
        >
          <option value="">폴더 선택 안 함</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isAddingLink}
        className="gradient-bg mt-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md"
      >
        {isAddingLink ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
