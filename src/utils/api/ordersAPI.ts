import axios from 'axios';

const BASEURL = import.meta.env.VITE_BE_URL + 'orders/'


const getOrdersAPI = () => {
    return axios.get(`${BASEURL}`)
}

const getSingleOrderAPI = (param:string, orderId: string) => {
    return axios.get(`${BASEURL}${orderId}/?lookup=${param}`)
}

const createNewOrderAPI = (payload: any) => {
    return axios.post(`${BASEURL}`, payload)
}

export {
    getOrdersAPI,
    getSingleOrderAPI,
    createNewOrderAPI,
}