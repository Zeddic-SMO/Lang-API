import { MailerHelperService } from './mailer-helper.service';
import { MailParams } from './dto/mail.request';
export declare class MailerHelperController {
    private readonly mailerHelperService;
    constructor(mailerHelperService: MailerHelperService);
    sendMail(inputs: MailParams): Promise<void>;
}
