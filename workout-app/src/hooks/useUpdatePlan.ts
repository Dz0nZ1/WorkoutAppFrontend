import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";

export const useUpdatePlan = (data? : any, id? : string | number) => {

    const { data: session } = useSession();
    const axiosAuth = useAuth();

    const updatePlan = async ( data? : any, id? : string | number) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.put(`${API_ENDPOINTS.PLAN_UPDATE}${id}`, data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const updatePlanHandler = (data : any, id? : string | number) => {
        return updatePlan(data, id);
    };

    const { error, isLoading } = useSWR(
        id ? `${SWR_KEYS.PLAN_UPDATE}/${id}` : null,
        () => updatePlanHandler(data, id),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });


    return {
        updatePlan: updatePlanHandler,
        error,
        isLoading
    };

}