"use client";

import { useState } from "react";
import { useGetExercises } from "@/hooks/useGetExercises";
import { useSession } from "next-auth/react";
import { useCreatePlan } from "@/hooks/useCreatePlan";
import {Button, Input} from "@nextui-org/react";


//components
import SingleWorkout from "@/components/workout/SingleWorkout";
import {Exercise, Property} from "@/types/entities";
import toast from "react-hot-toast";

export default function CreatePlanForm() {
    const { data: session } = useSession();
    const { data: exercises } = useGetExercises();
    const [disabled, setDisabled] = useState<boolean>(true)
    const [propertyList, setPropertyList] = useState<Property[]>([]);
    const [exercisePlan, setExercisePlan] = useState([]);


    const [formData, setFormData] = useState({
        name: "",
        //@ts-ignore
        identity: session?.user.user_id,
        exercises: [],
        properties: [],
    });

    //hook functions
    const {createPlan, error: createPlanError, isLoading: createPlanLoading} = useCreatePlan();


    const handleSubmit = async (e : any) : Promise<void> => {
        e.preventDefault();
        console.log(formData);
        await toast.promise(createPlan(formData), {
            loading: 'Loading',
            success: 'Plan was successfully created',
            error: 'Error creating a plan',
        });
    };

    //This function deletes exercises from plan
    const removeFromPlan =  (ex : any) : void => {
        const newPlan = exercisePlan.filter((exercise) => exercise !== ex);
        setExercisePlan(newPlan);
        const propList = propertyList.filter((prop : Property) => prop.forExercise !== ex.name);
        setPropertyList(propList);
        console.log(propertyList);
        setDisabled(true);
        toast.success("Removed from selection");

    };

    const handleAddExercises = async () : Promise<void> => {
        setFormData((prevFormData: any) => {
            return {
                ...prevFormData,
                // @ts-ignore
                exercises: exercisePlan,
                properties: propertyList,
            };
        });
        setDisabled(false)
        toast.success("Exercises are added to your plan");
    };

    return (
        <div className="container mx-auto">
            <div className="p-8 shadow-2xl bg-gradient-to-r from-white to-gray-100">
                <h1 className="text-5xl  text-blue-400 text-center mb-16">
                    Create a new workout plan
                </h1>


                <div className="mb-8 flex justify-center flex-col items-center">
                    {/*<label className="block text-gray-600 mb-2">Name:</label>*/}
                    <Input
                        label="Plan name"
                        labelPlacement="outside"
                        type="text"
                        name="name"
                        value={formData.name}
                        className="w-1/2"
                        size="lg"
                        isRequired={true}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        // className="w-full border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                    />
                    <h3 className="text-lg font-semibold mt-4 mb-1">
                        Choose the exercises:
                    </h3>
                    <ul className="list-disc pl-6 mt-2">
                        {exercises?.map((ex : Exercise, index : number) => (
                            <SingleWorkout
                                ex={ex}
                                key={index}
                                triggerUpdatePropertyList={(newProperty: any) => {


                                    // @ts-ignore
                                    setPropertyList((prevPropertyList) => {
                                        const newProperties = { ...newProperty, forExercise: ex.name};
                                        return [...prevPropertyList, newProperties];
                                    });

                                    // @ts-ignore
                                    setExercisePlan((prevPlan) => {
                                        return [...prevPlan, ex];
                                    });

                                    console.log(propertyList);
                                    toast.success("Exercise was added");

                                }}
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <hr className="my-8" />
                    <h3 className="text-xl font-semibold text-center mb-12">Current plan</h3>
                    <ul className="list-disc pl-6 mt-2  flex flex-col items-center">
                        {exercisePlan.map((ex : Exercise, index : number) => (
                            <li key={index} className="mb-2 flex flex-row justify-between gap-x-7 w-1/2">
                                <p className="mt-1 text-lg gap-x-3">{ex.name}</p>
                                <Button
                                    onClick={() => removeFromPlan(ex)}
                                    className="ml-2 bg-red-400 text-white rounded px-3 py-1 focus:outline-none hover:bg-red-600"
                                >
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            isDisabled={Object.keys(exercisePlan).length == 0 || !disabled}
                            onClick={handleAddExercises}
                            className="bg-green-400 text-white rounded px-4 py-2 mt-4 focus:outline-none hover:bg-green-600"
                        >
                            Add selected exercises to plan
                        </Button>
                    </div>
                    <hr className="my-8" />
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            onClick={handleSubmit}
                            isDisabled={disabled}
                            className="bg-blue-400 text-white rounded px-4 py-2 focus:outline-none hover:bg-blue-600"
                        >
                            Create plan
                        </Button>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>

    );
}