import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";

export const useGetExercises = () => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const fetchExercises = async () => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.get(API_ENDPOINTS.EXERCISE_GET_ALL, {headers});
            return res.data;
        }catch (error){
            console.log(error);
        }

    };

    const {data, error, isLoading} = useSWR(
        `${SWR_KEYS.EXERCISE_GET_ALL}`, () => {
            return fetchExercises();
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