import type { Metadata } from "next";
import Header from "@/components/Header";
import NewLinkView from "@/components/NewLinkView";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "새 링크 추가",
};

export default function NewLinkPage() {
  return (
    <AuthGuard>
      <div className="flex h-full flex-col bg-white">
        <Header />
        <NewLinkView />
      </div>
    </AuthGuard>
  );
}
