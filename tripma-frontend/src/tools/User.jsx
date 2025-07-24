import { jwtDecode } from 'jwt-decode';

class User {
    constructor(token = '') {
        let user = {};

        try {
            if (token) {
                user = jwtDecode(token);
            }
        } catch (err) {
            console.error('Invalid JWT token:', err.message);
        }

        this.userAccountId = user.userAccountId || null;
        this.firstName = user.firstName || '';
        this.middleName = user.middleName || '';
        this.lastName = user.lastName || '';
        this.profilePic = user.profilePic || '';
        this.suffix = user.suffix || '';
        this.type = user.type || 'adult';
        this.email = user.email || '';
        this.phoneNumber = user.phoneNumber || '';

        this.address = {
            house: user.address?.house || '',
            street: user.address?.street || '',
            city: user.address?.city || '',
            state: user.address?.state || '',
            country: user.address?.country || ''
        };

        this.knownTravellerNumber = user.knownTravellerNumber || '';
        this.emergencyContacts = Array.isArray(user.emergencyContacts) ? user.emergencyContacts : [];
        this.bagsCount = typeof user.bagsCount === 'number' ? user.bagsCount : 0;

        console.log(this.firstName);

    }

    toJSON() {
        return {
            userAccountId: this.userAccountId,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            profilePic: this.profilePic,
            suffix: this.suffix,
            type: this.type,
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            knownTravellerNumber: this.knownTravellerNumber,
            emergencyContacts: this.emergencyContacts,
            bagsCount: this.bagsCount,
        };
    }

}

export default User;
