
import axios from 'axios';


const BASEURL = import.meta.env.VITE_BE_URL

const getVehicles = () => {
    return axios.get(`${BASEURL}mains/vehicles/`)
}

const searchVehiclesAPI = async (payload: string, page?: number, limit?: number) => {
    return axios.get(`${BASEURL}mains/vehicles/?page=${page ?? 1}&limit=${limit ?? 50}&${payload}`)
}

const getAVehicle = (id:any) => {
    return axios.get(`${BASEURL}mains/vehicles/${id}/`)
}

const createAVehicleEnquiry = (data:any) => {
    return axios.post(`${BASEURL}mains/enquiry/vehicles/`, data)
}

const createVehicleRepair = (data:any) => {
    return axios.post(`${BASEURL}mains/repair/vehicles/`, data)
}

const editVehicleRepair = (data:any, id: any) => {
    return axios.put(`${BASEURL}mains/repair/vehicles/${id}/`, data)
}

const getVehicleRepair = (id: any) => {
    return axios.get(`${BASEURL}mains/repair/vehicles/${id}/`)
}



export {
    getVehicles,
    searchVehiclesAPI,
    getAVehicle,
    createAVehicleEnquiry,
    createVehicleRepair,
    editVehicleRepair,
    getVehicleRepair,
}