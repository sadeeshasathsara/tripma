import AppError from "../errors/app.error.js";
import UserAccount from "../models/UserAccount.js";
import bcrypt from "bcrypt"

export const loginWithEmail = async (email, password) => {
    if (!email || !password) {
        throw new AppError(422, "Email or Password is not found")
    }

    const userAccount = await UserAccount.findOne({ email })

    if (!userAccount) {
        throw new AppError(409, "Account could not be located")
    }

    const isMatch = await bcrypt.compare(password, userAccount.password)

    if (isMatch) {
        return userAccount._id
    } else {
        throw new AppError(401, "Password did not matched")
    }
}


export const loginWithGoogle = async (googleId, email) => {
    if (!googleId || !email) {
        throw new AppError(422, "Google ID or Email is not found");
    }

    const accountByGoogle = await UserAccount.findOne({ googleId });


    if (accountByGoogle) {
        return {
            _id: accountByGoogle._id
        }
    } else {
        throw new AppError(409, "Account could not be located");
    }
};