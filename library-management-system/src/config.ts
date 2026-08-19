import axios from "axios";

// local
export const basePath =  "http://localhost/library-management-api/";
export const baseApiUrl =  "http://localhost/library-management-api/api/";

//Host
// export const baseUrl =  "http://nourin.xyz/";
// export const baseApiUrl =  "http://nourin.xyz/api/";


export const api = axios.create({
    baseURL: baseApiUrl,
    headers:{
        "Content-Type": "application/json",
    },
})