import { NextRequest, NextResponse } from "next/server";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

type LinkPreview = {
  title: string | null;
  description: string | null;
  image: string | null;
};

const EMPTY_PREVIEW: LinkPreview = { title: null, description: null, image: null };

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function extractMetaContent(html: string, keys: string[]): string | null {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const key of keys) {
    for (const tag of metaTags) {
      const nameMatch = tag.match(/(?:property|name)\s*=\s*["']([^"']+)["']/i);
      if (!nameMatch || nameMatch[1].toLowerCase() !== key) continue;
      const contentMatch = tag.match(/content\s*=\s*["']([^"']*)["']/i);
      if (contentMatch) return decodeHtmlEntities(contentMatch[1].trim());
    }
  }
  return null;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : null;
}

function detectCharset(contentType: string | null, headBytes: string) {
  const headerMatch = contentType?.match(/charset=([^;]+)/i);
  if (headerMatch) return headerMatch[1].trim().toLowerCase();

  const metaMatch = headBytes.match(
    /<meta[^>]+charset=["']?\s*([a-z0-9_-]+)/i
  );
  if (metaMatch) return metaMatch[1].trim().toLowerCase();

  return "utf-8";
}

function decodeBuffer(buffer: ArrayBuffer, charset: string) {
  try {
    return new TextDecoder(charset).decode(buffer);
  } catch {
    return new TextDecoder("utf-8").decode(buffer);
  }
}

function resolveUrl(maybeRelative: string | null, base: string) {
  if (!maybeRelative) return null;
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");
  if (!targetUrl) {
    return NextResponse.json(EMPTY_PREVIEW, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
  } catch {
    return NextResponse.json(EMPTY_PREVIEW, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(parsed.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        // Many Korean sites (naver.com included) serve a stripped-down
        // page or a different charset when no Accept-Language is sent.
        "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
      },
    });

    if (!response.ok) {
      return NextResponse.json(EMPTY_PREVIEW);
    }

    const buffer = await response.arrayBuffer();
    const head = new TextDecoder("utf-8").decode(buffer.slice(0, 2048));
    const charset = detectCharset(response.headers.get("content-type"), head);
    const html = decodeBuffer(buffer, charset);
    const finalUrl = response.url || parsed.toString();

    const title =
      extractMetaContent(html, ["og:title", "twitter:title"]) ??
      extractTitleTag(html);
    const description = extractMetaContent(html, [
      "og:description",
      "twitter:description",
      "description",
    ]);
    const image = resolveUrl(
      extractMetaContent(html, ["og:image", "twitter:image"]),
      finalUrl
    );

    const preview: LinkPreview = {
      title: title ? title.slice(0, 300) : null,
      description: description ? description.slice(0, 500) : null,
      image,
    };

    return NextResponse.json(preview);
  } catch (error) {
    console.error("링크 미리보기 정보를 가져오지 못했습니다.", error);
    return NextResponse.json(EMPTY_PREVIEW);
  } finally {
    clearTimeout(timeout);
  }
}
