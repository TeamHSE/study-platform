import { Request } from "express";

export interface DecodedToken {
  login: string;
  iat: number;
  exp: number;
}

// Расширение интерфейса Request для добавления свойства user
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
