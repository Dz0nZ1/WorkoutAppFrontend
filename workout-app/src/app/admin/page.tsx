"use client"

import {useGetExercises} from "@/hooks/useGetExercises";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {useGetUsers} from "@/hooks/useGetUsers";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {useCreateExercise} from "@/hooks/useCreateExercise";
import {useDeleteExerciseById} from "@/hooks/useDeleteExerciseById";
import useAuth from "@/hooks/useAuth";

export default function AdminPage() {

    const axiosAuth = useAuth();
    const {data: session} = useSession();
    const {data: exercises, isLoading, error} = useGetExercises();
    const {data: users} = useGetUsers();
    const userHeader : string[] = ["NAME", "LASTNAME", "EMAIL", "ACTIVE"];
    const exerciseHeader : string[] = ["NAME", "CATEGORY", "PHOTO"]
    const [manageStatus, setMangeStatus] = useState<string>("create");
    //@ts-ignore
    const {createExercise}  = useCreateExercise();
    //@ts-ignore
    // const {deleteExerciseById} = useDeleteExerciseById();
    const [exercise, setExercise] = useState<object>({
        name:'',
        photo: '',
        category: ''

    });

    const [deleteExercise, setDeleteExercise] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the corresponding form field in the state
        setExercise({
            ...exercise,
            [name]: value,
        });
    };



    const handleCreate = (e: any) => {
        e.preventDefault();
        createExercise(exercise);
        alert("Exercise added");
        setExercise({
            name:'',
            photo: '',
            category: ''
        });
    }


    const handleDeleteChange = (e) => {
        setDeleteExercise(e.target.value);
    }

    const handleDelete = (e: any) => {
        e.preventDefault();
        axiosAuth.delete(`http://localhost:8080/api/v1/exercise/delete/${deleteExercise}`)
            .then((response) => {
                // Handle success
                alert("Exercise: " + deleteExercise + " was deleted");
            })
            .catch((error) => {
                // Handle error
                console.error("Error deleting exercise:", error);
                alert("Error deleting exercise: " + error.message);
            });
        // deleteExerciseById(deleteExercise);
        alert("Exercise: " + deleteExercise + "was deleted");
    }



    return(
        <>

            <div className="md:container md:mx-auto min-h-screen">
                <br /><br />
                <h1 className="text-5xl text-blue-400 flex justify-center mb-4">Control Panel</h1>

                <div className="bg-gradient-to-r from-blue-500 to-blue-300 py-10 md:py-16 lg:py-20 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-wider">
                        Welcome back, {
                        //@ts-ignore
                        session?.user?.firstName
                    }
                    </h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="mt-4 text-lg md:text-xl lg:text-2xl text-white">Take a look at your tables</p>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-4">
                        <Table aria-label="Example empty table">
                            <TableHeader>
                                {userHeader.map((head, index) => (
                                    <TableColumn key={index}>{head}</TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {users?.map((user: object, index: number) => (
                                    <TableRow key={index + 1}>
                                        <TableCell className="text-blue-500" key={index + 2}>
                                            {
                                                // @ts-ignore
                                                user?.firstName
                                            }
                                        </TableCell>
                                        <TableCell className="text-blue-500" key={index + 3}>
                                            {
                                                // @ts-ignore
                                                user?.lastName
                                            }
                                        </TableCell>
                                        <TableCell className="text-blue-500" key={index + 4}>
                                            {
                                                // @ts-ignore
                                                user?.email
                                            }
                                        </TableCell>
                                        <TableCell className="text-blue-500" key={index + 5}>
                                            {
                                                // @ts-ignore
                                                user?.accountNonExpired ? <p>True</p> : <p>False</p>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <Table aria-label="Example empty table">
                            <TableHeader>
                                {exerciseHeader.map((ex, index) => (
                                    <TableColumn key={index + 6}>{ex}</TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {exercises?.map((exercise :object, index: number) => (
                                    <TableRow key={index + 7}>
                                        <TableCell className="text-blue-500" key={index + 8}>
                                            {
                                                // @ts-ignore
                                                exercise?.name
                                            }
                                        </TableCell>
                                        <TableCell className="text-blue-500" key={index + 9}>
                                            {
                                                // @ts-ignore
                                                exercise?.category
                                            }
                                        </TableCell>
                                        <TableCell className="text-blue-500" key={index + 10}>
                                            {
                                                // @ts-ignore
                                                exercise?.photo
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>


                <h1 className="text-3xl text-blue-400 flex justify-center mt-4 mb-4">Manage Exercises</h1>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => {setMangeStatus((manageStatus) => "create")}}
                        className="px-4 py-2 text-white bg-blue-400 hover:bg-blue-500 rounded-lg">
                        CREATE
                    </button>
                    <button onClick={() => {setMangeStatus((manageStatus) => "update")}} className="px-4 py-2 text-white bg-blue-400 hover:bg-blue-500 rounded-lg">
                        UPDATE
                    </button>
                    <button onClick={() => {setMangeStatus((manageStatus) => "delete")}}
                        className="px-4 py-2 text-white bg-blue-400 hover:bg-blue-500 rounded-lg">
                        DELETE
                    </button>
                </div><br/>



                <form >
                    {manageStatus === "create" &&

                        <>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="name" id="name"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" " required
                                       onChange={handleInputChange}
                                       value={exercise.name}
                                />
                                <label htmlFor="name"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Exercise name</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="photo" id="photo"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" " required
                                       onChange={handleInputChange}
                                       value={exercise.photo}
                                />
                                <label htmlFor="photo"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exercise Photo</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="category" id="category"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" " required
                                       onChange={handleInputChange}
                                       value={exercise.category}
                                />
                                <label htmlFor="category"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exercise Category
                                </label>
                            </div>

                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleCreate}>Submit
                            </button>

                        </>

                    }

                    {manageStatus === "delete" &&

                        <>
                            <label htmlFor="delete_exercise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Choose the exercise you want to delete</label>
                            <select onChange={handleDeleteChange}
                                    id="delete_exercise"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Choose the exercise</option>
                                {exercises?.map((ex, i) => {
                                  return(
                                          <option value={ex.exerciseId} key={i}>{ex.name}</option>
                                  )
                                })}
                            </select>
                            <br/>

                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleDelete}>Submit
                            </button>

                        </>

                    }



                </form>

            </div>


        </>
    )
}