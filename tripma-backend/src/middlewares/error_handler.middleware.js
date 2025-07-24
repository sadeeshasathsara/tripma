import AppError from "../errors/app.error.js";

/**
 * Global error-handling middleware for Express.
 *
 * This middleware catches all errors thrown in the application.
 * - If the error is an instance of AppError (custom error), it responds with the defined status and message.
 * - Otherwise, it responds with HTTP 500 and the error message.
 *
 * @function ErrorHandler
 * @param {Error} err - The error object thrown in a route or middleware.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function.
 * @returns {void}
 */
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};

export default ErrorHandler;
