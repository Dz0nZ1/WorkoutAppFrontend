import Link from "next/link";
import {useGetUsers} from "@/hooks/useGetUsers";
import {useContext} from "react";
import {UserSettingsContext} from "@/components/contexts/UserSettingsContext";

export default function UserPage(){

   const {data : users = [], error} = useGetUsers();
   const context = useContext(UserSettingsContext);


    return (
        <>
            <h1>User Page</h1>
            {/*{users!.map((user: User) => {*/}
            {/*    return(*/}
            {/*        <h1 key={user.id}>{user.email}</h1>*/}
            {/*    )*/}
            {/*})}*/}
            <Link href={'/'}>Go to home page</Link>
            <h1>{context?.state.email}</h1>
        </>
    )
}