import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const callRegister = async (login: string, password: string, router: AppRouterInstance, setErrorCallbackFn: (msg: string) => void) => {
  try {
    const response = await axios.post("/api/auth/register", { login, password });
    if (response.status === 200) {
      router.push("/auth/login");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        setErrorCallbackFn("Login already taken");
      } else if (error.response?.status === 400) {
        setErrorCallbackFn("Password is too simple");
      } else if (error.response?.status === 422) {
        setErrorCallbackFn("Validation errors");
      } else {
        setErrorCallbackFn("An error occurred");
      }
    } else {
      setErrorCallbackFn("An unknown error occurred");
    }
  }
};

export const callLogin = async (login: string, password: string, redirect: string, router: AppRouterInstance, setErrorCallbackFn: (msg: string) => void) => {
  try {
    const response = await axios.post("/api/auth/login", { login, password });
    if (response.status === 200) {
      router.push(redirect);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        setErrorCallbackFn("Invalid login or password");
      } else {
        setErrorCallbackFn("An error occurred");
      }
    } else {
      setErrorCallbackFn("An unknown error occurred");
    }
  }
};