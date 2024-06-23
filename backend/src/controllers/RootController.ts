import { Request, Response } from "express";

export const RootController = (req: Request, res: Response) => {
  res.status(200).json({message: "Pong!"});
};
