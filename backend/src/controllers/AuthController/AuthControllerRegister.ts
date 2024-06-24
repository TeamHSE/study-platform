import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppDataSource } from "../../db";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userValidationRules } from "../../middlewares/validation";
import { config } from "../../config/Config";

export const AuthControllerRegister = [
  ...userValidationRules(),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { login, password, username, firstName, lastName } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existingEmail = await userRepository.findOne({
      where: { email: login },
    });
    if (existingEmail) {
      return res.status(409).json({ message: "Данный Email уже используется" });
    }

    const existingUsername = await userRepository.findOne({
      where: { username },
    });
    if (existingUsername) {
      return res.status(409).json({ message: "Имя пользователя уже занято" });
    }

    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      return res.status(400).json({ message: "Пароль слишком простой" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      email: login,
      password: hashedPassword,
      username,
      firstName,
      lastName,
    });

    await userRepository.save(newUser);

    try {
      const privateKey = config.readPrivateKey();

      const token = jwt.sign({ login: newUser.email }, privateKey, {
        expiresIn: "1000h",
        algorithm: "RS256",
      });

      res.cookie("token", token, {
        httpOnly: false,
        sameSite: "none"
      });

      return res
        .status(200)
        .json({ message: "Пользователь успешно зарегистрирован" });
    } catch (err) {
      console.error("Ошибка чтения приватного ключа:", err);
      return res
        .status(500)
        .json({ message: "Произошла ошибка при регистрации пользователя" });
    }
  },
];
