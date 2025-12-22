export function isValidPassword(password: string): boolean {
  return /[a-zA-Z]/u.test(password) && /\d/.test(password);
}
