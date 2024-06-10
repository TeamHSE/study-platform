import { RootController } from "./controllers/RootController";
import { HelloWorldController } from "./controllers/HelloWorldController";
import { app } from "./server";
import { UserController } from "./controllers/UserController";

export const registerControllers = () => {
  app.get("/helloWorld", HelloWorldController);
  app.get("/", RootController);

  app.get("/user", UserController);
  app.post("/user", UserController);
};
