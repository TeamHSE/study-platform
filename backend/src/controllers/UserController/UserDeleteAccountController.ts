import { Request, Response } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { AppDataSource } from "../../db";
import { User } from "../../entity/User";

export const UserControllerDeleteUser = [
  verifyToken,
  async (req: Request, res: Response) => {
    const login = req.user?.login;

    if (!login) {
      return res
        .status(403)
        .json({ message: "Не удалось идентифицировать пользователя" });
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email: login } });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      await userRepository.remove(user);

      res.clearCookie("token", { httpOnly: true, maxAge: 0 });
      return res.status(204).json({ message: "Сессия завершена" });
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      return res
        .status(500)
        .json({
          message: "Произошла ошибка сервера при удалении пользователя",
        });
    }
  },
];
