"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { callRegister } from "../api-service";
import { isValidEmail, matchPasswords } from "../utils";
import Link from "next/link";

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

    await callRegister(login, password, router, setError);
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

      <Link href={ "/auth/login" }>Войти в существующий</Link>
    </div>
  );
}
