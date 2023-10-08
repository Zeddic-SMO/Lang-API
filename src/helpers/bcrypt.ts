import * as bcrypt from 'bcrypt';

export const passwordHasher = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};
