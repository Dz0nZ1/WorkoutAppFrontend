import axios from "axios";

export const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    timeout: 150000000,
    headers: {
        'Content-type': 'application/json',
    },
});

export const getDemo = async <T>(url:string, params?: unknown) => {
    const response = await Axios.get<T>(url, {params});
    return response.data;
}

export const postDemo = async <T>(url: string, params?:unknown) => {
    const response = await Axios.post<T>(url, {params});
    return response.data;
}


