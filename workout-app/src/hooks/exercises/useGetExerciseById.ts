import {useSession} from "next-auth/react";
import useAuth from "@/hooks/auth/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";
import useSWR, {mutate} from "swr";
import {SWR_KEYS} from "@/data/swrKeys";

export const useGetExerciseById = (id? : string | number) => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const fetchExerciseById = async (id? : string | number | null) : Promise<any> => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            const res = await axiosAuth.get(`${API_ENDPOINTS.EXERCISE_GET}${id}` ,{headers});
            return res.data;
        }catch (error){
            console.log(error);
        }

    };

    const fetchExerciseByIdHandler =(id? : any) => {
        return fetchExerciseById(id);
    }


    const revalidateExercise = () => {
        mutate(`${SWR_KEYS.EXERCISE_GET}/${id}`);
    };

    const {data, error, isLoading} = useSWR(
        id ? `${SWR_KEYS.EXERCISE_GET}/${id}` : null, () => {
            return fetchExerciseByIdHandler(id);
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    return {getExerciseById: fetchExerciseByIdHandler, error, isLoading, revalidateExercise};

}