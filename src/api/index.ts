import axios from "axios";
import {
  AccountApiFactory,
  AnswerApiFactory,
  UsersApiFactory,
} from "generated-api/api";

import { axiosInstance } from "./auth.api";

const apiAxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  ...axiosInstance,
});

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
);
