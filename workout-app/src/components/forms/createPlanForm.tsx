'use client'

import {useState} from "react";
import {useGetExercises} from "@/hooks/useGetExercises";
import {useSession} from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {useCreatePlan} from "@/hooks/useCreatePlan";


export default function CreatePlanForm(){

    const axiosAuth = useAuth();
    const {data: session} = useSession();
    const [exercisePlan, setExercisePlan] = useState([]);
    const {data: exercises} = useGetExercises();
    //@ts-ignore
    const {createPlan}  = useCreatePlan();

    const [formData, setFormData] = useState({
        name: '',
        //@ts-ignore
        identity: session?.user.user_id,
        exercises: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPlan(formData);
        alert("Plan has been created");
    };

    // Funkcija za dodavanje vežbe u plan
    const addExerciseToPlan = (ex) => {
        setExercisePlan([...exercisePlan, ex]);
    };

    // Funkcija za uklanjanje vežbe iz plana
    const removeFromPlan = (ex) => {
        const newPlan = exercisePlan.filter((v) => v !== ex);
        setExercisePlan(newPlan);
    };

    const handleAddExercises = () => {
        setFormData({
            ...formData,
            // @ts-ignore
            exercises: exercisePlan,
        });
        alert("Exercises are added to the plan")
    }


    return (
        <div className="p-8">
            <h2 className="text-blue-500 text-3xl font-bold mb-4">Create a new training plan</h2>
            <div className="mb-8">
                <label className="block text-gray-600 mb-2">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                />
                <h3 className="text-lg font-semibold mt-4 mb-1">Choose the exercises:</h3>
                <ul className="list-disc pl-6 mt-2">
                    {exercises?.map((ex, index) => (
                        <li key={index} className="mb-2">
                            {ex.name}
                            <button
                                onClick={() => addExerciseToPlan(ex)}
                                className="ml-2 bg-blue-400 text-white rounded px-3 py-1 focus:outline-none hover:bg-blue-600"
                            >
                                Add to plan
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <hr className="my-8"/>
                <h3 className="text-lg font-semibold">Current plan:</h3>
                <ul className="list-disc pl-6 mt-2">
                    {exercisePlan.map((ex, index) => (
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
                <br/>
                <button
                    onClick={handleAddExercises}
                    className="bg-green-400 text-white rounded px-4 py-2 mt-4 focus:outline-none hover:bg-green-600"
                >
                    Add selected exercises to plan
                </button>
                <hr className="my-8"/>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-400 text-white rounded px-4 py-2 focus:outline-none hover:bg-blue-600"
                >
                    Create plan
                </button>
            </div><br/><br/><br/><br/>
        </div>


    );

}