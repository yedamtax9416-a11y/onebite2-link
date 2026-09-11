"use client";

import { useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import LinkGrid from "./LinkGrid";
import { useFolders } from "./FolderContext";
import { useLinks } from "./LinkContext";

export default function BookmarkDashboard() {
  const { folders } = useFolders();
  const { links } = useLinks();
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    null
  );

  const filteredLinks = useMemo(
    () =>
      selectedFolderId === null
        ? links
        : links.filter((link) => link.folderId === selectedFolderId),
    [links, selectedFolderId]
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
        <LinkGrid links={filteredLinks} folders={folders} />
      </main>
    </div>
  );
}
