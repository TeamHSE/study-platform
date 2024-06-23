import * as fs from "fs";

export class Config {
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPass: string;
  dbName: string;
  privateKeyPath: string;
  publicKeyPath: string;
  frontendURL: string;

  constructor() {
    this.dbHost = process.env.DB_HOST || "";
    this.dbPort = process.env.DB_PORT || "";
    this.dbUsername = process.env.DB_USERNAME || "";
    this.dbPass = process.env.DB_PASS || "";
    this.dbName = process.env.DB_NAME || "";
    this.privateKeyPath = process.env.PRIVATE_KEY_PATH || "";
    this.publicKeyPath = process.env.PUBLIC_KEY_PATH || "";
    this.frontendURL = "https://train-platform.vercel.app";
  }

  readPrivateKey(): string {
    try {
      return fs.readFileSync(this.privateKeyPath, "utf8");
    } catch (err) {
      console.error("Ошибка чтения приватного ключа:", err);
      throw new Error("Не удалось прочитать файл приватного ключа");
    }
  }

  readPublicKey(): string {
    try {
      return fs.readFileSync(this.publicKeyPath, "utf8");
    } catch (err) {
      console.error("Ошибка чтения публичного ключа:", err);
      throw new Error("Не удалось прочитать файл публичного ключа");
    }
  }
}

export const config = new Config();
