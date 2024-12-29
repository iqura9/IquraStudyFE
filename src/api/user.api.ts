import { IUser, RoleType } from "types/authTypes";

import { axiosInstance } from "./auth.api";

export const getUsers = async (userRole?: RoleType) => {
  const usersURL = userRole ? `Users?userRole=${userRole}` : "Users";
  const response = await axiosInstance.get<IUser[]>(usersURL);
  return response.data;
};
