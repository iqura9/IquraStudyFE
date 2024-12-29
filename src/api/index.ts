// /* eslint-disable @typescript-eslint/ban-types */

import axios from "axios";
import {
  AccountApiFactory,
  AnswerApiFactory,
  UsersApiFactory,
} from "generated-api/api";

import { axiosInstance } from "./auth.api";

const apiAxiosInstance = axios.create({
  baseURL: "http://localhost:7080",
  ...axiosInstance,
});

type ApiFactory<T extends Function> = ReturnType<T>;
type CombineApi<T extends Function[]> = T extends [infer F, ...infer R]
  ? ApiFactory<F & Function> & CombineApi<R extends Function[] ? R : []>
  : {};

const createApi = <T extends Function[]>(...factories: T): CombineApi<T> =>
  factories.reduce(
    (api, factory) => ({
      ...api,
      ...factory(undefined, undefined, apiAxiosInstance),
    }),
    {} as CombineApi<T>,
  );

export const api = createApi(
  AccountApiFactory,
  AnswerApiFactory,
  UsersApiFactory,
);
