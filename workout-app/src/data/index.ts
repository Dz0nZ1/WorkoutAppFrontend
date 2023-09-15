import {getDemo, postDemo} from "@/data/http-client";
import {CreatePlanQuery, CreateUserQuery, QueryOptions, User} from "@/types";
import {API_ENDPOINTS} from "@/data/endpoints";

export const usersRequest = {
    all:(query? : QueryOptions, config? : any) =>
        getDemo<User[]>(API_ENDPOINTS.USERS_GET_ALL, {...query}, config),
    create: ({...query} : CreateUserQuery ) =>
        postDemo<User>(API_ENDPOINTS.USERS_REGISTER, {...query})
};

export const planRequest = {
    create: ({...query} : CreatePlanQuery, config?: any ) =>
        postDemo<User>(API_ENDPOINTS.PLAN_CREATE, {...query}, config)
};