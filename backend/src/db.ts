import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "courses",
  synchronize: true, // TODO(db): disable at production code
  logging: false,
  entities: ["**/entity/*.ts"],
  migrations: [],
  subscribers: [],
});
