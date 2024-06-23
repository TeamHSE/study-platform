import express, {Application} from "express";
import { loggerMiddleware } from "./middlewares/logger";
import { config } from "../src/config/Config";
import cors from "cors";
import {registerControllers} from "./routes";

export const app:Application = express();
const corsOptions = {
  origin: config.frontendURL,
  credentials: true,
};

app.use(loggerMiddleware);
app.use(express.json());
app.use(cors(corsOptions));

app.use(registerControllers());
