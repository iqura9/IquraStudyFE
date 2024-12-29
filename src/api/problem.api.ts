import { axiosInstance } from "./auth.api";

export const createProblem = async (data: any) => {
  const response = await axiosInstance.post("Problem", data);
  return response.data;
};

export const getProblems = async () => {
  const response = await axiosInstance.get("Problem");
  return response.data;
};

export const getProblem = async (id: string) => {
  const response = await axiosInstance.get("Problem/" + id);
  return response.data;
};

export const createProblemSubmittion = async (data: any) => {
  const response = await axiosInstance.post("Problems/Submittion", data);
  return response.data;
};

export const getProblemSubmittion = async (
  groupTaskId: string,
  problemId: string,
) => {
  const response = await axiosInstance.get(
    `Problem/Submittion?groupTaskId=${groupTaskId}&problemId=${problemId}`,
  );
  return response.data;
};
