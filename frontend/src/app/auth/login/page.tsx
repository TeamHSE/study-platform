import { Suspense } from "react";
import { Metadata } from "next";
import { Login } from "@/components/auth/Login";

export const metadata: Metadata = {
  title: "Вход"
};

export default function LoginPage() {
  return (
    <Suspense fallback={ <div>Загрузка...</div> }>
      <Login />
    </Suspense>
  );
}
