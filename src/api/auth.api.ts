import axios from "axios";
import { getAccessToken, getRefreshToken, logOut } from "helpers";
import {
  GenericResponse,
  ILoginQuery,
  ILoginResponse,
  IRegisterQuery,
  IUserResponse,
} from "types/authTypes";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTokenFn = async (
  accessToken: string | null,
  refreshToken: string | null
) => {
  try {
    const response = await authApi.post<ILoginResponse>("Token/refresh-token", {
      accessToken,
      refreshToken,
    });
    return response.data;
  } catch (e) {
    logOut();
  }
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const access_Token = getAccessToken();
        const refresh_Token = getRefreshToken();
        if (!access_Token || !refresh_Token) return Promise.reject(error);

        const response = await refreshAccessTokenFn(
          access_Token,
          refresh_Token
        );

        if (response) {
          const { refreshToken, accessToken } = response;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken,
              refreshToken,
            })
          );

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return authApi(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export const registerUserFn = async (user: IRegisterQuery) => {
  const response = await authApi.post<GenericResponse>(
    "Account/register",
    user
  );
  return response.data;
};

export const loginUserFn = async (user: ILoginQuery) => {
  const response = await authApi.post<ILoginResponse>("Account/login", user);
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<IUserResponse>("Account/GetMe");
  return response.data;
};

export const checkIsValidToken = async () => {
  const response = await authApi.get<IUserResponse>("Account/GetMe");
  return response.data;
};
