import Link from "next/link";
import { LOGIN_PAGE } from "@/constants/pages-url.constants";

export default function Home() {
  return (
    <main>
      <Link href={ LOGIN_PAGE }>Lets go!</Link>
    </main>
  );
}