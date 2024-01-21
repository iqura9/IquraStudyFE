export type RoleType = "Teacher" | "Student";

export interface IUser {
  id: string;
  userName: string;
  email: string;
  image: string;
  description: string;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  expiration: string;
  refreshToken: string;
  accessToken: string;
}
export interface ILoginQuery {
  email: string;
  password: string;
}

export interface IRegisterQuery {
  userName: string;
  email: string;
  role: RoleType;
  password: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}
