// api/Task/Quiz?taskId=2

import { IGroupTask } from "types/groupTypes";

import { authApi } from "./auth.api";

export const getTask = async (taskId: string | undefined | null | number) => {
  const response = await authApi.get<IGroupTask>(`Task/Quiz/?taskId=${taskId}`);
  return response.data;
};
