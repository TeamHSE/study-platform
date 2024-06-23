import express, {Application} from "express";
import { loggerMiddleware } from "./middlewares/logger";
import { config } from "../src/config/Config";
import cors from "cors";

export const app:Application = express();
const port = 3000;
const corsOptions = {
  origin: config.frontendURL,
  credentials: true,
};

app.use(loggerMiddleware);
app.use(express.json());
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Backend node app listening on port ${port}`);
});
