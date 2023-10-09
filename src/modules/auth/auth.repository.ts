// eslint-disable-next-line prettier/prettier
import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(private readonly prismaService: PrismaService) {}

  // Get User by email
  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  // Save new user to database
  async saveNewUser(email: string, password: string) {
    return await this.prismaService.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
