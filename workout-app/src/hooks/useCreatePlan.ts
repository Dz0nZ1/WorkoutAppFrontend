import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";

// @ts-ignore
export const useCreatePlan = (data) => {

    const { data: session } = useSession();
    const axiosAuth = useAuth();

    const createPlan = async (data : any) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.post(API_ENDPOINTS.PLAN_CREATE, data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const { error, isLoading } = useSWR(
        `${SWR_KEYS.PLAN_CREATE}`,
        () => createPlanHandler(data),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    const createPlanHandler = (data : any) => {
        return createPlan(data);
    };

    return {
        createPlan: createPlanHandler,
        error,
        isLoading
    };

}