import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../tools/Tools";

const SignupAPI = async (data) => {
    try {
        return (await axios.post(`${BACKEND_URL}/`, data)).data;
    } catch (e) {
        return e.message;
    }
}

export default SignupAPI