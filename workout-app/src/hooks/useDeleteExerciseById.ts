import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";

// @ts-ignore
export const useDeleteExerciseById = (id) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const deleteExercise = async (id : any) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.delete(`${API_ENDPOINTS.EXERCISE_DELETE}${id}`, {headers});
        }catch (error){
            console.log(error);
        }

    };


    const {data, error, isLoading} = useSWR(
        `${SWR_KEYS.EXERCISE_DELETE}${id}`, () => {
            return deleteExerciseHandler(id);
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    const deleteExerciseHandler = (id : any) => {
        return deleteExercise(id);
    };

    return {
        deleteExerciseById: deleteExerciseHandler,
        error,
        isLoading
    };

}