import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDTO {
  // Email Validation
  @IsEmail()
  readonly email: string;

  //  Password Validation
  @IsNotEmpty()
  @IsString()
  @Length(5, 20, { message: 'Password must be between 5 to 20 characters' })
  readonly password: string;
}
