"use client";

import { useState } from "react";
import { useGetExercises } from "@/hooks/useGetExercises";
import { useSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import { useCreatePlan } from "@/hooks/useCreatePlan";
import { API_ENDPOINTS } from "@/data/endpoints";

//components
import SingleWorkout from "@/components/workout/SingleWorkout";
import {Exercise, Property} from "@/types/entities";
import {useCreateProperty} from "@/hooks/useCreateProperty";
import {useGetPropertiesByName} from "@/hooks/useGetPropertiesByName";
import {useDeletePropertyById} from "@/hooks/useDeletePropertyById";

export default function CreatePlanForm() {
    const { data: session } = useSession();
    const { data: exercises } = useGetExercises();


    const [propertyList, setPropertyList] = useState([]);
    const [exercisePlan, setExercisePlan] = useState([]);


    const [formData, setFormData] = useState({
        name: "",
        //@ts-ignore
        identity: session?.user.user_id,
        exercises: [],
        properties: [],
    });

    //hook functions
    const {createPlan, error: createPlanError, isLoading: createPlanLoading} = useCreatePlan()
    const {createProperty, error: createPropertyError, isLoading: createPropertyLoading} = useCreateProperty();
    const {getPropertiesByName, error: getPropertiesByNameError, isLoading:getPropertiesByNameIsLoading} = useGetPropertiesByName();
    const {deleteProperty, error:deletePropertyError, isLoading: deletePropertyIsLoading } = useDeletePropertyById()


    const handleSubmit = async (e : any) : Promise<void> => {
        e.preventDefault();
          await createPlan(formData);
        alert("Plan has been created");
    };

    //This function deletes exercises from plan
    const removeFromPlan = async (ex : any) : Promise<void> => {
        const newPlan = exercisePlan.filter((exercise) => exercise !== ex);
        setExercisePlan(newPlan);
        const newList = await getPropertiesByName(formData.name);
        const deletedExercise =  newList.filter((prop : Property) => {
            return prop.forExercise === ex.name;
        });
        await deleteProperty(deletedExercise[0].propertyId);
        //
        return;
    };

    const handleAddExercises = async () : Promise<void> => {
        const newList = await getPropertiesByName(formData.name);
        setFormData((prevFormData: any) => {
            return {
                ...prevFormData,
                // @ts-ignore
                exercises: exercisePlan,
                properties: newList,
            };
        });
        alert("Exercises are added to the plan");
    };

    return (
        <div className="p-8">
            <h2 className="text-blue-500 text-3xl font-bold mb-4">
                Create a new training plan
            </h2>
            <div className="mb-8">
                <label className="block text-gray-600 mb-2">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
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
                                    return [...prevPropertyList, newProperty];
                                });

                                const newProperties = { ...newProperty, forPlan: formData.name, forExercise: ex.name};
                                createProperty(newProperties);

                                // @ts-ignore
                                setExercisePlan((prevPlan) => {
                                    return [...prevPlan, ex];
                                });
                            }}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <hr className="my-8" />
                <h3 className="text-lg font-semibold">Current plan:</h3>
                <ul className="list-disc pl-6 mt-2">
                    {exercisePlan.map((ex : Exercise, index : number) => (
                        <li key={index} className="mb-2">
                            {ex.name}
                            <button
                                onClick={() => removeFromPlan(ex)}
                                className="ml-2 bg-red-400 text-white rounded px-3 py-1 focus:outline-none hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <br />
                <button
                    onClick={handleAddExercises}
                    className="bg-green-400 text-white rounded px-4 py-2 mt-4 focus:outline-none hover:bg-green-600"
                >
                    Add selected exercises to plan
                </button>
                <hr className="my-8" />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-400 text-white rounded px-4 py-2 focus:outline-none hover:bg-blue-600"
                >
                    Create plan
                </button>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}