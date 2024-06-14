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
      setError("Invalid email address");
      return;
    }

    if (!matchPasswords(password, confirmPassword)) {
      setError("Passwords do not match");
      return;
    }

    await callRegister(login, password, router, setError);
  };

  return (
    <div>
      <h1>Register</h1>
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
        <input
          type="password"
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      { error && <p>{ error }</p> }

      <Link href={ "/auth/login" }>Already have an account</Link>
    </div>
  );
}
