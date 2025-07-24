import axios from 'axios';
import qs from 'qs';

const getAccessToken = async () => {
    const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.lufthansaKey,
        client_secret: process.env.lufthansaSecret,
    });

    const res = await axios.post(
        'https://api.lufthansa.com/v1/oauth/token',
        data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    );

    return res.data.access_token;
};

export default getAccessToken;
