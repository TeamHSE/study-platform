import { IAuthForm, IAuthResponse } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";
import { http, httpUnauthorized } from "@/http-client";
import { isAxiosError } from "axios";

const unknownErrorMsg = "Возникла непредвиденная ошибка, мы уже работаем над этим";

export const authService = {
  async register(form: IAuthForm): Promise<string | null> {
    try {
      await httpUnauthorized.post("/auth/register",
        {
          "login": form.email,
          "password": form.password
        });

      return null;
    } catch (error) {
      if (!isAxiosError(error)) {
        return unknownErrorMsg;
      }
      if (error.code === "ECONNABORTED") {
        return "Время ожидания истекло, попробуйте еще раз";
      }
      if (error.response?.status === 409) {
        return "Логин уже занят";
      }
      if (error.response?.status === 400) {
        return "Пароль слишком прост";
      }
      if (error.response?.status === 422) {
        return "Ошибки валидации";
      }

      return unknownErrorMsg;
    }
  },

  async login(form: IAuthForm): Promise<string | null> {
    try {
      const response = await httpUnauthorized.post<IAuthResponse>(
        "/auth/login",
        {
          "login": form.email,
          "password": form.password
        });
      if (response.status === 200) {
        if (response.data.accessToken) {
          saveTokenStorage(response.data.accessToken);
        }
      }
    } catch (error: any) {
      if (!isAxiosError(error)) {
        return unknownErrorMsg;
      }

      if (error.code === "ECONNABORTED") {
        return "Время ожидания истекло, попробуйте еще раз";
      }

      if (error.response?.status === 400) {
        return "Некорректный логин или пароль";
      }

      return unknownErrorMsg;
    }

    return null;
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
    const response = await http.post<boolean>("/auth/logout");

    if (response.data) {
      removeFromStorage();
    }

    return response;
  }
};
