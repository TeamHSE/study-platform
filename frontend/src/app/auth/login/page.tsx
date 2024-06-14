"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [ login, setLogin ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ error, setError ] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { login, password });
      if (response.status === 200) {
        router.push(redirect);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setError("Invalid login or password");
        } else {
          setError("An error occurred");
        }
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          value={ login }
          onChange={ (e) => setLogin(e.target.value) }
          placeholder="Login"
          required
        />
        <input
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      <Link href={ "/auth/register" }>Need account</Link>
      { error && <p>{ error }</p> }
    </div>
  );
}
