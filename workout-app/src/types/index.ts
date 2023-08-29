import {Dispatch} from "react";

//User settings

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
}

//Query settings

export interface QueryOptions {
    pageIndex?: number,
    rowNumber?: number
}

export interface CreateUserQuery {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}


//Context and reducer settings

export interface UserSettingsContextProps {
    state: User,
    dispatch: Dispatch<UserSettingsAction>
}

export interface UserSettingsAction {
    type: UserSettingsFunction,
    payload: {
        email?: string;
        firstName? : string;
    }
}

export enum UserSettingsFunction {
    CHANGE_EMAIL = "CHANGE_EMAIL",
    CHANGE_FIRST_NAME = "CHANGE_FIRST_NAME"
}