import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from "express"
import { emailTDO, registerDTO, signInDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 01. Create acount - allow user register using email and password
  @Post('register')
  async Register(@Body() userDTO: registerDTO) {
    return await this.authService.CreateAccount(userDTO);
  }

  // 02. sign in - enable registered user to sign in by providing their email and password
  @Post('signin')
  async SignIn(@Body() signDTO: signInDTO) {
    return await this.authService.UserSignIn(signDTO);
  }

  // 03. Verify account - changes the account status to verrified for users
  @Put(`verify/:token`)
  async VerifyAccount(@Param("token") token: string) {
    return await this.authService.UserVerification(token);
  }


  // 04. Forgot Password - initiate the forgot password when user inputs emails
  @Post('forgot-password')
  async InitiateResetPassword(@Body() emailTDO: emailTDO) {
    return this.authService.InitateForgotPassword(emailTDO);
  }

  // 05. Change Password - allow user to reset/change their password by providing a new password
  @Post('forgot-password/:token')
  async ResetPassword(@Param("token") token: string, @Body() body: { newPasswod: string, confirmPassword: string }) {
    return this.authService.UpdatePassword(token, body);
  }

}
