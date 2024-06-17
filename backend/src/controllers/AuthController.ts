import fs from 'fs';
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { AppDataSource } from "../db";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthController = {
  register: [
    // Валидация входящих данных
    check("login").isEmail().withMessage("Неверный формат почты!"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Пароль слишком короткий!"),
    check("username")
      .not()
      .isEmpty()
      .withMessage("Имя пользователя не может быть пустым!"),
    check("firstName").not().isEmpty().withMessage("Имя не может быть пустым!"),
    check("lastName")
      .not()
      .isEmpty()
      .withMessage("Фамилия не может быть пустой!"),

    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { login, password, username, firstName, lastName } = req.body;

      // Проверка занятости логина
      const userRepository = AppDataSource.getRepository(User);
      const existingEmail = await userRepository.findOne({
        where: { email: login },
      });
      if (existingEmail) {
        return res
          .status(409)
          .json({ message: "Данный Email уже используется" });
      }

      // Проверка занятости имени пользователя
      const existingUsername = await userRepository.findOne({
        where: { username },
      });
      if (existingUsername) {
        return res.status(409).json({ message: "Имя пользователя уже занято" });
      }

      // Проверка сложности пароля
      const hasUpperCase = /[A-Z]/.test(password);
      if (!hasUpperCase) {
        return res.status(400).json({ message: "Пароль слишком простой" });
      }

      // Хэширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создание нового пользователя
      const newUser = userRepository.create({
        email: login,
        password: hashedPassword,
        username,
        firstName,
        lastName,
      });

      // Сохранение пользователя в базу данных
      await userRepository.save(newUser);

      try {
        // Чтение приватного ключа из файла
        const privateKey = fs.readFileSync('private.pem', 'utf8');

        // Генерация JWT токена
        const token = jwt.sign({ userId: newUser.id, login: newUser.email }, privateKey, {
          expiresIn: "1h",
          algorithm: 'RS256' // Указываем алгоритм подписи
        });


        // Устанавливаем токен в cookie
        res.cookie("token", token, {
          httpOnly: true,
          // secure: true, // Если использовать HTTPS
        });

        return res.status(200).json({ message: "Пользователь успешно зарегистрирован" });
      } catch (err) {
        console.error("Ошибка чтения приватного ключа:", err);
        return res.status(500).json({ message: "Произошла ошибка при регистрации пользователя" });
      }
    },
  ],
  login: [
    check("login").isEmail().withMessage("Неверный формат почты!"),
    check("password").notEmpty().withMessage("Пароль не может быть пустым!"),

    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { login, password } = req.body;

      // Поиск пользователя по логину
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email: login } });

      if (!user) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400      ).json({ message: "Неверный логин или пароль" });
      }

      try {
        // Чтение приватного ключа из файла
        const privateKey = fs.readFileSync('private.pem', 'utf8');

   
       // Генерация JWT токена
        const token = jwt.sign({ userId: user.id, login: user.email }, privateKey, {
          expiresIn: "1h",
          algorithm: 'RS256' // Указываем алгоритм подписи
        });


        // Устанавливаем токен в cookie
        res.cookie("token", token, {
          httpOnly: true,
          // secure: true, // Если использовать HTTPS
        });

        return res.status(200).json({ message: "Вход выполнен успешно" });
      } catch (err) {
        console.error("Ошибка чтения приватного ключа:", err);
        return res.status(500).json({ message: "Произошла ошибка при входе пользователя" });
      }
    },
  ],
};

