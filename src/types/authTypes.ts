type RoleType = "Teacher" | "Student";

export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
