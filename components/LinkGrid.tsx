import type { LinkItem } from "./types";
import LinkCard from "./LinkCard";

export default function LinkGrid({ links }: { links: LinkItem[] }) {
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
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
