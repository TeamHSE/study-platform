export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const generalRegex = /^[a-zA-Z0-9._%+-@$*#]+$/;

export const lettersRegex = /^[A-Za-zА-Яа-я]+$/;

export const matchPasswords = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};