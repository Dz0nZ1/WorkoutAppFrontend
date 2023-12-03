"use client"
import {useGetPlan} from "@/hooks/useGetPlan";
import {Exercise, Plan, Property} from "@/types/entities";

interface PageProps {
    params: {
        planId : string
    }
}

interface getPlan {
    data: Plan,
    error: any,
    isLoading : boolean,
    revalidatePlan: Function
}

export default function Plan ({params} : PageProps) {


    const {data:plan, error, isLoading , revalidatePlan} : getPlan = useGetPlan(params.planId)
    console.log(plan);

    return(
        <>
            {plan && (
                <>
                    <h2 className="text-5xl text-center font-extrabold text-gray-700 mb-2 mt-24 mb-24">{plan.name}</h2>
                    <div className="container mx-auto mb-16">
                        <div className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {plan.exercises.map((ex : Exercise, index : number) => (
                                    <div key={index} className="w-full md:w-auto lg:w-auto mb-4">
                                        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            <div className="relative">
                                                <img src={ex.photo} alt="Exercise Photo" className="w-full h-64 object-cover rounded-t-lg" />
                                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                                                    <h2 className="text-lg font-semibold">{ex.name}</h2>
                                                    <p className="text-xs">{ex.category}</p>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow-lg p-6">
                                                <div className="border-b border-gray-400 pb-4 mb-4">
                                                    <h1 className="text-xl font-bold mb-2">{ex.name}</h1>
                                                    <p className="text-sm text-gray-600 mb-2">Category: {ex.category}</p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {plan.properties
                                                        .filter((prop : Property) => prop.forExercise === ex.name)
                                                        .map((filterProp: Property, propIndex : number) => (
                                                            <div key={propIndex} className="flex flex-col justify-center">
                                                                    <p className="text-sm font-semibold mb-2">Reps: {filterProp.reps}</p>
                                                                   <p className="text-sm font-semibold mb-2">Sets: {filterProp.sets}</p>
                                                                    <p className="text-sm font-semibold mb-2">Weight: {filterProp.weight}kg</p>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                            <br/>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}


