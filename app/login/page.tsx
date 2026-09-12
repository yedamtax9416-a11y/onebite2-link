import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <main className="bg-mesh flex flex-1 items-center justify-center px-4 py-10">
        <LoginForm />
      </main>
    </div>
  );
}
