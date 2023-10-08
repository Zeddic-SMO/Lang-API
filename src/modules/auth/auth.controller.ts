import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 01. Create acount - allow user register using email and password
  @Post('register')
  async Register(@Body() userDTO: AuthDTO) {
    return await this.authService.CreateAccount(userDTO);
  }

  // 02. sign in - enable registered user to sign in by providing their email and password
  @Post('signin')
  async SignIn() {
    return await this.authService.UserSignIn();
  }

  // 03. Verify account - changes the account status to verrified for users
  @Post('verify')
  async VerifyAccount() {
    return await this.authService.UserVerification();
  }

  // 04. Resend Verification Email - allow user to resend of the email verification link
  @Post('reverify')
  async ReverifyAccount() {
    return this.authService.SendVerificationEmail();
  }

  // 05. Forgot Password - initiate the forgot password when user inputs emails
  @Post('forgot-password')
  async InitiateResetPassword() {
    return this.authService.InitateForgotPassword();
  }

  // 07. Validate Password Reset - validate the password reset token provided to the user
  @Get('forgot-password')
  async ForgotPassword() {
    return this.authService.ValidatePasswordReset();
  }

  // 08. Change Password - allow user to reset/change their password by providing a new password
  @Post('reset-password')
  async ResetPassword() {
    return this.authService.UpdatePassword();
  }

  // 09. Sign Out - signs out logged in user route
  @Get('signout')
  async SignOut() {
    return this.authService.UserSignOut();
  }
}
