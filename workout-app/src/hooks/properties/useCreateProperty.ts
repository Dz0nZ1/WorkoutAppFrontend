import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import {CreateProperty} from "@/types/entities";

// @ts-ignore
export const useCreateProperty = (data?) => {

    const { data: session } = useSession();
    const axiosAuth = useAuth();

    const createProperty = async ( data : CreateProperty) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.post(API_ENDPOINTS.PROPERTY_CREATE, data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const createPropertyHandler = (data? : any) => {
        return createProperty(data);
    };

    const { error, isLoading } = useSWR(
        data ? `${SWR_KEYS.PROPERTY_CREATE}` : null,
        () => createPropertyHandler(),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });


    return {
        createProperty: createPropertyHandler,
        error,
        isLoading
    };

}