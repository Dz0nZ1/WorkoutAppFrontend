import useSWR, {mutate} from "swr";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {API_ENDPOINTS} from "@/data/endpoints";

export const useGetUsers = () => {

    const {data: session} = useSession();

    const axiosAuth = useAuth();

    const fetchUsers = async () => {
        try {
            const headers = {
                // @ts-ignore
                Authorization: `Bearer ${session?.user?.access_token}`
            }
            //http://localhost:8080/users/all
            const res = await axiosAuth.get(API_ENDPOINTS.USERS_GET_ALL, {headers});
            return res.data;
        }catch (error){
            console.log(error);
        }

    };


    const revalidateUsers = () => {
        mutate(SWR_KEYS.USERS_GET_ALL);
    };

    const {data, error, isLoading} = useSWR(
        `${SWR_KEYS.USERS_GET_ALL}`, () => {
            return fetchUsers();
        },
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    return {data, error, isLoading, revalidateUsers};

}