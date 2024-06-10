import * as dotenv from "dotenv";

dotenv.config({ path: "backend/**/*.env" });

class Config {
  dbHost: string;
}

export const config = new Config();
config.dbHost = process.env.DB_HOST;
