import { ICreateGroupValues } from "pages/GroupPage/CreateGroupPage";
import { IGroup } from "types/groupTypes";

import { authApi } from "./auth.api";


export const createGroup = async (data: ICreateGroupValues) => {
    const response = await authApi.post("Group", data);
    return response.data;
};

export const getAllGroups = async (myGroups:boolean = false) => {
    const queryParams = {myGroups: `${myGroups}`};
    const searchParams = new URLSearchParams(queryParams);
    const url = `Group${myGroups ? `?${searchParams}` : ''}`
    const response = await authApi.get<IGroup[]>(url);
    return response.data;
};
