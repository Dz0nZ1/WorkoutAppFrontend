import {getDemo, postDemo} from "@/data/http-client";
import {CreateUserQuery, QueryOptions, User} from "@/types";
import {API_ENDPOINTS} from "@/data/endpoints";

export const usersRequest = {
    all:({...query}: QueryOptions = {}) =>
        getDemo<User[]>(API_ENDPOINTS.USERS_GET_ALL, {...query}),
    create: ({...query} : CreateUserQuery ) =>
        postDemo<User>(API_ENDPOINTS.USERS_REGISTER, {...query})
};