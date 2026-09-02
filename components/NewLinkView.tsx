"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import NewLinkForm from "./NewLinkForm";
import { folders, links } from "./mock-data";

export default function NewLinkView() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    null
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        folders={folders}
        totalCount={links.length}
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
      />
      <main className="bg-mesh flex flex-1 flex-col items-center overflow-y-auto py-10">
        <NewLinkForm folders={folders} />
      </main>
    </div>
  );
}
