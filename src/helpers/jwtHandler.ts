import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_default_secret';

export class JwtHandler {
    constructor() { }

    generateToken(payload: any, expiresIn: string | number = '1h'): string {
        return jwt.sign(payload, secretKey, { expiresIn });
    }

    validateToken(token: string): boolean {
        try {
            jwt.verify(token, secretKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}
