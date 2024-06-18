import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import { config } from "../config/Config";
import { DecodedToken } from "../types/express"; // Импортируем интерфейс DecodedToken из определенного файла

const publicKeyPath = config.publicKeyPath;

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Необходимо предоставить токен авторизации" });
  }

  try {
    const publicKey = fs.readFileSync(publicKeyPath, "utf8");

    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        console.error("Ошибка верификации токена:", err);
        return res.status(403).json({ message: "Ошибка авторизации" });
      }

      const decodedToken = decoded as DecodedToken;
      req.user = decodedToken;
      next();
    });
  } catch (err) {
    console.error("Ошибка чтения публичного ключа:", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при проверке токена" });
  }
}
