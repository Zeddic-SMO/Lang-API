import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { passwordHasher } from '../../helpers/bcrypt';
import { DatabaseService } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * This services function handles user account creation
   * @param {Object} userDTO - These are the user inputted information
   * @return
   */

  async CreateAccount(userDTO: AuthDTO) {
    const { email, password } = userDTO;

    // Check if user already exists
    const existingUser = await this.databaseService.getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email already exists!');
    }

    // hash the plain password
    const hashedPassword = await passwordHasher(password);

    // Save new user to database
    /*   const newUser = await this.databaseService.saveNewUser(
      email,
      hashedPassword,
    ); */

    // Generate verification link
    const verifyLink = 'Hello here is the verification link';

    // Send verification Link
    /*  await this.emailService.sendMail(
      'ictzoid@gmail.com',
      'Email/Account Verification',
      verifyLink,
    ); */

    // return newUser;
    return 'Created successfully!';
  }

  // User SignIn
  async UserSignIn() {
    return { message: '' };
  }

  // Verify User Account
  async UserVerification() {
    return { message: 'Email Verified' };
  }

  // Send Verification Email
  async SendVerificationEmail() {
    return { message: 'Verification Email Sent' };
  }

  // Forgot password Service
  async InitateForgotPassword() {
    return { message: 'password reset link sent to email' };
  }

  // Validate Password Reset
  async ValidatePasswordReset() {
    return { message: 'Password reset initiated!' };
  }

  // Change Password
  async UpdatePassword() {
    return { message: 'Password Reset Successful' };
  }

  // Sign Out
  async UserSignOut() {
    return { message: 'User logged out' };
  }
}
