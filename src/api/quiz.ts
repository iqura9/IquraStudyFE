import { ICreateQuestionValues } from "pages/questionPage/CreateQuestion";
import { ICreateQuizValues } from "pages/quizPage/CreateQuiz";
import { IEditQuizPageValues } from "pages/quizPage/EditQuiz";
import { IQuiz } from "types/questionTypes";
import { CreateQuizTaskDto } from "types/quiz";

import { authApi } from "./auth.api";

export const createQuiz = async (data: ICreateQuizValues) => {
  const response = await authApi.post("Quiz", data);
  return response.data;
};

export const updateQuiz = async (data: IEditQuizPageValues, id: string) => {
  const response = await authApi.patch(`Quiz/${id}`, data);
  return response.data;
};

export const createQuizTask = async (data: CreateQuizTaskDto) => {
  const response = await authApi.post("Quiz/QuizTask", data);
  return response.data;
};

export const verifyQuiz = async (data: any) => {
  const response = await authApi.post("Quiz/verify", data);
  return response.data;
};

export const getQuiz = async (id: string | undefined | null | number) => {
  const response = await authApi.get<IQuiz>(`Quiz/${id}`);
  return response.data;
};
export const getQuizWithoutAnswers = async (
  id: string | undefined | null | number
) => {
  const response = await authApi.get<IQuiz>(`Quiz/WithoutAnswers/${id}`);
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

export const getQuizzes = async () => {
  const response = await authApi.get("Quiz");
  return response.data;
};

export const deleteQuiz = async (id: string | undefined | null | number) => {
  const response = await authApi.delete(`Quiz/${id}`);
  return response.data;
};
