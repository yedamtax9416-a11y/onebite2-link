import type { LinkItem } from "./types";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const THUMBNAIL_GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-fuchsia-500 to-rose-500",
  "from-sky-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-fuchsia-500",
];

function getGradient(seed: string) {
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return THUMBNAIL_GRADIENTS[hash % THUMBNAIL_GRADIENTS.length];
}

export default function LinkCard({
  link,
  onEdit,
}: {
  link: LinkItem;
  onEdit: (link: LinkItem) => void;
}) {
  const hostname = getHostname(link.url);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm shadow-zinc-200/50 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-xl hover:shadow-indigo-500/15"
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEdit(link);
        }}
        aria-label={`${link.title || hostname} 링크 수정`}
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-zinc-500 opacity-0 shadow-sm transition-opacity hover:bg-white hover:text-zinc-700 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
        </svg>
      </button>
      <div
        className={`flex h-32 items-center justify-center bg-gradient-to-br text-3xl font-bold text-white/90 ${getGradient(
          hostname
        )}`}
      >
        {hostname[0]?.toUpperCase()}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 group-hover:gradient-text">
          {link.title || hostname}
        </h3>
        {link.description && (
          <p className="line-clamp-2 text-xs text-zinc-500">
            {link.description}
          </p>
        )}
        <span className="mt-auto pt-2 text-xs font-medium text-zinc-400">
          {hostname}
        </span>
      </div>
    </a>
  );
}
