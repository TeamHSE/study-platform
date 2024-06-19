import React, { Suspense } from "react";
import { Metadata } from "next";
import { Login } from "@/components/auth/Login";
import { LuLoader } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Вход"
};

export default function LoginPage() {
  return (
    <Suspense fallback={ <LuLoader /> }>
      <Login />
    </Suspense>
  );
}
