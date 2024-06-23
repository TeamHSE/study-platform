import "./config/Config";
import { AppDataSource } from "./db";
import {app} from "./server";

AppDataSource.initialize()
  .then(async () => {
    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/user to see results",
    );
  })
  .catch((error) => console.log(error));

app.listen(3000, () => {
  console.log(`Backend node app listening on port ${3000}`);
});