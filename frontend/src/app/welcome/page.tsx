import Link from "next/link";

export default function Home() {
  return (
    <main>
      TEST
      <Link href={ "/auth/login" }>LEts go!</Link>
    </main>
  );
}