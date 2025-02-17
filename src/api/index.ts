import axios, { AxiosInstance } from "axios";
import {
  AccountApiFactory,
  AnswerApiFactory,
  CompetitionApiFactory,
  ParicipationApiFactory,
  ProblemApiFactory,
  UsersApiFactory,
} from "generated-api/api";

import { axiosInstance } from "./auth.api";

function cloneAxiosInstance(
  instance: AxiosInstance,
  baseURLOverride: string,
): AxiosInstance {
  const newInstance = axios.create({
    ...instance.defaults,
    baseURL: baseURLOverride,
  });

  (instance.interceptors.request as any).handlers.forEach(
    (interceptor: any) => {
      if (interceptor.fulfilled || interceptor.rejected) {
        newInstance.interceptors.request.use(
          interceptor.fulfilled,
          interceptor.rejected,
        );
      }
    },
  );

  (instance.interceptors.response as any).handlers.forEach(
    (interceptor: any) => {
      if (interceptor.fulfilled || interceptor.rejected) {
        newInstance.interceptors.response.use(
          interceptor.fulfilled,
          interceptor.rejected,
        );
      }
    },
  );

  return newInstance;
}

const apiAxiosInstance = cloneAxiosInstance(
  axiosInstance,
  "http://localhost:5000",
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
