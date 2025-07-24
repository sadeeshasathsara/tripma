import jwt from 'jsonwebtoken';
import AppError from '../errors/app.error.js';

/**
 * Middleware to verify JWT and attach decoded user data to req.user
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("token not found");
        } else {
            console.log(token);
        }

        if (!token) {
            throw new AppError(401, 'Access denied. No token provided.');
        }

        if (!process.env.JWT_SECRET) {
            throw new AppError(500, "JWT_SECRET not configured");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded._id;

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            next(new AppError(401, 'Token expired. Please log in again.'));
        } else if (err.name === 'JsonWebTokenError') {
            next(new AppError(401, 'Invalid token. Access denied.'));
        } else {
            next(new AppError(500, 'Failed to authenticate token.'));
        }
    }
}
