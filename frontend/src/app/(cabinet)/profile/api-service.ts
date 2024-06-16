import http from "@/http-client";
import { IUser } from "../profile/user";

export const getUser = async (userId: string) => {
  try {
    const response = await http.get<IUser>(`/users/${ userId }`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (userId: string, login: string, role: string, name: string, password: string) => {
  try {
    const response = await http.put(`/users/${ userId }`, {
      login,
      role,
      name,
      password
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await http.delete(`/users/${ userId }`);
    return response.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};