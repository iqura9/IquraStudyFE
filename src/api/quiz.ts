import { ICreateQuestionValues } from "pages/questionPage/CreateQuestion";
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

export const getQuestion = async (id: string | undefined | null | number) => {
  const response = await authApi.get(`QuestionContoller/${id}`);
  return response.data;
};

export const createQuestion = async (
  quizId: string | undefined | null | number,
  data: ICreateQuestionValues
) => {
  const response = await authApi.post(`QuestionContoller/${quizId}`, data);
  return response.data;
};

export const updateQuestion = async (
  questionId: string | undefined | null | number,
  data: ICreateQuestionValues
) => {
  const response = await authApi.put(`QuestionContoller/${questionId}`, data);
  return response.data;
};

export const deleteQuestion = async (
  id: string | undefined | null | number
) => {
  const response = await authApi.delete(`QuestionContoller/${id}`);
  return response.data;
};
