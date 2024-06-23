import { RootController } from "./controllers/RootController";
import { AuthControllerLogin } from "./controllers/AuthController/AuthControllerLogin";
import { AuthControllerRegister } from "./controllers/AuthController/AuthControllerRegister";
import { UserControllerGetUserInfo } from "./controllers/UserController/UserInfoController";
import { UserControllerLogout } from "./controllers/AuthController/AuthControllerLogout";
import { UserControllerDeleteUser } from "./controllers/UserController/UserDeleteAccountController";
import { UserControllerUpdate } from "./controllers/UserController/UserUpdateController";
import express from "express";

export const registerControllers = () => {

  const routes = express.Router();
  routes.get('/', RootController);

  routes.post("/api/auth/register", AuthControllerRegister);
  routes.post("/api/auth/login", AuthControllerLogin);
  routes.post("/api/auth/logout", UserControllerLogout);

  routes.get("/api/users", UserControllerGetUserInfo);
  routes.delete("/api/users", UserControllerDeleteUser);
  routes.put("/api/users", UserControllerUpdate);

  return routes;
};