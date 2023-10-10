import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class registerDTO {
  // Email Validation
  @IsEmail()
  readonly email: string;

  //  Password Validation
  @IsNotEmpty()
  @IsString()
  @Length(5, 20, { message: 'Password must be between 5 to 20 characters' })
  readonly password: string;

  // Account Status
  readonly status?: string
}


export class signInDTO {
  // Email Validation
  @IsEmail()
  readonly email: string;

  //  Password Validation
  @IsNotEmpty()
  @IsString()
  @Length(5, 20, { message: 'Password must be between 5 to 20 characters' })
  readonly password: string;
}