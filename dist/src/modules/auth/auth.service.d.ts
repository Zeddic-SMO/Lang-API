import { AuthDTO } from './dto/auth.dto';
import { authRepository } from './auth.repository';
import { MailerHelperService } from '../mailer-helper/mailer-helper.service';
import { JwtHandler } from 'src/helpers/jwtHandler';
export declare class AuthService {
    private readonly repository;
    private readonly emailService;
    private readonly jwtHandler;
    constructor(repository: authRepository, emailService: MailerHelperService, jwtHandler: JwtHandler);
    CreateAccount(userDTO: AuthDTO): Promise<{
        success: boolean;
        message: string;
    }>;
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
