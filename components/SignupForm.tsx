"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Toast from "./Toast";

function toKoreanErrorMessage(message: string) {
  if (/already registered|already exists/i.test(message)) {
    return "이미 가입된 이메일입니다.";
  }
  if (/password should be at least|password.*short/i.test(message)) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }
  if (/valid email|unable to validate email/i.test(message)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "회원가입에 실패했습니다. 다시 시도해주세요.";
}

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit =
    email.trim() !== "" && password !== "" && passwordConfirm !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
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
              htmlFor="signup-email"
              className="text-sm font-semibold text-zinc-700"
            >
              이메일
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-password"
              className="text-sm font-semibold text-zinc-700"
            >
              비밀번호
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-password-confirm"
              className="text-sm font-semibold text-zinc-700"
            >
              비밀번호 확인
            </label>
            <input
              id="signup-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="gradient-bg rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md"
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>

        <p className="text-center text-xs text-zinc-400">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            로그인
          </Link>
        </p>
      </form>
    </>
  );
}
