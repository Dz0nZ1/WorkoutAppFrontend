import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import useSWR, {mutate} from "swr";
import {SWR_KEYS} from "@/data/swrKeys";

export const useGetPlan = (id? : string | number) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const getPlan = async (id? : string | number | null) : Promise<any> => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.get(`${API_ENDPOINTS.PLAN_GET}${id}` ,{headers});
            return res.data;
        }catch (error){
            console.log(error);
        }

    };

    const getPlanHandler =(id? : any) => {
        return getPlan(id);
    }


    const revalidatePlan = () => {
        mutate(`${SWR_KEYS.PLAN_GET}/${id}`);
    };

    const {data, error, isLoading} = useSWR(
        id ? `${SWR_KEYS.PLAN_GET}/${id}` : null, () => {
            return getPlanHandler(id);
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    return {data, error, isLoading, revalidatePlan};

}