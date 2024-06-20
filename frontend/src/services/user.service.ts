import { IUser } from "@/types/auth.types";
import { http } from "@/http-client";
import { cleanString } from "@/utils";

export const userService = {
  async getUser(): Promise<IUser | null> {
    const response = await http.get<IUser>(`/users/`);
    return response?.data;
  },

  async updateUser(newUser: IUser): Promise<IUser | null> {
    newUser.username = cleanString(newUser.username);
    newUser.email = cleanString(newUser.email);
    newUser.lastName = cleanString(newUser.lastName);
    newUser.firstName = cleanString(newUser.firstName);
    newUser.lastName = cleanString(newUser.lastName);
    newUser.achievements = cleanString(newUser.achievements);
    newUser.healthIssues = cleanString(newUser.healthIssues);
    const response = await http.put("/users/", newUser);
    return response?.data;
  }
};
