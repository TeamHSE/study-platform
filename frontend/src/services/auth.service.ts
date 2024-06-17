import { IAuthResponse } from "@/types/auth.types";

import { removeFromStorage, saveTokenStorage } from "./auth-token.service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { http, httpUnauthorized } from "@/http-client";
import { isAxiosError } from "axios";
import { LOGIN_PAGE } from "@/constants/pages-url.constants";

const unknownErrorMsg = "Возникла непредвиденная ошибка, мы уже работаем над этим";

export const authService = {
  async register(login: string, password: string, router: AppRouterInstance, setErrorCallbackFn: (msg: string) => void) {
    try {
      const response = await http.post("/auth/register", { login, password });
      if (response.status === 200) {
        router.replace(LOGIN_PAGE);
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
  },

  async login(login: string, password: string, redirect: string, router: AppRouterInstance, setErrorCallbackFn: (msg: string) => void) {
    try {
      const response = await http.post<IAuthResponse>("/auth/login", { login, password });
      if (response.status === 200) {
        if (response.data.accessToken) {
          saveTokenStorage(response.data.accessToken);
        }
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
  },

  async getNewTokens() {
    const response = await httpUnauthorized.post<IAuthResponse>(
      "/auth/login/access-token"
    );

    if (response.data.accessToken) {
      saveTokenStorage(response.data.accessToken);
    }

    return response;
  },

  async logout() {
    const response = await httpUnauthorized.post<boolean>("/auth/logout");

    if (response.data) {
      removeFromStorage();
    }

    return response;
  }
};
