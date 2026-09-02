"use client";

import { useState } from "react";
import type { Folder } from "./types";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-lg flex-col gap-5 p-6"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="link-url"
          className="text-sm font-medium text-zinc-700"
        >
          링크 주소
        </label>
        <input
          id="link-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="link-folder"
          className="text-sm font-medium text-zinc-700"
        >
          폴더
        </label>
        <select
          id="link-folder"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900"
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
        className="mt-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      >
        저장
      </button>
    </form>
  );
}
