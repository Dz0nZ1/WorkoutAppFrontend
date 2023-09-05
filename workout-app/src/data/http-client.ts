import axios from "axios";

export const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    timeout: 150000000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    timeout: 150000000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getDemo = async <T>(url: string, params?: any, config?: any) => {
    const response = await Axios.get<T>(url, {params, headers: config?.headers});
    return response.data;
}

export const postDemo = async <T>(url: string, params?: any, config?: any) => {
    const response = await Axios.post<T>(url, params, config);
    return {data: response.data, status: response.status}
}






