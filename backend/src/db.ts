import "reflect-metadata";
import {DataSource} from "typeorm";
import { config } from "./config/Config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.dbHost,
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
