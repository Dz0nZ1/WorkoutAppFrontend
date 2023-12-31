import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";

export const useGetPropertiesByName = (name? : string) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const getPropertiesByName = async (name : string) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.get(`${API_ENDPOINTS.PROPERTY_GET}${name}` ,{headers});
            return res.data;
        }catch (error){
            console.log(error);
        }

    };

    const getPropertiesByIdHandler = (name? : any) => {
        return getPropertiesByName(name);
    };

    const {data, error, isLoading} = useSWR(
        name ? `${SWR_KEYS.PROPERTY_GET_FOR_EXERCISE}${name}` : null, () => {
            return getPropertiesByIdHandler(name);
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    return {getPropertiesByName:getPropertiesByIdHandler, error, isLoading};

}