import {Dispatch, ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import {AppProps} from "next/app";

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
    rowNumber?: number,
    headers?: {
        Authorization?: string
    }
}

export interface CreateUserQuery {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface UpdateUserQuery {
    email: string;
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


//Layout settings

export type NextPageWithLayout <P = {}> = NextPage<P> & {
    authorization?: boolean,
    getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
}