import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entity/User";

export const UserController = async (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      const users = await AppDataSource.getRepository(User).find();
      res.json(users);
      return res;
    case "POST":
      res.json("nothing yet");
      return res;
  }
};
