import { registerWithEmail, registerWithGoogle } from "../services/register.service.js"
import { OAuth2Client } from "google-auth-library"
import { updateUser } from "../services/user.sercive.js";
import { loginByGoogle } from "./login.controller.js";

/**
 * Controller to register a user via email and password.
 * Uses try/catch to forward errors to the error-handling middleware.
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

export async function registerByEmail(req, res, next) {
    try {
        const { email, password, firstName, lastName, profilePic, dealAlerts, termsAndConditions } = req.body;
        const file = req.file || '';
        const profilePicPath = file ? `/uploads/profile_pictures/${file.filename}` : null;
        const result = await registerWithEmail(email, password, dealAlerts, termsAndConditions, file.path);

        if (result) {
            const userData = {
                _id: result,
                email: email,
                firstName: firstName,
                lastName: lastName,
                profilePic: profilePicPath
            };

            await updateUser(userData);

            res.status(201).json({ message: "Successfully created the account. Please sign in", success: true });
        }
    } catch (e) {
        console.error("Error in registerByEmail:", e);
        next(e);
    }
}

export async function registerByGoogle(req, res, next) {
    try {
        const { idToken } = req.body;

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, email } = payload;

        const result = await registerWithGoogle(sub, email);

        if (result) {
            const userData = {
                _id: result,
                givenName: payload.given_name,
                familyName: payload.family_name,
                picture: payload.picture,
                email: payload.email
            };

            await updateUser(userData);

            return res.status(201).json({ success: true, message: "Registration successful" });
        }
    } catch (e) {
        next(e);
    }
}