import { IPutGroupPersonDto } from "pages/groupPage/components/GroupDetails/AcceptUserTable/const";
import { ICreateGroupValues } from "pages/groupPage/CreateGroupPage";
import { ICreateTaskValues } from "pages/taskPage/CreateTask";
import { IGroup, IGroupPeople } from "types/groupTypes";

import { authApi } from "./auth.api";

export const createGroup = async (data: ICreateGroupValues) => {
  const response = await authApi.post("Group", data);
  return response.data;
};

export const createTask = async (
  groupId: string | undefined,
  data: ICreateTaskValues
) => {
  const response = await authApi.post("Task", { ...data, groupId });
  return response.data;
};

export const getTasks = async (groupId: string | undefined) => {
  const url = `Task/${groupId}`;
  const response = await authApi.get<any>(url);
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

export const requestGroupInvitation = async (data: {
  GroupId: string | null;
}) => {
  const response = await authApi.post("GroupPerson", data);
  return response.data;
};

export const getGroupPerson = async (id: string | null | undefined) => {
  const url = `GroupPerson/${id}`;
  const response = await authApi.get<IGroupPeople[]>(url);
  return response.data;
};

export const putGroupPerson = async (
  id: string | null | undefined,
  data: IPutGroupPersonDto
) => {
  const url = `GroupPerson/${id}`;
  const response = await authApi.put<IGroupPeople>(url, data);
  return response.data;
};
