import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MailParams {
    @IsNotEmpty()
    @IsEmail()
    readonly to: string;

    @IsString()
    readonly subject: string;

    @IsString()
    readonly html: string;
}