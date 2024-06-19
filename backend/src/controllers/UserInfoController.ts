import { Request, Response } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { AppDataSource } from "../db";
import { User } from "../entity/User";

export const UserControllerGetUserInfo = [
  verifyToken,
  async (req: Request, res: Response) => {
    const login = req.user?.login; 
    if (!login) {
      return res.status(403).json({ message: "Не удалось идентифицировать пользователя" });
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email: login } });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const { userId, firstName, lastName, username, email, isMale, birthDate, weight, height, achievements, healthIssues } = user;
      const userInfo = {
        userId,
        firstName,
        lastName,
        username,
        email,
        isMale,
        birthDate,
        weight,
        height,
        achievements,
        healthIssues,
      };

      return res.status(200).json(userInfo);
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      return res.status(500).json({ message: "Произошла ошибка сервера при получении информации о пользователе" });
    }
  },
];
