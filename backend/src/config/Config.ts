import * as fs from "fs";

export class Config {
  dbHost: string;
  privateKeyPath: string;
  publicKeyPath: string;
  frontendURL: string;

  constructor() {
    this.dbHost = process.env.DB_HOST || "";
    this.privateKeyPath = process.env.PRIVATE_KEY_PATH || "";
    this.publicKeyPath = process.env.PUBLIC_KEY_PATH || "";
    this.frontendURL = process.env.FRONTEND_URL || "";
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
