// tools/authHelpers.js (or any utility file)
import Cookies from 'js-cookie';
import { logout } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

export const logoutUser = (dispatch) => {
    // 1. Clear Redux state
    dispatch(logout());

    // 2. Remove JWT cookie
    Cookies.remove('token'); // Only needed if you're using js-cookie to read JWT

    window.location.href = '/'
};
