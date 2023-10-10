import { PrismaService } from 'prisma/prisma.service';
export declare class authRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    saveNewUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
