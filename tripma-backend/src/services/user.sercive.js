import AppError from "../errors/app.error.js";
import User from "../models/User.js"
import UserAccount from "../models/UserAccount.js"


export const updateUser = async (acc = {}) => {
    if (!acc._id || !acc.email) {
        throw new AppError(400, 'Missing required user account ID or email');
    }

    const user = await User.findOne({ userAccountId: acc._id });

    if (!user) {
        const newUser = new User({
            userAccountId: acc._id,
            firstName: acc.firstName || null,
            lastName: acc.lastName || null,
            profilePic: acc.profilePic || null,
            email: acc.email
        });

        await newUser.save();
        return newUser;
    } else {
        return user;
    }
};
