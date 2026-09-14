"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Toast from "./Toast";

function toKoreanErrorMessage(message: string) {
  if (/password should be at least|password.*short/i.test(message)) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }
  if (/auth session missing/i.test(message)) {
    return "재설정 링크가 만료되었거나 올바르지 않습니다. 다시 요청해주세요.";
  }
  return "비밀번호 재설정에 실패했습니다. 다시 시도해주세요.";
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = password !== "" && passwordConfirm !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setErrorMessage(toKoreanErrorMessage(error.message));
        return;
      }

      await supabase.auth.signOut();
      router.push("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast message={errorMessage} onClose={() => setErrorMessage(null)} />
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-zinc-200/70 bg-white p-8 shadow-xl shadow-zinc-200/60"
      >
        <Link href="/" className="flex items-center justify-center gap-2">
          <span className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md shadow-indigo-500/30">
            한
          </span>
          <span className="gradient-text text-xl font-extrabold tracking-tight">
            한입 링크
          </span>
        </Link>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="reset-password"
              className="text-sm font-semibold text-zinc-700"
            >
              새 비밀번호
            </label>
            <input
              id="reset-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
              className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="reset-password-confirm"
              className="text-sm font-semibold text-zinc-700"
            >
              새 비밀번호 확인
            </label>
            <input
              id="reset-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="새 비밀번호를 다시 입력하세요"
              className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="gradient-bg rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md"
        >
          {isSubmitting ? "변경 중..." : "비밀번호 재설정"}
        </button>
      </form>
    </>
  );
}
