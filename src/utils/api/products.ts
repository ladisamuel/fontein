
import axios from 'axios';


const BASEURL = import.meta.env.VITE_BE_URL

const getVehicles = () => {
    return axios.get(`${BASEURL}mains/vehicles/`)
}

    const searchVehiclesAPI = async (payload: string, page?: number, limit?: number) => {
        return axios.get(`${BASEURL}mains/vehicles/?page=${page ?? 1}&limit=${limit ?? 50}&${payload}`)
    }
//   `http://your-backend-url/api/vehicles/?${query}`


const getAVehicle = (id:any) => {
    return axios.get(`${BASEURL}mains/vehicles/${id}/`)
}

const createAVehicleEnquiry = (data:any) => {
    return axios.post(`${BASEURL}mains/enquiry/vehicles/`, data)
}

export {
    getVehicles,
    searchVehiclesAPI,
    getAVehicle,
    createAVehicleEnquiry,
}