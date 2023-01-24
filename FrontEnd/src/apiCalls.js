import axios from "axios";


export const LoginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    const API_CALL = process.env.REACT_APP_BACKEND_API;
    try {
        const res = await axios.post(API_CALL + "auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
}