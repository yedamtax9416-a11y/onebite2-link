import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <main className="bg-mesh flex flex-1 items-center justify-center px-4 py-10">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
