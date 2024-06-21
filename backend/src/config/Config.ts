class Config {
  dbHost: string;
}

export const config = new Config();
config.dbHost = process.env.DB_HOST;
