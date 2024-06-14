"use client";

import { useState, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", { login, password });
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError("Login already taken");
        } else if (error.response?.status === 400) {
          setError("Password is too simple");
        } else if (error.response?.status === 422) {
          setError("Validation errors");
        } else {
          setError("An error occurred");
        }
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
