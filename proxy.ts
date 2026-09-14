import { NextResponse, type NextRequest } from "next/server";

// Must match the storage key AuthGuard's cookie-backed session storage
// writes to (see lib/supabase.ts): `sb-<project-ref>-auth-token`.
function getAuthCookieName() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return null;
  const projectRef = new URL(supabaseUrl).hostname.split(".")[0];
  return `sb-${projectRef}-auth-token`;
}

const authCookieName = getAuthCookieName();

// AuthGuard only re-checks the session from client-side React state, which
// doesn't notice a cookie deleted out-of-band (e.g. via devtools) until some
// client-side effect happens to re-run. Gating here means every navigation,
// including a plain refresh, is redirected the moment the cookie is gone.
export function proxy(request: NextRequest) {
  const hasSession = authCookieName
    ? Boolean(request.cookies.get(authCookieName)?.value)
    : false;

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup|forgot-password|reset-password).*)",
  ],
};
