"use client";

import { useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import LinkGrid from "./LinkGrid";
import { folders, links } from "./mock-data";

export default function BookmarkDashboard() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    null
  );

  const filteredLinks = useMemo(
    () =>
      selectedFolderId === null
        ? links
        : links.filter((link) => link.folderId === selectedFolderId),
    [selectedFolderId]
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        folders={folders}
        totalCount={links.length}
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
      />
      <main className="bg-mesh flex flex-1 flex-col overflow-y-auto">
        <LinkGrid links={filteredLinks} />
      </main>
    </div>
  );
}
