import { HelloWorldController } from "./controllers/HelloWorldController";
import { RootController } from "./controllers/RootController";
import { app } from "./server";

const registerControllers = () => {
  app.get("/helloWorld", HelloWorldController);
  app.get("/", RootController);
};

registerControllers();
