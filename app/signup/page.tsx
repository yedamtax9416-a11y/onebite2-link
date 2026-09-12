import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <main className="bg-mesh flex flex-1 items-center justify-center px-4 py-10">
        <SignupForm />
      </main>
    </div>
  );
}
