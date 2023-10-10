// eslint-disable-next-line prettier/prettier
import { PrismaService } from 'prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class authRepository {
  constructor(private readonly prismaService: PrismaService) { }

  // Get User by email
  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  // Save new user to database
  async saveNewUser(email: string, password: string) {
    try {
      return await this.prismaService.user.create({
        data: {
          email,
          password
        },
      });
    } catch (error) {
      console.error(error.message)
      throw new BadRequestException(error.message)
    }
  }

  // Update a user record in the database
  async updateUserInfo(email: string, updateData: Record<string, any>) {
    try {
      const response = await this.prismaService.user.update({
        where: { email },
        data: updateData,
      });
      return {
        success: true,
        message: "success",
      };
    } catch (error) {
      throw new BadRequestException("Internal Server Error");
    }
  }
}
