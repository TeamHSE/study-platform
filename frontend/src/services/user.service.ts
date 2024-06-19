import { IUser } from "@/types/auth.types";
import { http } from "@/http-client";

export const userService = {
  async getUser(): Promise<IUser | null> {
    const response = await http.get<IUser>(`/users/`);
    return response?.data;
  },

  async updateUser(newUser: IUser): Promise<IUser | null> {
    const response = await http.put("/users/", newUser);
    return response?.data;
  }
};
