import jwt from 'jsonwebtoken';
import AppError from '../errors/app.error.js';

export function generateJWT(accountId) {
    try {
        if (!process.env.JWT_SECRET) {
            throw new AppError(500, "JWT_SECRET is not defined in environment variables");
        }
        console.log(`${accountId} from`);

        const payload = {
            _id: accountId?.toString?.()
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        });
    } catch (err) {
        throw new AppError(500, `Token generation failed: ${err.message}`);
    }
}