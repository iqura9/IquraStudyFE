import axios from "axios";
import { getAccessToken, getRefreshToken, logOut } from "helpers";
import {
  GenericResponse,
  ILoginQuery,
  ILoginResponse,
  IRegisterQuery,
  IUserResponse,
} from "types/authTypes";

import { baseURL } from "./baseUrl";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTokenFn = async (
  accessToken: string | null,
  refreshToken: string | null,
) => {
  try {
    const response = await axiosInstance.post<ILoginResponse>(
      "Token/refresh-token",
      {
        accessToken,
        refreshToken,
      },
    );
    return response.data;
  } catch (e) {
    logOut();
  }
};

axiosInstance.interceptors.response.use(
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
          refresh_Token,
        );

        if (response) {
          const { refreshToken, accessToken } = response;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken,
              refreshToken,
            }),
          );

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  },
);

export const registerUserFn = async (user: IRegisterQuery) => {
  const response = await axiosInstance.post<GenericResponse>(
    "Account/register",
    user,
  );
  return response.data;
};

export const loginUserFn = async (user: ILoginQuery) => {
  const response = await axiosInstance.post<ILoginResponse>(
    "Account/login",
    user,
  );
  return response.data;
};

export const getMeFn = async () => {
  const response = await axiosInstance.get<IUserResponse>("Account/GetMe");
  return response.data;
};

export const checkIsValidToken = async () => {
  const response = await axiosInstance.get<IUserResponse>("Account/GetMe");
  return response.data;
};
