'use client'
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";

export default function TopNavBar() {
    const {data: session} = useSession();

    return (
        <>
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-2xl font-bold">MiloNite</div>
                        <ul className="flex space-x-4">
                            <button>
                                <Link className="text-white hover:text-gray-300" href={"/"}>Home</Link>
                            </button>
                            <button>
                                <Link className="text-white hover:text-gray-300" href={"/users"}>Users</Link>
                            </button>
                            {session == null ? (<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => signIn()}>Sign in</button>) : (
                                <>
                                    <button className="text-white hover:text-gray-300">{
                                        //@ts-ignore
                                        session.user?.firstName
                                    }</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" onClick={() => signOut()}>Sign out</button>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}