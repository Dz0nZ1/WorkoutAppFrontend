import Link from "next/link";
import {useEffect, useState} from "react";
import {usersRequest} from "@/data";
import {User} from "@/types";

export default function UserPage(){

    const [users, setUsers] = useState<User>();


    const fetchData = async () => {
        const response = await usersRequest.all();
        setUsers(response);
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log(users);


    return (
        <>
            <h1>User Page</h1>
           <Link href={'/'}>Go to home page</Link>
        </>
    )
}