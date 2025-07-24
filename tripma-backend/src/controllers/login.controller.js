import { registerWithGoogle } from "../services/register.service.js"
import { OAuth2Client } from "google-auth-library"
import { updateUser } from "../services/user.sercive.js"
import { loginWithEmail, loginWithGoogle } from "../services/login.service.js"
import { generateJWT } from "../services/auth.service.js";

export async function loginByEmail(req, res, next) {
    try {
        const { email, password } = req.body;

        const _id = await loginWithEmail(email, password)

        const token = generateJWT(_id);

        if (!token) {
            throw new AppError(400, "Token is required to set cookie");
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: _id
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

export async function loginByGoogle(req, res, next) {
    try {
        const { idToken } = req.body;

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, email } = payload;

        const result = await loginWithGoogle(sub, email);

        if (result) {
            const userData = await updateUser(result._id);
            const token = generateJWT(userData);

            if (!token) {
                throw new AppError(400, "Token is required to set cookie");
            }

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(201).json({ success: true, message: "Login successful" });
        }
    } catch (e) {
        next(e);
    }
}