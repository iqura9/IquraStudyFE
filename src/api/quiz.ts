import { ICreateQuizValues } from "pages/quizPage/CreateQuiz";

import { authApi } from "./auth.api";

export const createQuiz = async (data: ICreateQuizValues) => {
  const response = await authApi.post("Quiz", data);
  return response.data;
};

export const getQuiz = async (id: string | undefined | null | number) => {
  const response = await authApi.get(`Quiz/${id}`);
  return response.data;
};
