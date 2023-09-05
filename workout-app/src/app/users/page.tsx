"use client"
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/ui/loader";

export default function UserPage(){

    const {data: session, status} = useSession();
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState("");

    const axiosAuth = useAuth();


    useEffect(() => {
        const fetchUsers = async () => {
           try {
               setIsLoading(true);
               setError("");
               const res = await axiosAuth.get("http://localhost:8080/users/all");
               console.log(res.status);
               setUsers(res.data);
           }catch (err){
               // @ts-ignore
               setError(err.message);
           }finally {
               setIsLoading(false);
           }

        };

        fetchUsers();
    }, [axiosAuth]);

    return (
        <>
            {(isLoading || error) ? <Loader/> :
                <>
                    <h1>App users page</h1>
                    {/*<button onClick={fetchUsers}>Get Users</button>*/}
                    {/*{users && JSON.stringify(users)}*/}
                </>
            }
            {users && JSON.stringify(users)}
        </>
    );

}