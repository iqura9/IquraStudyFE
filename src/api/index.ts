import axios from "axios";
import {
  AccountApiFactory,
  AnswerApiFactory,
  CompetitionApiFactory,
  ParicipationApiFactory,
  ProblemApiFactory,
  UsersApiFactory,
} from "generated-api/api";
import { getAccessToken, getRefreshToken } from "helpers/getToken";
import { logOut } from "helpers/logOut";
import { ILoginResponse } from "types/authTypes";

export const apiAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_2,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

apiAxiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTokenFn = async (
  accessToken: string | null,
  refreshToken: string | null,
) => {
  try {
    const response = await apiAxiosInstance.post<ILoginResponse>(
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

apiAxiosInstance.interceptors.response.use(
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
          return apiAxiosInstance(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  },
);
type FunctionReturnType<T> = T extends (...args: any) => infer R ? R : never;
type CombineFunctions<T extends Function[]> = T extends [infer F, ...infer R]
  ? FunctionReturnType<F> & CombineFunctions<R extends Function[] ? R : []>
  : {};

const createApi = <T extends Function[]>(
  ...factories: T
): CombineFunctions<T> =>
  factories.reduce(
    (api, factory) => ({
      ...api,
      ...factory(undefined, undefined, apiAxiosInstance),
    }),
    {} as CombineFunctions<T>,
  );

export const api = createApi(
  AccountApiFactory,
  AnswerApiFactory,
  UsersApiFactory,
  CompetitionApiFactory,
  ParicipationApiFactory,
  ProblemApiFactory,
);
