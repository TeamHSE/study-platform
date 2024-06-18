import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.on("finish", function () {
    console.log(
      `[${new Date().toISOString()}]\t[${response.statusCode}]\t${request.method}\t-->\t${request.path}`,
    );
  });
  next();
};
