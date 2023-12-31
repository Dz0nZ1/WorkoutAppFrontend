'use client'
import {useSession} from "next-auth/react";
import {useGetPlansWithUserId} from "@/hooks/plans/useGetPlansWithUserId";
import {useDeletePlan} from "@/hooks/plans/useDeletePlan";
import {Plan} from "@/types/entities";
import toast from "react-hot-toast";
import Link from "next/link";
import React, {useState} from "react";
import {Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


export default function ProfilePage(){

    const {isOpen, onOpen, onClose} = useDisclosure();
     const {data : session} = useSession();
    //@ts-ignore
     const {data: allUserPlans, revalidatePlans} = useGetPlansWithUserId(session?.user.user_id);
     //@ts-ignore
     const {deletePlanById} = useDeletePlan()

    const [selectedPlanId, setSelectedPlanId] = useState<string | number>("");

    console.log(allUserPlans);
    console.log(session);

  const handleDeletePlan = async (id : string | number) : Promise<void> => {
      await toast.promise(deletePlanById(id).then(() => revalidatePlans()), {
          loading: 'Loading',
          success: 'Plan was successfully deleted',
          error: 'Error deleting this plan',
      });
      onClose();
  }

  const handleSelection = (id: string | number) => {
      setSelectedPlanId(id);
  }


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
                                           <dd className="order-1 text-5xl font-extrabold text-gray-700">{
                                               session?.user?.firstName
                                           }</dd>
                                       </div>
                                       <div
                                           className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                           <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                               Lastname
                                           </dt>
                                           <dd className="order-1 text-5xl font-extrabold text-gray-700">{
                                               session?.user?.lastName
                                           }</dd>
                                       </div>
                                       <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                           <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                               Number of plans
                                           </dt>
                                           <dd className="order-1 text-5xl font-extrabold text-gray-700">{allUserPlans?.length ? allUserPlans?.length : 0}</dd>
                                       </div>
                                   </dl>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>



                <br/><br/>
              <div className="container mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {allUserPlans?.map((plan : Plan, index : number) => (

                              <div key={plan.planId} className="bg-gradient-to-r from-white to-gray-150 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 h-72">
                                  <div className="px-6 py-8 flex flex-col justify-between h-full">
                                          <Link className="flex items-center h-full w-full"  key={index} href={`/profile/${plan.planId}`}>
                                          <h2  className="text-3xl font-bold text-gray-700 text-center w-full">{plan.name}</h2>
                                          </Link>
                                      <hr className="w-full"/>
                                      <div className="flex justify-between items-center mt-4">
                                          <span className="text-sm text-gray-600">Plan created 03.12.2023.</span>
                                          <Button className="bg-red-400 text-white rounded px-3 py-1 focus:outline-none hover:bg-red-600 z-10" onClick={(event) => {
                                              handleSelection(plan.planId)
                                          }} onPress={() => onOpen()}>Remove</Button>
                                      </div>
                                  </div>
                              </div>
                      ))}
                      <Modal
                          size={"lg"}
                          isOpen={isOpen}
                          onClose={onClose}
                      >
                          <ModalContent>
                              {(onClose) => (
                                  <>
                                      {/*<ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>*/}
                                      <ModalBody>
                                          <p>
                                              Are you sure you want to delete this plan?
                                          </p>
                                      </ModalBody>
                                      <ModalFooter>
                                          <Button color="danger" variant="light" onPress={onClose}>
                                              Close
                                          </Button>
                                          <Button color="primary" onClick={() => handleDeletePlan(selectedPlanId)}>
                                              Delete plan
                                          </Button>
                                      </ModalFooter>
                                  </>
                              )}
                          </ModalContent>
                      </Modal>
                  </div>


              </div>




           </div>



       </>
    )
}





//
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     {allUserPlans?.map((plan : Plan) => (
//         <Link key={plan.name} href={`/profile/${plan.planId}`}>
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                 <div className="px-6 py-4">
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h2>
//                     <div className="grid grid-cols-2 gap-2">
//                         {plan.exercises.map((ex : Exercise) => (
//                             <div key={ex.name} className="bg-gray-100 p-4 rounded-lg">
//                                 <img src={ex.photo} alt="Exercise Photo" className="w-full h-32 object-cover rounded-lg" />
//                                 <div className="text-gray-600 text-sm mt-2">
//                                     <h1 className="mb-1">Exercise Name: {ex.name}</h1>
//                                     <h1>Category: {ex.category}</h1>
//                                     {plan.properties.filter(prop => prop.forExercise == ex.name).map((filterProp : Property, index : number) => (
//                                         <div key={index}>
//                                             <h1 key={`${index}1`}>Reps: {filterProp.reps}</h1>
//                                             <h1 key={`${index}2`}>Sets: {filterProp.sets}</h1>
//                                             <h1 key={`${index}3`}>Weight: {filterProp.weight}kg</h1>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <br/>
//                     <button className="ml-2 bg-red-400 text-white rounded px-3 py-1 focus:outline-none hover:bg-red-600" onClick={() => handleDeletePlan(plan.planId)}>Remove</button>
//
//                 </div>
//             </div>
//         </Link>
//     ))}
// </div>