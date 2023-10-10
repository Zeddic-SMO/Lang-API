import { Body, Controller, Post } from '@nestjs/common';
import { MailerHelperService } from './mailer-helper.service';
import { MailParams } from './dto/mail.request';

@Controller('mail')
export class MailerHelperController {
  constructor(private readonly mailerHelperService: MailerHelperService) { }

  @Post()
  async sendMail(@Body() inputs: MailParams) {
    console.log(inputs)
    return this.mailerHelperService.sendEmail(inputs)
  }
}
