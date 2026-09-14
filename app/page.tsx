import Header from "@/components/Header";
import BookmarkDashboard from "@/components/BookmarkDashboard";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <div className="flex h-full flex-col bg-white">
        <Header />
        <BookmarkDashboard />
      </div>
    </AuthGuard>
  );
}
