import useSWR from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import {CreateExercise} from "@/types/entities";

// @ts-ignore
export const useCreateExercise = (data?) => {

    const { data: session } = useSession();
    const axiosAuth = useAuth();

    const createExercise = async ( data : CreateExercise) => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.post(API_ENDPOINTS.EXERCISE_CREATE, data, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const createExerciseHandler = (data? : any) => {
        return createExercise(data);
    };

    const { error, isLoading } = useSWR(
        data ? `${SWR_KEYS.EXERCISE_CREATE}` : null,
        () => createExerciseHandler(),
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });


    return {
        createExercise: createExerciseHandler,
        error,
        isLoading
    };

}