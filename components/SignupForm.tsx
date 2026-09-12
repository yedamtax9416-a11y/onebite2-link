import Link from "next/link";

export default function SignupForm() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-zinc-200/70 bg-white p-8 shadow-xl shadow-zinc-200/60">
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
            placeholder="비밀번호를 다시 입력하세요"
            className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </div>
      </div>

      <button
        type="submit"
        className="gradient-bg rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40"
      >
        회원가입
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
  );
}
