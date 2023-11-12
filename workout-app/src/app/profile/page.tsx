'use client'
import {useSession} from "next-auth/react";
import {useGetPlansWithId} from "@/hooks/useGetPlansWithId";
import {useDeletePlan} from "@/hooks/useDeletePlan";


export default function ProfilePage(){

     const {data: session} = useSession();
     //@ts-ignore
     const {data: allUserPlans} = useGetPlansWithId(session?.user.user_id);
     //@ts-ignore
     const {deletePlanById} = useDeletePlan()

    console.log(allUserPlans);
    console.log(session);

    return(
       <>

           <div className="min-h-screen bg-gradient-to-b from-gray-200 via-gray-200 to-gray-100 py-6 flex flex-col justify-center sm:py-12">

               <div className="bg-gray-50 py-16 pt-32">
                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                       <div className="max-w-4xl mx-auto text-center">
                           <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                               Welcome to your profile
                           </h2>
                           <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                               You can view your plans for training and track your progress on the way
                           </p>
                       </div>
                   </div>
                   <div className="mt-10 pb-1">
                       <div className="relative">
                           <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
                           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                               <div className="max-w-4xl mx-auto">
                                   <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                       <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                           <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                               Name
                                           </dt>
                                           <dd className="order-1 text-5xl font-extrabold text-gray-700">{session?.user?.firstName}</dd>
                                       </div>
                                       <div
                                           className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                           <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                               Lastname
                                           </dt>
                                           <dd className="order-1 text-5xl font-extrabold text-gray-700">{session?.user?.lastName}</dd>
                                       </div>
                                       <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                           <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                               Number of plans
                                           </dt>
                                           <dd className="order-1 text-5xl font-extrabold text-gray-700">{allUserPlans?.length}</dd>
                                       </div>
                                   </dl>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>



                <br/><br/>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {allUserPlans?.map((plan, index) => (
                       <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                           <div className="px-6 py-4">
                               <h2 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h2>
                               <div className="grid grid-cols-2 gap-2">
                                   {plan.exercises.map((ex, i) => (
                                       <div key={i} className="bg-gray-100 p-4 rounded-lg">
                                           <img src={ex.photo} alt="Exercise Photo" className="w-full h-32 object-cover rounded-lg" />
                                           <div className="text-gray-600 text-sm mt-2">
                                               <h1 className="mb-1">Exercise Name: {ex.name}</h1>
                                               <h1>Category: {ex.category}</h1>
                                               {plan.properties.filter(prop => prop.forExercise == ex.name).map(filterProp => (
                                                   <>
                                                       <h1>Reps: {filterProp.reps}</h1>
                                                       <h1>Sets: {filterProp.sets}</h1>
                                                       <h1>Weight: {filterProp.weight}kg</h1>
                                                   </>
                                               ))}
                                           </div>
                                       </div>
                                   ))}
                               </div>
                                <br/>
                               <button className="ml-2 bg-red-400 text-white rounded px-3 py-1 focus:outline-none hover:bg-red-600" onClick={() => deletePlanById(plan.planId)}>Remove</button>

                           </div>
                       </div>
                   ))}
               </div>




           </div>



       </>
    )
}