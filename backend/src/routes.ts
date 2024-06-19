import { RootController } from "./controllers/RootController";
import { HelloWorldController } from "./controllers/HelloWorldController";
import { app } from "./server";
import { UserController } from "./controllers/UserController";
import { AuthControllerLogin } from "./controllers/AuthControllerLogin";
import { AuthControllerRegister } from "./controllers/AuthControllerRegister";
import { UserControllerGetUserInfo } from "./controllers/UserInfoController";
import { UserControllerLogout } from "./controllers/AuthControllerLogout";

export const registerControllers = () => {
  app.get("/helloWorld", HelloWorldController);
  app.get("/", RootController);
  app.post("/api/auth/register", AuthControllerRegister);
  app.post("/api/auth/login", AuthControllerLogin);
  app.get("/user", UserController);
  app.post("/user", UserController);
  app.get("/api/users", UserControllerGetUserInfo);
  app.post("/api/auth/logout", UserControllerLogout);
};
