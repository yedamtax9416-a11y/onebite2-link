import type { Metadata } from "next";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <main className="bg-mesh flex flex-1 items-center justify-center px-4 py-10">
        <ResetPasswordForm />
      </main>
    </div>
  );
}
