import { Config } from "../src/config/Config";
import fs from "fs";

describe('readPublicKey', () => {
    // publicKeyPath is an empty string
    it('should throw an error when publicKeyPath is an empty string', () => {
      jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });
  
      const config = new Config();
      config.publicKeyPath = '';
  
      expect(() => config.readPublicKey()).toThrow('Не удалось прочитать файл публичного ключа');
      expect(fs.readFileSync).toHaveBeenCalledWith('', 'utf8');
    });

});
