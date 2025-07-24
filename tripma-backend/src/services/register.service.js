import AppError from "../errors/app.error.js";
import UserAccount from "../models/UserAccount.js";
import bcrypt from "bcrypt";

/**
 * Registers a user using email and password.
 * 
 * @async
 * @function
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password (will be hashed before saving).
 * @throws {AppError} 422 - If email or password is missing.
 * @throws {AppError} 409 - If a user with the email already exists.
 * @returns {Promise<boolean>} Returns true if registration is successful.
 */
export const registerWithEmail = async (email, password, dealAlerts = false, termsAndConditions = true, profilePicturePath) => {
    if (!email || !password) {
        throw new AppError(422, "Email or Password not found");
    }

    const userAccount = await UserAccount.findOne({ email });
    if (userAccount) {
        throw new AppError(409, "Email already exists. Use login");
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await new UserAccount({ email, password: hashedPassword, dealAlerts, termsAndConditions, profilePicture: profilePicturePath }).save();

    return newUser._id;
};

/**
 * Registers or links a user using Google account.
 * 
 * @async
 * @function
 * @param {string} googleId - The Google account ID.
 * @param {string} email - The user's email associated with the Google account.
 * @throws {AppError} 422 - If googleId or email is missing.
 * @throws {AppError} 409 - If Google ID is already linked or email is already linked to another Google account.
 * @returns {Promise<boolean>} Returns true if registration or linking is successful.
 */
export const registerWithGoogle = async (googleId, email) => {
    if (!googleId || !email) {
        throw new AppError(422, "Google ID or Email is invalid");
    }

    const accountByGoogle = await UserAccount.findOne({ googleId });
    const accountByEmail = await UserAccount.findOne({ email });

    if (accountByGoogle) {
        throw new AppError(409, "Google account already in use. Try to login");
    }

    if (accountByEmail) {
        if (!accountByEmail.googleId) {
            accountByEmail.googleId = googleId;
            await accountByEmail.save();
            return accountByEmail._id;
        } else {
            throw new AppError(409, "Account already exists. Try to login");
        }
    } else {
        const newAcc = await new UserAccount({ email, googleId }).save();
        return newAcc._id;
    }
};

/**
 * Registers or links a user using Facebook account.
 * 
 * @async
 * @function
 * @param {string} facebookId - The Facebook account ID.
 * @param {string} email - The user's email associated with the Facebook account.
 * @throws {AppError} 422 - If facebookId or email is missing.
 * @throws {AppError} 409 - If Facebook ID is already linked or email is already linked to another Facebook account.
 * @returns {Promise<boolean>} Returns true if registration or linking is successful.
 */
export const registerWithFacebook = async (facebookId, email) => {
    if (!facebookId || !email) {
        throw new AppError(422, "Facebook ID or Email is invalid");
    }

    const accountByFacebook = await UserAccount.findOne({ facebookId });
    const accountByEmail = await UserAccount.findOne({ email });

    if (accountByFacebook) {
        throw new AppError(409, "Facebook account already in use. Try to login");
    }

    if (accountByEmail) {
        if (!accountByEmail.facebookId) {
            accountByEmail.facebookId = facebookId;
            await accountByEmail.save();
            return true;
        } else {
            throw new AppError(409, "Account already exists. Try to login");
        }
    } else {
        await new UserAccount({ email, facebookId }).save();
        return true;
    }
};

/**
 * Registers or links a user using Apple account.
 * 
 * @async
 * @function
 * @param {string} appleId - The Apple account ID.
 * @param {string} email - The user's email associated with the Apple account.
 * @throws {AppError} 422 - If appleId or email is missing.
 * @throws {AppError} 409 - If Apple ID is already linked or email is already linked to another Apple account.
 * @returns {Promise<boolean>} Returns true if registration or linking is successful.
 */
export const registerWithApple = async (appleId, email) => {
    if (!appleId || !email) {
        throw new AppError(422, "Apple ID or Email is invalid");
    }

    const accountByApple = await UserAccount.findOne({ appleId });
    const accountByEmail = await UserAccount.findOne({ email });

    if (accountByApple) {
        throw new AppError(409, "Apple account already in use. Try to login");
    }

    if (accountByEmail) {
        if (!accountByEmail.appleId) {
            accountByEmail.appleId = appleId;
            await accountByEmail.save();
            return true;
        } else {
            throw new AppError(409, "Account already exists. Try to login");
        }
    } else {
        await new UserAccount({ email, appleId }).save();
        return true;
    }
};
