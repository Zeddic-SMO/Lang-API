import { MailParams } from './dto/mail.request';
import { MailerService } from '@nestjs-modules/mailer';
export declare class MailerHelperService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendEmail(inputs: MailParams): Promise<void>;
}
