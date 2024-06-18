import * as fs from 'fs';
import * as path from 'path';

class Config {
  dbHost: string;
  privateKeyPath: string;
  publicKeyPath: string;
  frontendURL: string; 

  constructor(privateKeyPath: string, publicKeyPath: string, frontendURL: string) {
    this.dbHost = process.env.DB_HOST || '';
    this.privateKeyPath = privateKeyPath;
    this.publicKeyPath = publicKeyPath;
    this.frontendURL = frontendURL;
  }

  readPrivateKey(): string {
    try {
      return fs.readFileSync(this.privateKeyPath, 'utf8');
    } catch (err) {
      console.error("Ошибка чтения приватного ключа:", err);
      throw new Error('Не удалось прочитать файл приватного ключа');
    }
  }

  readPublicKey(): string {
    try {
      return fs.readFileSync(this.publicKeyPath, 'utf8');
    } catch (err) {
      console.error("Ошибка чтения публичного ключа:", err);
      throw new Error('Не удалось прочитать файл публичного ключа');
    }
  }
}

// Путь к файлам ключей
const privateKeyPath = path.resolve('src/private.pem');
const publicKeyPath = path.resolve('src/public.pem');


const frontendURL = "http://localhost:3001";


export const config = new Config(
  privateKeyPath,
  publicKeyPath,
  frontendURL
);
