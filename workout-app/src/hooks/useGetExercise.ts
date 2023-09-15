import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";

// @ts-ignore
export const useGetExercise = (id) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const fetchExercise = async () => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.get(`${API_ENDPOINTS.EXERCISE_GET}${id}`, {headers});
            return res.data;
        }catch (error){
            console.log(error);
        }

    };


    const {data, error, isLoading} = useSWR(
        `${SWR_KEYS.EXERCISE_GET}`, () => {
            return fetchExercise();
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    return {data, error, isLoading};

}