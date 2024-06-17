export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const matchPasswords = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};