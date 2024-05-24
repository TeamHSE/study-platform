import { AppDataSource } from "./db";
import { registerControllers } from "./routes";

AppDataSource.initialize()
  .then(async () => {
    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/user to see results",
    );
  })
  .catch((error) => console.log(error));

registerControllers();
// export const DB = AppDataSource.createEntityManager();
