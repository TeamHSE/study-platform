export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser extends IUserId {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  isMale: boolean;
  birthDate: Date;
  weight: number;
  height: number;
  achievements: string;
  healthIssues: string;
}

export interface IUserId {
  userId: string;
}

export const getFullName = (user: IUser) => user.firstName + " " + user.lastName;

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export type TypeUserForm = Omit<IUser, "id" | "role"> & { password?: string }
