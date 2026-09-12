"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Toast from "./Toast";

function toKoreanErrorMessage(message: string) {
  if (/invalid login credentials/i.test(message)) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (/email not confirmed/i.test(message)) {
    return "이메일 인증이 완료되지 않았습니다.";
  }
  return "로그인에 실패했습니다. 다시 시도해주세요.";
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = email.trim() !== "" && password !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(toKoreanErrorMessage(error.message));
        return;
      }

      router.push("/");
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
              htmlFor="login-email"
              className="text-sm font-semibold text-zinc-700"
            >
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="login-password"
              className="text-sm font-semibold text-zinc-700"
            >
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="gradient-bg rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-center text-xs text-zinc-400">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </form>
    </>
  );
}
