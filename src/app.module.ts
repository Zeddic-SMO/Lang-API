import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MailerHelperModule } from './modules/mailer-helper/mailer-helper.module';

@Module({
  imports: [AuthModule, MailerHelperModule],
})
export class AppModule {}
