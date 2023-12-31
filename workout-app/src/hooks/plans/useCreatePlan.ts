import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import {Plan} from "@/types/entities";

// @ts-ignore
export const useCreatePlan = (data?) => {

    const { data: session } = useSession();
    const axiosAuth = useAuth();

    const createPlan = async (data : Plan) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            console.log(headers);
            const res = await axiosAuth.post(API_ENDPOINTS.PLAN_CREATE, data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const createPlanHandler = (data? : any) => {
        return createPlan(data);
    };


    const { error, isLoading } = useSWR(
        data ? `${SWR_KEYS.PLAN_CREATE}` : null,
        () => createPlanHandler(data),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });


    return {
        createPlan: createPlanHandler,
        error,
        isLoading
    };

}