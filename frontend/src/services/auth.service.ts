import { IAuthForm, IAuthResponse, IRegisterForm } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";
import { http, httpUnauthorized } from "@/http-client";
import { AxiosError, isAxiosError } from "axios";
import { cleanString } from "@/utils";

const unknownErrorMsg = "Возникла непредвиденная ошибка, мы уже работаем над этим";

export const authService = {
  async register(form: IRegisterForm): Promise<string | null> {
    try {
      await httpUnauthorized.post("/auth/register",
        {
          "login": cleanString(form.email),
          "username": cleanString(form.username),
          "password": cleanString(form.password),
          "lastName": cleanString(form.lastName),
          "firstName": cleanString(form.lastName)
        });

      return null;
    } catch (err: any) {
      if (!isAxiosError(err)) {
        return unknownErrorMsg;
      }
      let error = (<AxiosError> err);
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
        return "Ошибки валидации\n" + error.response.data;
      }

      return unknownErrorMsg;
    }
  },

  async login(form: IAuthForm): Promise<string | null> {
    try {
      const response = await httpUnauthorized.post<IAuthResponse>(
        "/auth/login",
        {
          "login": cleanString(form.email),
          "password": cleanString(form.password)
        });
      if (response.status === 200) {
        if (response.data.token) {
          saveTokenStorage(response.data.token);
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

  async logout() {
    const response = await http.post("/auth/logout");

    if (response.data) {
      removeFromStorage();
    }

    return response;
  },

  async delete() {
    const response = await http.delete("/users");

    if (response.data) {
      removeFromStorage();
    }

    return response;
  }
};
