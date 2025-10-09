
import axious from "axios";

const BASEURL = import.meta.env.VITE_BE_URL

const registerUser = (payload:any) => {
    return axious.post(`${BASEURL}users/register/`, payload)
}

const loginUser = (payload:any) => {
    return axious.post(`${BASEURL}users/login/`, payload)
}   

export {
    registerUser,
    loginUser,
}