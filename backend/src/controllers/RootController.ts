import { Request, Response } from "express";

export const RootController = (req: Request, res: Response) => {
  res.send("Root Controller!");
};
