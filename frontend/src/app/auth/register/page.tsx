"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { isValidEmail, matchPasswords } from "../utils";
import Link from "next/link";
import { LOGIN_PAGE } from "@/constants/pages-url.constants";
import { authService } from "@/services/auth.service";

export default function Register() {
  const [ login, setLogin ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ error, setError ] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(login)) {
      setError("Некорректный адрес почты");
      return;
    }

    if (!matchPasswords(password, confirmPassword)) {
      setError("Пароли не совпадают");
      return;
    }

    await authService.register(login, password, router, setError);
  };

  return (
    <div>
      <h1>Регистрация</h1>
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
        <input
          type="password"
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
          placeholder="Повторите пароль"
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      { error && <p>{ error }</p> }

      <Link href={ LOGIN_PAGE }>Войти в существующий</Link>
    </div>
  );
}
