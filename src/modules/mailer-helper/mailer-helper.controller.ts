import { Controller } from '@nestjs/common';
import { MailerHelperService } from './mailer-helper.service';

@Controller('mailer-helper')
export class MailerHelperController {
  constructor(private readonly mailerHelperService: MailerHelperService) {}
}
