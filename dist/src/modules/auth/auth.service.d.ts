import { AuthDTO } from './dto/auth.dto';
import { authRepository } from './auth.repository';
import { MailerHelperService } from '../mailer-helper/mailer-helper.service';
export declare class AuthService {
    private readonly repository;
    private readonly emailService;
    constructor(repository: authRepository, emailService: MailerHelperService);
    CreateAccount(userDTO: AuthDTO): Promise<string>;
    UserSignIn(): Promise<{
        message: string;
    }>;
    UserVerification(): Promise<{
        message: string;
    }>;
    SendVerificationEmail(): Promise<{
        message: string;
    }>;
    InitateForgotPassword(): Promise<{
        message: string;
    }>;
    ValidatePasswordReset(): Promise<{
        message: string;
    }>;
    UpdatePassword(): Promise<{
        message: string;
    }>;
    UserSignOut(): Promise<{
        message: string;
    }>;
}
