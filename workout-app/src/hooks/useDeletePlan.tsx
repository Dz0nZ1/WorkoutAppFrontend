import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";

// @ts-ignore
export const useDeletePlan = (id) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const deletePlan = async (id : any) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.delete(`${API_ENDPOINTS.PLAN_DELETE}${id}`, {headers});
        }catch (error){
            console.log(error);
        }

    };


    const {data, error, isLoading} = useSWR(
        `${SWR_KEYS.PLAN_DELETE}${id}`, () => {
            return deletePlanHandler(id);
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    const deletePlanHandler = (id : any) => {
        return deletePlan(id);
    };

    return {
        deletePlanById: deletePlanHandler,
        error,
        isLoading
    };

}