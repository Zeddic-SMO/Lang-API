import { Injectable } from '@nestjs/common';
import { MailParams } from './dto/mail.request';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerHelperService {
    constructor(private readonly mailService: MailerService) { }

    async sendEmail(inputs: MailParams) {
        const { to, html, subject } = inputs;

        await this.mailService.sendMail({
            to,
            html,
            subject,
        });

    }
}
