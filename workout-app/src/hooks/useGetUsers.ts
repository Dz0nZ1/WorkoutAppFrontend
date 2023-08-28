import useSWR from "swr";
import {usersRequest} from "@/data";
import {SWR_KEYS} from "@/data/swrKeys";

export const useGetUsers = () => {

    const {data, error} = useSWR(
        `${SWR_KEYS.USERS_GET_ALL}`, () => { return usersRequest.all()},
        {
            refreshInterval: 90000,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOn: false,
            revalidateOnReconnect: false
        });

    return {data, error};

}