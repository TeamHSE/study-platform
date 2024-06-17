import { IUser } from "@/types/auth.types";
import { http } from "@/http-client";

export const userService = {
  async getUser() {
    const response = await http.get<IUser>(`/users/`);
    return response.data;
  },

  async updateUser(userId: string, login: string, role: string, name: string, password: string) {
    const response = await http.put(`/users/${ userId }`, {
      login,
      role,
      name,
      password
    });
    return response.data;
  },

  async deleteUser(userId: string) {
    const response = await http.delete(`/users/${ userId }`);
    return response.status;
  }
};
