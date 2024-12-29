import { ICreateQuestionValues } from "pages/questionPage/CreateQuestion";
import { ICreateQuizValues } from "pages/quizPage/CreateQuiz";
import { IEditQuizPageValues } from "pages/quizPage/EditQuiz";
import { IQuiz } from "types/questionTypes";
import { CreateQuizTaskDto } from "types/quiz";

import { axiosInstance } from "./auth.api";

export const createQuiz = async (data: ICreateQuizValues) => {
  const response = await axiosInstance.post("Quiz", data);
  return response.data;
};

export const updateQuiz = async (data: IEditQuizPageValues, id: string) => {
  const response = await axiosInstance.patch(`Quiz/${id}`, data);
  return response.data;
};

export const createQuizTask = async (data: CreateQuizTaskDto) => {
  const response = await axiosInstance.post("Quiz/QuizTask", data);
  return response.data;
};

export const verifyQuiz = async (data: any) => {
  const response = await axiosInstance.post("Quiz/verify", data);
  return response.data;
};

export const getQuiz = async (id: string | undefined | null | number) => {
  const response = await axiosInstance.get<IQuiz>(`Quiz/${id}`);
  return response.data;
};
export const getQuizWithoutAnswers = async (
  id: string | undefined | null | number,
) => {
  const response = await axiosInstance.get<IQuiz>(`Quiz/WithoutAnswers/${id}`);
  return response.data;
};

export const getQuestion = async (id: string | undefined | null | number) => {
  const response = await axiosInstance.get(`QuestionContoller/${id}`);
  return response.data;
};

export const createQuestion = async (
  quizId: string | undefined | null | number,
  data: ICreateQuestionValues,
) => {
  const response = await axiosInstance.post(
    `QuestionContoller/${quizId}`,
    data,
  );
  return response.data;
};

export const updateQuestion = async (
  questionId: string | undefined | null | number,
  data: ICreateQuestionValues,
) => {
  const response = await axiosInstance.put(
    `QuestionContoller/${questionId}`,
    data,
  );
  return response.data;
};

export const deleteQuestion = async (
  id: string | undefined | null | number,
) => {
  const response = await axiosInstance.delete(`QuestionContoller/${id}`);
  return response.data;
};

export const getQuizzes = async () => {
  const response = await axiosInstance.get(`Quiz`);
  return response.data;
};

export const getQuizzesSelect = async (
  taskId: string | undefined | null | number,
) => {
  const response = await axiosInstance.get(`Quiz/select/${taskId}`);
  return response.data;
};

export const deleteQuiz = async (id: string | undefined | null | number) => {
  const response = await axiosInstance.delete(`Quiz/${id}`);
  return response.data;
};
