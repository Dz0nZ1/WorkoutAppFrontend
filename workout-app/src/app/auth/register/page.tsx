"use client"
import {useForm} from "react-hook-form";
import {RegisterQuery} from "@/types";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {registerUserSchema} from "@/validators/users/reisterUserValidator";
import {usersRequest} from "@/data";
import {useRouter} from "next/navigation";

interface IProps {
    searchParams?: { [key : string]: string | string[] | undefined}
}

export default function RegisterPage({searchParams} : IProps) {

    const {register, handleSubmit, formState: {errors}}
        = useForm<RegisterQuery>({
        mode:'onSubmit',
        resolver: yupResolver(registerUserSchema)
    })

    const [errorClose, setErrorClose] = useState<Boolean>(false);
    const router = useRouter();

    return(
        <>

            {/*via-blue-400*/}
            <div className="bg-gradient-to-b from-blue-500 via-blue-200 to-gray-100 h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg sm:w-96 w-full">
                    {!errorClose && (<div>
                        <button onClick={() => setErrorClose(errorClose => true)}>
                            {searchParams?.message && (
                                <div className="bg-red-100 w-80 border border-red-400 text-red-700 px-2 py-1 rounded shadow-md">
                                    <span className="font-bold">Error:</span>
                                    <span className="ml-2">{searchParams?.message}</span>
                                </div>
                            )}
                        </button>
                    </div>) }
                    <br/>
                    <h2 className="text-2xl font-semibold mb-6 flex justify-center">Sign up</h2>
                    <div className="mb-4">
                        <label htmlFor="first-name" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input type="text" id="first-name" {...register("firstName")} className="border rounded-lg px-3 py-2 w-full"
                               placeholder="Your First Name" required/>
                        {errors.firstName && (<div>{errors.firstName?.message as string}</div>)}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last-name" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input type="text" id="last-name" {...register("lastName")} className="border rounded-lg px-3 py-2 w-full"
                               placeholder="Your Last Name" required/>
                        {errors.lastName && (<div>{errors.lastName?.message as string}</div>)}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" {...register("email")} className="border rounded-lg px-3 py-2 w-full"
                               placeholder="Your email" required/>
                        {errors.email && (<div>{errors.email?.message as string}</div>)}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" {...register("password")}
                               className="border rounded-lg px-3 py-2 w-full" placeholder="Your password" required/>
                        {errors.password && (<div>{errors.password?.message as string}</div>)}
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
                        onClick={
                            () => { handleSubmit(
                                data => {usersRequest.create(data); router.push("/auth/login")})();
                            }}>Register new account
                    </button>
                </div>
            </div>
        </>
    )
}