import useSWR from "swr";
import {usersRequest} from "@/data";
import {SWR_KEYS} from "@/data/swrKeys";
import {useSession} from "next-auth/react";

export const useGetUsers = () => {

    const {data: session} = useSession();


    const headers = {
        // @ts-ignore
        Authorization: `Bearer ${session?.user?.access_token}`
    }

    const {data, error} = useSWR(
        `${SWR_KEYS.USERS_GET_ALL}`, () => {
            return usersRequest.all({}, {headers})},
        {
            refreshInterval: 90000,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOn: true,
            revalidateOnReconnect: true
        });

    return {data, error};

}