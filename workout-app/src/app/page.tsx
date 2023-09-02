'use client'

import {useSession} from "next-auth/react";
export default function HomePage() {

    const {data: session} = useSession();

    return (
        <>
            <h1 className={"text-3xl"}>App home page</h1>
        </>

    )
}
