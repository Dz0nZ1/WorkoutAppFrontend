import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";

export const useUpdateProperty = (data? : any, id? : string | number) => {

    const { data: session } = useSession();
    const axiosAuth = useAuth();

    const updateProperty = async ( data? : any, id? : string | number) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.put(`${API_ENDPOINTS.PROPERTY_UPDATE}${id}`, data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const updatePropertyHandler = (data : any, id? : string | number) => {
        return updateProperty(data, id);
    };

    const { error, isLoading } = useSWR(
        id ? `${SWR_KEYS.PROPERTY_UPDATE}/${id}` : null,
        () => updatePropertyHandler(data, id),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });


    return {
        updateProperty: updatePropertyHandler,
        error,
        isLoading
    };

}