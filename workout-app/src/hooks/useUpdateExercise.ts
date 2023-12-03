import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";

export const useUpdateExercise = (data? : any, id? : string | number) => {

    const { data: session } = useSession();
    const axiosAuth = useAuth();

    const updateExercise = async ( data? : any, id? : string | number) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.put(`${API_ENDPOINTS.EXERCISE_UPDATE}${id}`, data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const updateExerciseHandler = (data : any, id? : string | number) => {
        return updateExercise(data, id);
    };

    const { error, isLoading } = useSWR(
        id ? `${SWR_KEYS.EXERCISE_UPDATE}/${id}` : null,
        () => updateExerciseHandler(data, id),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });


    return {
        updateExercise: updateExerciseHandler,
        error,
        isLoading
    };

}