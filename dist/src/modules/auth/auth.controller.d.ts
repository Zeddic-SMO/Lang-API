import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Register(userDTO: AuthDTO): Promise<string>;
    SignIn(): Promise<{
        message: string;
    }>;
    VerifyAccount(): Promise<{
        message: string;
    }>;
    ReverifyAccount(): Promise<{
        message: string;
    }>;
    InitiateResetPassword(): Promise<{
        message: string;
    }>;
    ForgotPassword(): Promise<{
        message: string;
    }>;
    ResetPassword(): Promise<{
        message: string;
    }>;
    SignOut(): Promise<{
        message: string;
    }>;
}
