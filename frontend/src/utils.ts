// - Local part: allows alphanumeric characters, dots, hyphens, and underscores.
// - Domain part: allows alphanumeric characters and hyphens.
// - TLD part: allows alphabetical characters only and must be between 2 to 4 characters.
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Allows alphanumeric characters, dots, underscores, percentage signs, plus signs, hyphens, at signs, dollar signs, asterisks, and hash signs.
export const generalRegex = /^[a-zA-Z0-9._%+\-@$*#]+$/;


export const lettersRegex = /^[A-Za-zА-Яа-я]+$/;

export const matchPasswords = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const div = (a: number, b: number) => {
  return (a - a % b) / b;
};

export const cleanString = (s: string) => s?.trim()?.replaceAll(/\s{2,}/g, " ");