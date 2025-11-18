
import axious from "axios";

const BASEURL = import.meta.env.VITE_BE_URL

const registerUser = (payload:any) => {
    return axious.post(`${BASEURL}users/register/`, payload)
}

const loginUser = (payload:any) => {
    return axious.post(`${BASEURL}users/login/`, payload)
}   

const resetPassword = (payload:any) => {
    return axious.post(`${BASEURL}users/password_reset/`, payload)
}   

const setNewPassword = (payload:any) => {
    return axious.post(`${BASEURL}users/password_reset_confirm/`, payload)
}   
const resendVerificationCode = () => {
    return axious.get(`${BASEURL}users/resend_verify_code/`)
}

const verificationEmailCode = (payload: any) => {
    return axious.post(`${BASEURL}users/verify_code/`, payload)
}

const logoutUser = () => {
    return axious.get(`${BASEURL}users/logout/`,)
}   

export {
    registerUser,
    loginUser,
    resetPassword,
    setNewPassword,
    resendVerificationCode,
    verificationEmailCode,
    logoutUser,
}
