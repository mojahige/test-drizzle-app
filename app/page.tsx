import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <Link href="/users">Users</Link>
    </main>
  );
}
