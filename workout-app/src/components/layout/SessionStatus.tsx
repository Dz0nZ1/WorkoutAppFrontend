"use client"
import {useSession} from "next-auth/react";
import React from "react";
import Loader from "@/components/ui/loader";

export default function SessionStatusWrapper({
                                                 children,
                                             }: {
    children: React.ReactNode
}) {
    const {data: session, status} = useSession();

    return (
        <>
            {status === "loading" ?
                <Loader/> :
                <>
                    {children}
                </>
            }
        </>
    );
}