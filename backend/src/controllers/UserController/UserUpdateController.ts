import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../../entity/User";
import { AppDataSource } from "../../db";
import { userValidationDescription } from "../../middlewares/validation";
import { verifyToken } from "../../middlewares/verifyToken";

export const UserControllerUpdate = [
  verifyToken,
  userValidationDescription(),

  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const login = req.user?.login;
      if (!login) {
        return res
          .status(403)
          .json({ message: "Не удалось идентифицировать пользователя" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email: login } });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const updatedFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        isMale: req.body.isMale,
        birthDate: req.body.birthDate,
        weight: req.body.weight,
        height: req.body.height,
        achievements: req.body.achievements,
        healthIssues: req.body.healthIssues,
      };

      Object.keys(updatedFields).forEach((key) => {
        if (updatedFields[key] !== undefined) {
          user[key] = updatedFields[key];
        }
      });

      await userRepository.save(user);

      return res.status(200).json({
        message: "Обновлена структура объекта пользователя",
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          isMale: user.isMale,
          birthDate: user.birthDate,
          weight: user.weight,
          height: user.height,
          achievements: user.achievements,
          healthIssues: user.healthIssues,
        },
      });
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
      return res.status(500).json({
        message: "Произошла ошибка сервера при обновлении пользователя",
      });
    }
  },
];
