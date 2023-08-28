
import Link from "next/link";
import {useEffect, useState} from "react";

export default function HomePage() {

    const [counter, setCounter] = useState(0);
    const [users, setUsers] = useState([]);


    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/users/all");
        const data = await response.json();
        setUsers(data);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            <h1>HomePage</h1>
            <h2>Hello MiloNite</h2>
            <Link href={"/users"}>go to user page</Link>
            <h1>{counter}</h1>
            <button onClick={() => setCounter(counter => counter + 1)}>increment</button>
            {users.map(user => {

                return(
                    // @ts-ignore
                    <p key={user.id}>{user.firstName}</p>
                )
            })}
        </>
    )
}