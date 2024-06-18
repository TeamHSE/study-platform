import express from "express";
import { loggerMiddleware } from "./middlewares/logger";

export const app = express();
const port = 3000;

app.use(loggerMiddleware);
app.use(express.json());
app.listen(port, () => {
  console.log(`Backend node app listening on port ${port}`);
});
