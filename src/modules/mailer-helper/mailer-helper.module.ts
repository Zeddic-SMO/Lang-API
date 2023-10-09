import { Module } from '@nestjs/common';
import { MailerHelperService } from './mailer-helper.service';
import { MailerHelperController } from './mailer-helper.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
    }),
  ],
  controllers: [MailerHelperController],
  providers: [MailerHelperService],
  exports: [MailerHelperService],
})
export class MailerHelperModule {}
