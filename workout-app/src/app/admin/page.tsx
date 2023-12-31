"use client"

import {useGetExercises} from "@/hooks/exercises/useGetExercises";
import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useGetUsers} from "@/hooks/users/useGetUsers";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {CreateExercise, Exercise, ExerciseStatus} from "@/types/entities";
import {useCreateExercise} from "@/hooks/exercises/useCreateExercise";
import {useDeleteExerciseById} from "@/hooks/exercises/useDeleteExerciseById";
import Loader from "@/components/ui/loader";
import {User} from "@/types";
import toast from "react-hot-toast";
import {useGetExerciseById} from "@/hooks/exercises/useGetExerciseById";
import {useUpdateExercise} from "@/hooks/exercises/useUpdateExercise";

export default function AdminPage() {

    const {data: session} = useSession();
    const {data:exercises, isLoading: getExerciseIsLoading, error: getExerciseError, revalidateExercises} = useGetExercises();
    const {data: users, isLoading: getUsersIsLoading, error:getUsersError} = useGetUsers();
    const userHeader : string[] = ["NAME", "LASTNAME", "EMAIL", "ACTIVE"];
    const exerciseHeader : string[] = ["NAME", "CATEGORY"]


    //Manage status
    const [manageStatus, setMangeStatus] = useState<ExerciseStatus>(ExerciseStatus.CREATE);
    const [exercise, setExercise] = useState<CreateExercise>({
        name:'',
        photo: '',
        category: ''
    });

    //argument for delete method
    const [deletedExercise, setDeleteExercise] = useState();
    const [updatedExercise, setUpdatedExercise] = useState<Exercise>({
        exerciseId: "",
        name:'',
        photo: '',
        category: ''
    });

    //hook functions
    const {createExercise} = useCreateExercise();
    const {deleteExercise} = useDeleteExerciseById();
    const {getExerciseById} = useGetExerciseById();
    const {updateExercise} = useUpdateExercise();



    const handleInputChange = (e : any) : void => {
        const { name, value } = e.target;

        // Update the corresponding form field in the state
        setExercise({
            ...exercise,
            [name]: value,
        });
    };


    const  handleCreate = async (e: any) : Promise<void> => {
        e.preventDefault();
        await toast.promise(createExercise(exercise).then(() => revalidateExercises()), {
            loading: 'Loading',
            success: 'Exercise was created successfully',
            error: 'Error creating exercise',
        });
        setExercise({
            name:'',
            photo: '',
            category: ''
        });
    }


    const handleDeleteChange = (e : any) : void => {
        setDeleteExercise(e.target.value);
    }

    const handleUpdateChange = async (e : any)  => {
        if(e.target.value == "") return;
        setUpdatedExercise(await getExerciseById(e.target.value));
        console.log(updatedExercise);
    }


    const handleDelete = async (e: any) : Promise<void> => {
        e.preventDefault();
        await toast.promise(deleteExercise(deletedExercise).then(() => revalidateExercises()), {
            loading: 'Loading',
            success: 'Exercise was deleted successfully',
            error: 'Error deleting exercise',
        });
    }

    const  handleUpdate = async (e: any) : Promise<void> => {
        e.preventDefault();
        const {exerciseId, name, photo, category} = updatedExercise
        const rest = {name, photo, category};
        await toast.promise(updateExercise(rest, exerciseId).then(() => revalidateExercises()), {
            loading: 'Loading',
            success: 'Exercise was updated successfully',
            error: 'Error updating exercise',
        });
        setExercise({
            name:'',
            photo: '',
            category: ''
        });
    }


    if(getExerciseIsLoading) {
        return <Loader/>
    }

    if(getUsersIsLoading) {
        return <Loader/>
    }

    if(getExerciseError) {
        return <div>{getExerciseError.message}</div>
    }
    if(getUsersError) {
        return <div>{getUsersError.message}</div>
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
                                {userHeader.map((head : string, index : number) => (
                                    <TableColumn key={index}>{head}</TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {users?.map((user: User, index: number) => (
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
                                {exerciseHeader.map((ex : string, index : number) => (
                                    <TableColumn key={index + 6}>{ex}</TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {exercises?.map((exercise : Exercise, index: number) => (
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
                                        {/*<TableCell className="text-blue-500" key={index + 10}>*/}
                                        {/*    {*/}
                                        {/*        // @ts-ignore*/}
                                        {/*        exercise?.photo*/}
                                        {/*    }*/}
                                        {/*</TableCell>*/}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>


                <h1 className="text-3xl text-blue-400 flex justify-center mt-16 mb-4">Manage Exercises</h1>
                <div className="flex justify-center space-x-4">
                    <Button onClick={() => {setMangeStatus((manageStatus : ExerciseStatus) => ExerciseStatus.CREATE)}}
                            className="bg-blue-400 text-white">
                        CREATE
                    </Button>
                    <Button onClick={() => {setMangeStatus((manageStatus : ExerciseStatus) => ExerciseStatus.UPDATE)}}
                            className="bg-blue-400 text-white">
                        UPDATE
                    </Button>
                    <Button onClick={() => {setMangeStatus((manageStatus : ExerciseStatus) => ExerciseStatus.DELETE)}}
                            className="bg-blue-400 text-white">
                        DELETE
                    </Button>
                </div><br/>



                <form >
                    {manageStatus === ExerciseStatus.CREATE &&

                        <div className="w-1/3 flex flex-col items-center m-auto mb-24">
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
                                className="px-4 py-2 text-white bg-blue-400 hover:bg-blue-500 rounded-lg"
                                onClick={handleCreate}>Create
                            </button>

                        </div>

                    }


                    {manageStatus === ExerciseStatus.UPDATE &&

                        <>
                            <label htmlFor="update_exercise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">
                                Choose the exercise you want to update</label>
                           <div className="flex justify-center w-1/3 m-auto">
                               <select onChange={handleUpdateChange}
                                       id="update_exercise"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7">
                                   <option value="">Choose the exercise</option>
                                   {exercises?.map((ex : Exercise, i : number) => {
                                       return(
                                           <option value={ex.exerciseId} key={i}>{ex.name}</option>
                                       )
                                   })}
                               </select>
                           </div>


                            <div className="w-1/3 flex flex-col items-center m-auto mb-24">
                                <div className="relative z-0 w-full mb-6 group">

                                    <input type="text" name="name" id="name"
                                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                           placeholder=" " required
                                           onChange={(e) => setUpdatedExercise({...updatedExercise, name: e.target.value})}
                                           value={updatedExercise?.name || ""}
                                    />
                                    <label htmlFor="name"
                                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Exercise name</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="photo" id="photo"
                                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                           placeholder=" " required
                                           onChange={(e) => setUpdatedExercise({...updatedExercise, photo: e.target.value})}
                                           value={updatedExercise?.photo || ""}
                                    />
                                    <label htmlFor="photo"
                                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exercise Photo</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="category" id="category"
                                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                           placeholder=" " required
                                           onChange={(e) => setUpdatedExercise({...updatedExercise, category: e.target.value})}
                                           value={updatedExercise?.category || ""}
                                    />
                                    <label htmlFor="category"
                                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exercise Category
                                    </label>
                                </div>

                                <button
                                    className="px-4 py-2 text-white bg-blue-400 hover:bg-blue-500 rounded-lg"
                                    onClick={handleUpdate}>Update
                                </button>

                            </div>

                        </>

                    }




                    {manageStatus === ExerciseStatus.DELETE &&

                        <>
                            <label htmlFor="delete_exercise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">
                                Choose the exercise you want to delete</label>
                           <div className="flex justify-center">
                               <select onChange={handleDeleteChange}
                                       id="delete_exercise"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                   <option>Choose the exercise</option>
                                   {exercises?.map((ex : Exercise, i : number) => {
                                       return(
                                           <option value={ex.exerciseId} key={i}>{ex.name}</option>
                                       )
                                   })}
                               </select>
                           </div>

                            <br/>

                            <div className="flex justify-center">
                                <button
                                    className="px-4 py-2 text-white bg-blue-400 hover:bg-blue-500 rounded-lg"
                                    onClick={handleDelete}>Delete
                                </button>
                            </div>

                        </>

                    }



                </form>

            </div>


        </>
    )
}