"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (!session) {
        router.replace("/login");
        return;
      }
      setIsChecking(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/login");
        }
      }
    );

    // Restoring the page from the browser's back/forward cache resumes the
    // previous render (and React state) without re-running this effect, so
    // navigating Back after the session is gone would otherwise still show
    // the last-rendered protected content. Re-check on that restore.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsChecking(true);
        checkSession();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex h-full flex-1 items-center justify-center bg-white">
        <span className="text-sm text-zinc-400">확인 중...</span>
      </div>
    );
  }

  return <>{children}</>;
}
