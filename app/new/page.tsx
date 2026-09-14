import Header from "@/components/Header";
import NewLinkView from "@/components/NewLinkView";
import AuthGuard from "@/components/AuthGuard";

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
