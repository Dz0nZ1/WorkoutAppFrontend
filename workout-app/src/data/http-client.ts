import axios from "axios";

export const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    timeout: 150000000,
    headers: {
        'Content-type': 'application/json',
    },
});

export const getDemo = async <T>(url:string, params?: unknown) => {
    try {
        const response = await Axios.get<T>(url, { params });
        return response.data;
    } catch (error) {
        const defaultErrorMessage = 'An error occurred while fetching the data.';
        throw new Error(defaultErrorMessage);
    }
}

export const postDemo = async <T>(url: string, params?:unknown) => {
    try {
        const response= await Axios.post<T>(url, params);
        return response.data;
    } catch (error) {
        const defaultErrorMessage = 'An error occurred while making the request.';
        throw new Error(defaultErrorMessage);
    }
}


