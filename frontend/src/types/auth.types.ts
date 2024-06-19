export interface IAuthForm {
  email: string;
  password: string;
}

export interface IRegisterForm extends IAuthForm {
  confirmPassword: string;
  username: string,
  lastName: string,
  firstName: string
}

export interface IUser extends IUserId {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isMale: boolean | undefined;
  birthDate: Date | undefined;
  weight: number | undefined;
  height: number | undefined;
  achievements: string;
  healthIssues: string;
}

export interface IUserId {
  userId: string;
}

export const getFullName = (user: IUser) => user.firstName + " " + user.lastName;

export interface IAuthResponse {
  token: string;
}

export type TypeUserForm = Omit<IUser, "id" | "role"> & { password?: string }
