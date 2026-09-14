import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Supabase persists the session in localStorage by default, so clearing
// cookies has no effect on it and access control can't be gated by a
// cookie. Store the session in a cookie instead so deleting it actually
// signs the user out on the next page load.
const cookieStorage = {
  getItem(key: string) {
    if (typeof document === "undefined") return null;
    const encodedKey = encodeURIComponent(key);
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${encodedKey}=`));
    if (!match) return null;
    return decodeURIComponent(match.slice(encodedKey.length + 1));
  },
  setItem(key: string, value: string) {
    if (typeof document === "undefined") return;
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    const maxAge = 60 * 60 * 24 * 7;
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
  },
  removeItem(key: string) {
    if (typeof document === "undefined") return;
    document.cookie = `${encodeURIComponent(key)}=; path=/; max-age=0`;
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: cookieStorage,
  },
});
