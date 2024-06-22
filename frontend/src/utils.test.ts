import { matchPasswords, div, cleanString, emailRegex, generalRegex, lettersRegex } from "./utils";

describe("utils", () => {
  describe("matchPasswords", () => {
    it("should return true if passwords match", () => {
      const password = "password";
      const confirmPassword = "password";
      const result = matchPasswords(password, confirmPassword);
      expect(result).toBeTruthy();
    });

    it("should return false if passwords do not match", () => {
      const password = "password";
      const confirmPassword = "differentpassword";
      const result = matchPasswords(password, confirmPassword);
      expect(result).toBeFalsy();
    });
  });

  describe("div", () => {
    it("should correctly divide two numbers", () => {
      const a = 10;
      const b = 2;
      const result = div(a, b);
      expect(result).toBe(5);
    });

    it("should handle division by zero gracefully", () => {
      const a = 10;
      const b = 0;
      const result = div(a, b);
      expect(result).toBe(NaN);
    });
  });

  describe("cleanString", () => {
    it("should trim and remove extra spaces from a string", () => {
      const input = "   Hello   world!   ";
      const expectedOutput = "Hello world!";
      const result = cleanString(input);
      expect(result).toBe(expectedOutput);
    });

    it("should handle null and undefined gracefully", () => {
      const result = cleanString(null);
      expect(result).toBe("");
    });
  });

  describe("Regex patterns", () => {
    it("should match valid email addresses", () => {
      const validEmail = "test@example.com";
      const result = emailRegex.test(validEmail);
      expect(result).toBeTruthy();
    });

    it("should not match invalid email addresses", () => {
      const invalidEmail = "invalid.email@";
      const result = emailRegex.test(invalidEmail);
      expect(result).toBeFalsy();
    });

    it("should match valid general strings", () => {
      const validString = "abc123_-@.$*#";
      const result = generalRegex.test(validString);
      expect(result).toBeTruthy();
    });

    it("should not match invalid general strings", () => {
      const invalidString = "abc!@#";
      const result = generalRegex.test(invalidString);
      expect(result).toBeFalsy();
    });

    it("should match valid letters-only strings", () => {
      const validLetters = "HelloWorld";
      const result = lettersRegex.test(validLetters);
      expect(result).toBeTruthy();
    });

    it("should not match invalid letters-only strings", () => {
      const invalidLetters = "Hello123";
      const result = lettersRegex.test(invalidLetters);
      expect(result).toBeFalsy();
    });
  });
});
