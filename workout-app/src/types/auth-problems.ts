import NextAuth from "next-auth/next";

export enum AuthProblems {
    WRONG_PASSWORD = "Wrong password",
    USER_NOT_FOUND = "No such user exists",
}

declare module "next-auth" {
    interface Session {
        user : {
            "email" : string,
            "user_id" : number,
            refreshToken: string,
            access_token: string,
            firstName: string,
            lastName: string,
            role: string,
            iat: number,
            exp: number,
            jti: string

        }
    }
}

