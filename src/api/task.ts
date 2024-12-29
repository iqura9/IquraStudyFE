import { IViewGrade } from "types/grades";
import { IGroupTask } from "types/groupTypes";

import { axiosInstance } from "./auth.api";

export const getTask = async (taskId: string | undefined | null | number) => {
  const response = await axiosInstance.get<IGroupTask>(
    `Task/Quiz/?taskId=${taskId}`,
  );
  return response.data;
};

export const getTaskGrade = async (
  taskId: string | undefined | null | number,
) => {
  const response = await axiosInstance.get<IViewGrade[]>(
    `Task/view-grade/${taskId}`,
  );
  return response.data;
};

export const deleteTaskQuiz = async (any: any) => {
  const response = await axiosInstance.delete(`/Task/Quiz`, { data: any });
  return response.data;
};
