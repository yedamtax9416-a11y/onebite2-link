"use client";

import { useState } from "react";
import type { Folder, LinkItem } from "./types";
import LinkCard from "./LinkCard";
import LinkModal from "./LinkModal";
import ConfirmModal from "./ConfirmModal";
import { useLinks } from "./LinkContext";

export default function LinkGrid({
  links,
  folders,
}: {
  links: LinkItem[];
  folders: Folder[];
}) {
  const { updateLink, isUpdatingLink, removeLink } = useLinks();
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);

  const handleConfirmDelete = () => {
    if (!linkToDelete) return;
    removeLink(linkToDelete.id);
    setLinkToDelete(null);
  };

  if (links.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <div className="gradient-bg flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-lg shadow-indigo-500/25">
          🔗
        </div>
        <p className="text-sm font-medium text-zinc-400">
          등록된 링크가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onEdit={setLinkToEdit}
          onDelete={setLinkToDelete}
        />
      ))}
      <LinkModal
        key={linkToEdit ? linkToEdit.id : "closed"}
        isOpen={linkToEdit !== null}
        link={linkToEdit}
        folders={folders}
        isSaving={isUpdatingLink}
        onClose={() => setLinkToEdit(null)}
        onSave={async (updates) => {
          if (linkToEdit) {
            await updateLink(linkToEdit.id, updates);
          }
          setLinkToEdit(null);
        }}
      />
      <ConfirmModal
        isOpen={linkToDelete !== null}
        title="링크를 삭제할까요?"
        message={
          linkToDelete
            ? `'${linkToDelete.title || linkToDelete.url}' 링크를 삭제하면 되돌릴 수 없습니다.`
            : ""
        }
        confirmLabel="삭제"
        onConfirm={handleConfirmDelete}
        onClose={() => setLinkToDelete(null)}
      />
    </div>
  );
}
