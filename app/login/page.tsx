import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <main className="bg-mesh flex flex-1 items-center justify-center px-4 py-10">
        <LoginForm />
      </main>
    </div>
  );
}
