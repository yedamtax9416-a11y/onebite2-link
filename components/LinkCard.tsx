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

export default function LinkCard({ link }: { link: LinkItem }) {
  const hostname = getHostname(link.url);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm shadow-zinc-200/50 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-xl hover:shadow-indigo-500/15"
    >
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
