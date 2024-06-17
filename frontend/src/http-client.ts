import axios from "axios";
import { getAccessToken, removeFromStorage } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";

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
        await authService.getNewTokens();
        return http.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          removeFromStorage();
        }
      }
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