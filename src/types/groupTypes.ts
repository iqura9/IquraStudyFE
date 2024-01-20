import { IUser } from "./authTypes"




export interface IGroup {
  id: number
  name: string
  createdByUserId: string
  createdAt: string
  isArchived: boolean
  createdByUser: IUser;
  groupPeople: any[]
  groupTasks: any[]
}




export interface IGroupsResponse {
    data: IGroup[]
}