import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-6">
      <UserButton />
      <p>hello world</p>
    </main>
  );
}
