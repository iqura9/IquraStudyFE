/* eslint-disable @typescript-eslint/ban-types */

import { AccountApiFactory, AnswerApiFactory } from "generated-api";

import { axiosInstance } from "./auth.api";

type ApiFactory<T extends Function> = ReturnType<T>;
type CombineApi<T extends Function[]> = T extends [infer F, ...infer R]
  ? ApiFactory<F & Function> & CombineApi<R extends Function[] ? R : []>
  : {};

const createApi = <T extends Function[]>(...factories: T): CombineApi<T> =>
  factories.reduce(
    (api, factory) => ({
      ...api,
      ...factory(undefined, undefined, axiosInstance),
    }),
    {} as CombineApi<T>,
  );

export const api = createApi(AccountApiFactory, AnswerApiFactory);
