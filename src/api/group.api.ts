import { ICreateGroupValues } from "pages/groupPage/CreateGroupPage";
import { IGroup } from "types/groupTypes";

import { authApi } from "./auth.api";

export const createGroup = async (data: ICreateGroupValues) => {
  const response = await authApi.post("Group", data);
  return response.data;
};

export const editGroup = async (
  id: string | undefined,
  data: ICreateGroupValues
) => {
  const response = await authApi.patch(`Group/${id}`, data);
  return response.data;
};

export const getAllGroups = async (myGroups: boolean = false) => {
  const queryParams = { myGroups: `${myGroups}` };
  const searchParams = new URLSearchParams(queryParams);
  const url = `Group${myGroups ? `?${searchParams}` : ""}`;
  const response = await authApi.get<IGroup[]>(url);
  return response.data;
};

export const getGroup = async (id: string | undefined) => {
  const url = `Group/${id}`;
  const response = await authApi.get<IGroup>(url);
  return response.data;
};

export const deleteGroup = async (id: string | undefined) => {
  const response = await authApi.delete(`Group/${id}`);
  return response.data;
};
