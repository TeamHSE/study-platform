import express from "express";

export const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Backend node app listening on port ${port}`);
});
