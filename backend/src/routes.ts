import { RootController } from "./controllers/RootController";
import { app } from "./server";
import { AuthControllerLogin } from "./controllers/AuthController/AuthControllerLogin";
import { AuthControllerRegister } from "./controllers/AuthController/AuthControllerRegister";
import { UserControllerGetUserInfo } from "./controllers/UserController/UserInfoController";
import { UserControllerLogout } from "./controllers/AuthController/AuthControllerLogout";
import { UserControllerDeleteUser } from "./controllers/UserController/UserDeleteAccountController";
import { UserControllerUpdate } from "./controllers/UserController/UserUpdateController";

export const registerControllers = () => {
  app.get("/", RootController);

  app.post("/api/auth/register", AuthControllerRegister);
  app.post("/api/auth/login", AuthControllerLogin);
  app.post("/api/auth/logout", UserControllerLogout);

  app.get("/api/users", UserControllerGetUserInfo);
  app.delete("/api/users", UserControllerDeleteUser);
  app.put("/api/users", UserControllerUpdate);
};
