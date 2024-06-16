import { RootController } from "./controllers/RootController";
import { HelloWorldController } from "./controllers/HelloWorldController";
import { app } from "./server";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

export const registerControllers = () => {
  app.get("/helloWorld", HelloWorldController);
  app.get("/", RootController);
  app.post("/api/auth/register", AuthController.register);
  app.post("/api/auth/login", AuthController.login);
  app.get("/user", UserController);
  app.post("/user", UserController);
};
