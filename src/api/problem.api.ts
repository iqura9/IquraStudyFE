import { authApi } from "./auth.api";

export const createProblem = async (data: any) => {
  const response = await authApi.post("Problem", data);
  return response.data;
};

export const getProblems = async () => {
  const response = await authApi.get("Problem");
  return response.data;
};
