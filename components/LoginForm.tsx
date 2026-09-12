import Link from "next/link";

export default function LoginForm() {
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
            htmlFor="login-email"
            className="text-sm font-semibold text-zinc-700"
          >
            이메일
          </label>
          <input
            id="login-email"
            type="email"
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
            placeholder="비밀번호를 입력하세요"
            className="rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </div>
      </div>

      <button
        type="submit"
        className="gradient-bg rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40"
      >
        로그인
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
  );
}
