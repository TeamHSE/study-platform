import express from "express";
import { loggerMiddleware } from "./middlewares/logger";
import { config } from "../src/config/Config";
import cors from "cors";

export const app = express();
const port = 3000;

app.use(loggerMiddleware);
app.use(express.json());

const corsOptions = {
  origin: config.frontendURL,
  credentials: true,
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Backend node app listening on port ${port}`);
});
