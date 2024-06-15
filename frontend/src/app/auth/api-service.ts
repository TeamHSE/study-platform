import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import http from "@/http-client";
import { isAxiosError } from "axios";

const unknownErrorMsg = "Возникла непредвиденная ошибка, мы уже работаем над этим";

export const callRegister = async (login: string, password: string, router: AppRouterInstance, setErrorCallbackFn: (msg: string) => void) => {
  try {
    const response = await http.post("/auth/register", { login, password });
    if (response.status === 200) {
      router.replace("/auth/login");
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        setErrorCallbackFn("Время ожидания истекло, попробуйте еще раз");
        return;
      }
      if (error.response?.status === 409) {
        setErrorCallbackFn("Логин уже занят");
      } else if (error.response?.status === 400) {
        setErrorCallbackFn("Пароль слишком прост");
      } else if (error.response?.status === 422) {
        setErrorCallbackFn("Ошибки валидации");
      } else {
        setErrorCallbackFn(unknownErrorMsg);
      }
    } else {
      setErrorCallbackFn(unknownErrorMsg);
    }
  }
};

export const callLogin = async (login: string, password: string, redirect: string, router: AppRouterInstance, setErrorCallbackFn: (msg: string) => void) => {
  try {
    const response = await http.post("/auth/login", { login, password });
    if (response.status === 200) {
      router.replace(redirect);
    }
  } catch (error: any) {
    if (isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        setErrorCallbackFn("Время ожидания истекло, попробуйте еще раз");
        return;
      }
      if (error.response?.status === 400) {
        setErrorCallbackFn("Некорректный логин или пароль");
      } else {
        setErrorCallbackFn(unknownErrorMsg);
      }
    } else {
      setErrorCallbackFn(unknownErrorMsg);
    }
  }
};