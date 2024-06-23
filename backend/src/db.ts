import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config/Config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPass,
  database: config.dbName,
  synchronize: true, // TODO(db): disable at production code
  logging: false,
  entities: ["**/entity/*.ts"],
  migrations: [],
  subscribers: [],
});
