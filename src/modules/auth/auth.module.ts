import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { DatabaseService } from './auth.repository';


@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, DatabaseService],
})
export class AuthModule {}
