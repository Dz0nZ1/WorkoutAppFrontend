import {getDemo} from "@/data/http-client";
import {QueryOptions, User} from "@/types";
import {API_ENDPOINTS} from "@/data/endpoints";

export const usersRequest = {
    all:({...query}: QueryOptions = {}) =>
        getDemo<User[]>(API_ENDPOINTS.USERS_GET_ALL, {...query})
};