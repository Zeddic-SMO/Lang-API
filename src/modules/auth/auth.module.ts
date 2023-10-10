import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { authRepository } from './auth.repository';
import { MailerHelperService } from '../mailer-helper/mailer-helper.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, authRepository, MailerHelperService],
})
export class AuthModule { }
