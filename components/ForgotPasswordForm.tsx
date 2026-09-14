"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Toast from "./Toast";

function toKoreanErrorMessage(message: string) {
  if (/valid email|unable to validate email/i.test(message)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "재설정 링크 발송에 실패했습니다. 다시 시도해주세요.";
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const canSubmit = email.trim() !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) {
        setErrorMessage(toKoreanErrorMessage(error.message));
        return;
      }

      setIsSent(true);
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

        {isSent ? (
          <p className="text-center text-sm text-zinc-600">
            입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.
            <br />
            이메일함을 확인해주세요.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="forgot-password-email"
                  className="text-sm font-semibold text-zinc-700"
                >
                  이메일
                </label>
                <input
                  id="forgot-password-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="gradient-bg rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md"
            >
              {isSubmitting ? "발송 중..." : "비밀번호 재설정 링크 발송"}
            </button>
          </>
        )}

        <p className="text-center text-xs text-zinc-400">
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </form>
    </>
  );
}
