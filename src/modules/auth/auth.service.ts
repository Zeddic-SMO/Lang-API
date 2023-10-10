import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { passwordHasher } from '../../helpers/bcrypt';
import { authRepository } from './auth.repository';
import { MailerHelperService } from '../mailer-helper/mailer-helper.service';
import { JwtHandler } from 'src/helpers/jwtHandler';

@Injectable()
export class AuthService {
  constructor(private readonly repository: authRepository,
    private readonly emailService: MailerHelperService,
    private readonly jwtHandler: JwtHandler) { }

  /**
   * This services function handles user account creation
   * @param {Object} userDTO - These are the user inputted information
   * @return
   */

  async CreateAccount(userDTO: AuthDTO) {
    const { email, password } = userDTO;

    // Check if user already exists
    const existingUser = await this.repository.getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email already exists!');
    }

    // hash the plain password
    const hashedPassword = await passwordHasher(password);

    // Save new user to database
    const newUser = await this.repository.saveNewUser(
      email,
      hashedPassword,
    );

    // Generate verification link
    const token = this.jwtHandler.generateToken({ email });
    const link = `${process.env.APP_HOST}/auth/verify/${token}`
    const msg = `Kindly click on the link below to verify your account \n \n ${link}`

    // Send verification Link
    const input = {
      to: email,
      html: msg,
      subject: 'Email/Account Verification'
    }
    await this.emailService.sendEmail(input);

    // return newUser;
    return {
      success: true,
      message: "Account created successfully!"
    };
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
