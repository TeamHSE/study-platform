import { Request, Response } from "express";

export const HelloWorldController = (req: Request, res: Response) => {
  res.send("Hello World Controller!");
};
