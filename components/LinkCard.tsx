import type { LinkItem } from "./types";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const hostname = getHostname(link.url);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="flex h-32 items-center justify-center bg-zinc-100 text-2xl font-semibold text-zinc-300">
        {hostname[0]?.toUpperCase()}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 group-hover:underline">
          {link.title}
        </h3>
        {link.description && (
          <p className="line-clamp-2 text-xs text-zinc-500">
            {link.description}
          </p>
        )}
        <span className="mt-auto pt-2 text-xs text-zinc-400">{hostname}</span>
      </div>
    </a>
  );
}
