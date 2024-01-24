import { IUser } from "./authTypes";
import { UserStatus } from "./generaTypes";

export interface IGroup {
  id: number;
  name: string;
  createdByUserId: string;
  createdAt: string;
  isArchived: boolean;
  createdByUser: IUser;
  groupPeople: any[];
  groupTasks: any[];
}

export interface IGroupsResponse {
  data: IGroup[];
}

export interface IGroupPeople {
  id: number;
  userId: string;
  groupId: number;
  userStatus: UserStatus;
  group: any;
  user: IUser;
}
export interface IGroupTask {
  id: number;
  title: string;
  description: string;
  groupId: number;
  createByUserId: string;
  group: any;
  groupTaskProblems: any[];
}

export interface IGroupPeopleResponse {
  data: IGroupPeople[];
}
