import useSWR, {mutate} from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";

export const useGetPlansWithUserId = (id : string | number) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const fetchPlansWithId = async (id : string | number) => {
        try {
            // @ts-ignore
            if (!session?.user?.access_token) {
                throw new Error('Access token not available');
            }


            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session.user.access_token}`
            }
            const res = await axiosAuth.get(`${API_ENDPOINTS.PLAN_GET_ALL_WITH_ID}${id}` ,{headers});
            return res.data;
        }catch (error){
            console.log('Fetch Plans Error:', error);
        }

    };


    const revalidatePlans = () => {
        mutate(`${SWR_KEYS.PLAN_GET_ALL_WITH_ID}/${id}`);
    };

    const {data, error, isLoading} = useSWR(
        `${SWR_KEYS.PLAN_GET_ALL_WITH_ID}/${id}`, () => {
            return fetchPlansWithId(id);
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    return {data, error, isLoading, revalidatePlans};

}