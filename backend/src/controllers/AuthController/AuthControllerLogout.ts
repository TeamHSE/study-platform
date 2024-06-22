import { Request, Response } from "express";
import { verifyToken } from "../../middlewares/verifyToken";

export const UserControllerLogout = [
  verifyToken,
  (req: Request, res: Response) => {
    try {
      res.clearCookie("token", { httpOnly: true, maxAge: 0 });
      return res.status(200).json({ message: "Сессия завершена" });
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
      return res
        .status(500)
        .json({ message: "Произошла ошибка сервера при выходе из системы" });
    }
  },
];
