import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
}

export async function comparePassword(
  passwordInput: string,
  hashedPassword: string,
): Promise<boolean> {
  const isPasswordValid = await bcrypt.compare(passwordInput, hashedPassword);

  return isPasswordValid;
}
