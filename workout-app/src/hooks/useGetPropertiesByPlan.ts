import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {Plan} from "@/types/entities";

export const useGetPropertiesByPlan = (id? : number | string) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const getPropertiesByPlan = async (id? : number | string) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.get(`${API_ENDPOINTS.PROPERTY_GET_ALL_FROM_PLAN}${id}` ,{headers});
            return res.data;
        }catch (error){
            console.log(error);
        }

    };

    const getPropertiesByPlanHandler = (id? : any) => {
        return getPropertiesByPlan(id);
    };

    const {data, error, isLoading} = useSWR(
        id ? `${SWR_KEYS.PROPERTY_GET_FOR_PLAN}/${id}` : null, () => {
            return getPropertiesByPlanHandler(id);
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    return {data, getPropertiesByPlan:getPropertiesByPlanHandler, error, isLoading};

}