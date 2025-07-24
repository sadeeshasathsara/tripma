import User from '../models/User.js';
import UserAccount from '../models/UserAccount.js';
import AppError from '../errors/app.error.js';

/**
 * Controller to send basic user data (firstName, lastName, profilePic)
 * Expects req._id to be populated by verifyToken middleware
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export const initialUserData = async (req, res, next) => {
    try {
        const userAccountId = req.userId || req._id;

        if (!userAccountId) {
            throw new AppError(400, 'User ID not found in token');
        }

        const user = await User.findOne({ userAccountId }, 'firstName lastName profilePic');

        if (!user) {
            throw new AppError(404, 'User not found');
        }

        res.status(200).json({
            success: true,
            message: {
                firstName: user.firstName,
                lastName: user.lastName,
                profilePic: user.profilePic
            }
        });

    } catch (err) {
        next(err);
    }
};


/**
 * Returns full user + user account details
 * Expects req.userId to be populated by verifyToken middleware
 */
export const getFullUserData = async (req, res, next) => {
    try {
        const userAccountId = req.userId || req._id;

        if (!userAccountId) {
            throw new AppError(400, 'User ID not found in token');
        }

        const user = await User.findOne({ userAccountId }).lean();
        if (!user) throw new AppError(404, 'User not found');

        const userAccount = await UserAccount.findById(userAccountId).lean();
        if (!userAccount) throw new AppError(404, 'User account not found');

        const response = {
            user: {
                firstName: user.firstName || '',
                middleName: user.middleName || '',
                lastName: user.lastName || '',
                suffix: user.suffix || '',
                profilePic: user.profilePic || '',
                type: user.type || 'adult',
                dob: user.dob ? user.dob.toISOString().split('T')[0] : null,
                email: user.email || userAccount.email || '',
                phoneNumber: user.phoneNumber || '',
                address: {
                    house: user.address?.house || '',
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    country: user.address?.country || ''
                },
                knownTravellerNumber: user.knownTravellerNumber || '',
                emergencyContacts: user.emergencyContacts || [],
                bagsCount: user.bagsCount || 0,
                userAccount: {
                    email: userAccount.email || '',
                    dealAlerts: !!userAccount.dealAlerts,
                    termsAndConditions: !!userAccount.termsAndConditions,
                    connectedAccounts: {
                        google: !!userAccount.googleId,
                        apple: !!userAccount.appleId,
                        facebook: !!userAccount.facebookId
                    }
                }
            }
        };


        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};