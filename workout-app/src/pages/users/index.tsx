import Link from "next/link";
import {User} from "@/types";
import {useGetUsers} from "@/hooks/useGetUsers";

export default function UserPage(){

   const {data = [], error} = useGetUsers();
    return (
        <>
            <h1>User Page</h1>
           <Link href={'/'}>Go to home page</Link>

            {data!.map((user: User) => {
                return(
                    <h1 key={user.id}>{user.email}</h1>
                )
            })}
        </>
    )
}