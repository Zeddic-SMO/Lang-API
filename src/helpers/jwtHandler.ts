import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_default_secret';

export class JwtHandler {
    constructor() { }

    generateToken(payload: any, expiresIn: string | number = '1h'): string {
        return jwt.sign(payload, secretKey, { expiresIn });
    }

    validateToken(token: string): any {
        try {
            const response = jwt.verify(token, secretKey);
            return {
                status: true,
                data: response
            };
        } catch (error) {
            return {
                status: false,
                message: error.message
            };
        }
    }
}
