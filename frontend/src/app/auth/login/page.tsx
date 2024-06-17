"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COURSES_PAGE, REGISTER_PAGE } from "@/constants/pages-url.constants";
import { authService } from "@/services/auth.service";

export default function Login() {
  return (
    <Suspense fallback={ <div>Загрузка...</div> }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [ login, setLogin ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ error, setError ] = useState<string>("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || COURSES_PAGE;
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await authService.login(login, password, redirect, router, setError);
  };

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          value={ login }
          onChange={ (e) => setLogin(e.target.value) }
          placeholder="Логин (почта)"
          required
        />
        <input
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Пароль"
          required
        />
        <button type="submit">Войти</button>
      </form>

      <Link href={ REGISTER_PAGE }>Зарегистрироваться</Link>
      { error && <p>{ error }</p> }
    </div>
  );
}