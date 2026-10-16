import axios from "axios";
import { checkToken } from "./utils/Auth";

// local
export const basePath =  "http://localhost/react-project-api/";
export const baseApiUrl =  "http://localhost/react-project-api/api/";

//Host
// export const baseUrl =  "http://nourin.xyz/";
// export const baseApiUrl =  "http://nourin.xyz/api/";


export const api = axios.create({
    baseURL: baseApiUrl,
    headers:{
        "Content-Type": "application/json",
    },
})
api.interceptors.request.use((config)=>{
    const token = checkToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})