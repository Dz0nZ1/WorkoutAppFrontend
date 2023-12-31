import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";

export const useDeletePropertyById = (id? : string | number) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const deleteProperty = async (id? : string | number) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.delete(`${API_ENDPOINTS.PROPERTY_DELETE}${id}`, {headers});
        }catch (error){
            console.log(error);
        }

    };

    const deletePropertyHandler = (id : any) => {
        return deleteProperty(id);
    };

    const { error, isLoading } = useSWR(
        id ? `${SWR_KEYS.PROPERTY_DELETE}/${id}` : null,
        () => deletePropertyHandler(id),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });


    return {
        deleteProperty: deletePropertyHandler,
        error,
        isLoading
    };

}