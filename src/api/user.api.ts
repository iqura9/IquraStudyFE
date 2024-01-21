import { IUser, RoleType } from "types/authTypes";

import { authApi } from "./auth.api";

export const getUsers = async (userRole?: RoleType) => {
  const usersURL = userRole ? `Users?userRole=${userRole}` : "Users";
  const response = await authApi.get<IUser[]>(usersURL);
  return response.data;
};
