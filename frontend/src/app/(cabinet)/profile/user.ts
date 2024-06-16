import exp from "node:constants";

export interface IUser {
  userId: string;
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

export const getFullName = (user: IUser) => user.firstName + " " + user.lastName;
