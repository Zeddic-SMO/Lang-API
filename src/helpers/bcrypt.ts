import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

// This function collect plain password and return a hash of the password
export const passwordHasher = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};


// This function compares a plain password and the hash - returns a Boolean {True/False}
export const comparePassword = async (plainPassword: string, hashedPassword: string) => {
  try {
    // Use bcrypt's compare function to compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

    // 'isMatch' will be true if the passwords match, otherwise, it will be false
    return isMatch;
  } catch (error) {
    // Handle any errors that occur during the comparison process
    throw new BadRequestException(error.message);
  }
}
