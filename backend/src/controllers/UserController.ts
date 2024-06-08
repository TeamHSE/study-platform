import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entity/User";

export const UserController = async (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      await AppDataSource.getRepository(User).save({
        firstName: "John",
        lastName: "Smith",
        username: "johnsmith",
        email: "john.smith@example.com",
        password: "fakepassword123",
        isMale: true,
        birthDate: new Date(1990, 5, 15),
        weight: 75.5,
        height: 180.3,
        achievements: "Lorem ipsum",
        healthIssues: "None",
      });

      const users = await AppDataSource.getRepository(User).find();
      res.status(200).json(users);

      console.log(users);
      return res;

    case "POST":
      res.json("nothing yet");
      return res;
  }
};
