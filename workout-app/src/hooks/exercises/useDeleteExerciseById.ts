import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";

// @ts-ignore
export const useDeleteExerciseById = (id? : string | number) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const deleteExercise = async (id? : string | number) => {
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

    const deleteExerciseHandler = (id : any) => {
        return deleteExercise(id);
    };

    const { error, isLoading } = useSWR(
        id ? `${SWR_KEYS.EXERCISE_DELETE}${id}` : null,
        () => deleteExerciseHandler(id),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });


    return {
        deleteExercise: deleteExerciseHandler,
        error,
        isLoading
    };

}
