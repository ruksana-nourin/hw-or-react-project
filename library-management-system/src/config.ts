import axios from "axios";
import { checkToken } from "./utils/Auth";


// local
// export const basePath = "http://localhost/library-management-api/";
// export const baseApiUrl = "http://localhost/library-management-api/api/";

//Host
export const basePath = "https://libraryapp.nourin.xyz/library-management-api/";
export const baseApiUrl = "https://libraryapp.nourin.xyz/library-management-api/api/";


// export const api = axios.create({
//     baseURL: baseApiUrl,
//     headers:{
//         "Content-Type": "application/json",
//     },
// });

export const api = axios.create({
    baseURL: baseApiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {

    const token = checkToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});