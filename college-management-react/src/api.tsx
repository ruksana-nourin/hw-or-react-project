
import axios from "axios";

export const baseUrl = "http://college-management-api.test/";
// http://college-management-api.test/api/exam-results

export const baseUrlApi = "http://college-management-api.test/api/";

export const api = axios.create({
    baseURL: baseUrlApi,
    headers: {
        "Content-Type": "application/json",
    },
});

// api.interceptors.request.use(function (config) {
//     config.headers.Authorization =
//         "Bearer " + localStorage.getItem("college_token");

//     return config;
// });