import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { emailTDO, registerDTO, signInDTO } from './dto/auth.dto';
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
   * @param {Object} registerDTO - user account creation credentials
   * @return - success message if user already created
   */

  async CreateAccount(userDTO: registerDTO) {
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
      hashedPassword
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

    // return success;
    return {
      success: true,
      message: "Account created successfully!"
    };
  }

  /**
   * This service function handles user authentication
   * @param {Object} signInDTO - user login credentails 
   */
  async UserSignIn(signDTO: signInDTO) {
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

  /**
   * This function fetch a verification token in the parameters and update the status of a user
   * @param {String} token - verification token gotten from the parameter
   */
  async UserVerification(token: string) {
    // validates the token by checking if it matches the one associated with the user's account.
    const response = this.jwtHandler.validateToken(token)

    // check if user exist
    const email = response.data.email
    const isUser = this.repository.getUserByEmail(email)
    if (!isUser) {
      throw new BadRequestException("Invalid User!")
    }

    // mark as active in the database
    const updatedUser = await this.repository.updateUserInfo(email)

    // Return 
    return {
      success: true,
      message: "success",
      data: updatedUser
    }

  }

  // Send Verification Email
  async SendVerificationEmail() {
    return { message: 'Verification Email Sent' };
  }

  // Forgot password Service
  async InitateForgotPassword(emailTDO: emailTDO) {
    const { email } = emailTDO

    // check if user exists
    const isUser = await this.repository.getUserByEmail(email)
    if (!isUser) {
      throw new NotFoundException("User does not exists!")
    }

    // generate a token 
    const token = this.jwtHandler.generateToken({ id: isUser.id, email: isUser.email }, '24h')
    const link = `${process.env.APP_HOST}/auth/forgot-password/${token}`
    const msg = `Kindly click on the link below to complete password reset \n \n ${link}`

    // Send verification Link
    const input = {
      to: email,
      html: msg,
      subject: 'Reset Password'
    }
    await this.emailService.sendEmail(input);

    return {
      success: true,
      message: 'Password reset link sent'
    }
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
