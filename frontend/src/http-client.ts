import axios from "axios";
import { getAccessToken, removeFromStorage } from "@/services/auth-token.service";
import { toast } from "sonner";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
};

// For auth requests
export const httpUnauthorized = axios.create(options);

// For general requests
export const http = axios.create(options);

http.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${ accessToken }`;

  return config;
});

http.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401
      && error.config
      && !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        return http.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          removeFromStorage();
        }
      }
    }

    if (error?.response?.status === 422) {
      if (error.response.data.errors) {
        const validationErrors = error.response.data.errors.map((e: any) => e.msg);
        toast.error(`Ошибки валидации:\n${ validationErrors.join("\n") }`,
          { duration: 10000, closeButton: true, important: true });
      } else {
        toast.error("Ошибки валидации");
      }
      return;
    }

    if (process.env.NODE_ENV == "production") {
      toast.error("Произошла ошибка, обратитесь к разработчикам",
        { duration: 10000, closeButton: true, important: true });
      return;
    }

    throw error;
  }
);

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === "object"
      ? message[0]
      : message
    : error.message;
};