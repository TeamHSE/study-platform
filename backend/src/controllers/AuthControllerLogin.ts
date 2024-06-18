import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { AppDataSource } from "../db";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/Config";

export const AuthControllerLogin = [
  check("login").isEmail().withMessage("Неверный формат почты!"),
  check("password").notEmpty().withMessage("Пароль не может быть пустым!"),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email: login } });

    if (!user) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }

    try {
      const privateKey = config.readPrivateKey(); 

      const token = jwt.sign({ login: user.email }, privateKey, {
        expiresIn: "1h",
        algorithm: 'RS256'
      });

      res.cookie("token", token, {
        httpOnly: false,
      });

      return res.status(200).json({ message: "Вход выполнен успешно" });
    } catch (err) {
      console.error("Ошибка чтения приватного ключа:", err);
      return res.status(500).json({ message: "Произошла ошибка при входе пользователя" });
    }
  },
];
