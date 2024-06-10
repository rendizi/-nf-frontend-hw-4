import axios from "axios";
import {toast} from "react-toastify";

const axiosStorageInstance = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
})

const axiosProductsInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
})



export {
    axiosProductsInstance,
    axiosStorageInstance
}