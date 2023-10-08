import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [AuthModule, MailModule],
})
export class AppModule {}
