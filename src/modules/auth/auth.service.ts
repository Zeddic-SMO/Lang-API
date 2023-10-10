import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { comparePassword, passwordHasher } from '../../helpers/bcrypt';
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
   * @param {Object} userDTO - user account creation credentials
   * @return - success message if user already created
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

  /**
   * This service function handles user authentication
   * @param {Object} signDTO - user login credentails 
   */
  async UserSignIn(signDTO: AuthDTO) {
    const { email, password } = signDTO
    // check if email/user exists in database
    const user = await this.repository.getUserByEmail(email)

    if (!user) {
      throw new BadRequestException("Password/Email incoorect!")
    }
    // check if password supplied by the user matches database password
    const isPassword = await comparePassword(password, user.password)

    // Generate an authentication token
    const token = this.jwtHandler.generateToken({ email, id: user.id, role: "student" }, '24h')

    return { success: true, message: "User successfully registered!", token }
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
