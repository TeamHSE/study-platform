import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const unknownErrorMsg = "Возникла непредвиденная ошибка, мы уже работаем над этим";

export const callRegister = async (login: string, password: string, router: AppRouterInstance, setErrorCallbackFn: (msg: string) => void) => {
  try {
    const response = await axios.post("/api/auth/register", { login, password }, { timeout: 5000 });
    if (response.status === 200) {
      router.replace("/auth/login");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
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
    const response = await axios.post("/api/auth/login", { login, password }, { timeout: 5000 });
    if (response.status === 200) {
      router.replace(redirect);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
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