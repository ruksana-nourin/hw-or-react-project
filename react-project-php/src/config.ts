import axios from "axios";

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