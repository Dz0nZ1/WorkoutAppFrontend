"use client"
import {useGetPlan} from "@/hooks/useGetPlan";
import {CreateProperty, Exercise, Plan, Property} from "@/types/entities";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Select,
    SelectItem
} from "@nextui-org/react";
import React, {useState} from "react";
import {useSession} from "next-auth/react";
import {useGetPropertiesByPlan} from "@/hooks/useGetPropertiesByPlan";
import toast from "react-hot-toast";
import {useGetExercises} from "@/hooks/useGetExercises";
import {useGetExerciseById} from "@/hooks/useGetExerciseById";
import {useUpdateProperty} from "@/hooks/useUpdateProperty";
import {useUpdatePlan} from "@/hooks/useUpdatePlan";

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

    const {data:session} = useSession()
    const {data:plan, error, isLoading , revalidatePlan} : getPlan = useGetPlan(params.planId)
    const {data:newExercises} = useGetExercises();
    const {getExerciseById} = useGetExerciseById()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [updatedPlan, setUpdatedPlan] = useState({
        name: plan?.name,
        identity: session?.user.user_id,
        exercises: plan?.exercises,
        properties: plan?.properties,
    });
    const [newProperty, setNewProperty] = useState<CreateProperty>({
        forExercise:"",
        reps: "",
        sets: "",
        weight: ""
    })
    const {data:properties} = useGetPropertiesByPlan(params.planId);
    const {updateProperty} = useUpdateProperty();
    const {updatePlan} = useUpdatePlan();
    const [selectedProperty, setSelectedProperty] = useState({
        propertyId: '',
        reps:"",
        sets:"",
        weight:"",
        forExercise: ""
    });



    const handleOnChange = async (e : any) => {
        if(e.target.value == "") return;
        const filteredProperty = properties.find((property : Property) => property.forExercise === e.target.value);
        setSelectedProperty(filteredProperty);
        console.log(selectedProperty)
    }

    const handleDeleteExercise = (name : string) => {
           const filteredExercise = plan?.exercises.filter(x => x.name !== name);
           const filteredProperties = properties?.filter((x : Property) => x.forExercise !== name);
           setUpdatedPlan({...updatedPlan, exercises: filteredExercise, properties: filteredProperties});
           toast.success("Exercise will be removed once updated");
    }


    const handleUpdate =  async () : Promise<void> => {
            const dummy = plan?.properties.find(x => x.forExercise === selectedProperty.forExercise);
            if(dummy !== undefined) {
                // @ts-ignore
                const {propertyId ,...other} = dummy;
                const newProperty : Property = {...selectedProperty, propertyId: propertyId};
                setUpdatedPlan({...updatedPlan, properties: [newProperty]});
                await toast.promise(updateProperty(newProperty, newProperty.propertyId).then(() => revalidatePlan()), {
                    loading: 'Loading',
                    success: 'Plan was updated successfully',
                    error: 'Error updating plan',
                });
            }
            await toast.promise(updatePlan(updatedPlan, params.planId).then(() => revalidatePlan()), {
                loading: 'Loading',
                success: 'Plan was updated successfully',
                error: 'Error updating plan',
            });
    }

    return(
        <>
            {plan && (
                <>
                    <h2 className="text-5xl text-center font-extrabold text-gray-700 mb-7 mt-24">{plan.name}</h2>
                    <div className="w-full h-full flex flex-row justify-center items-center mb-24">
                        <Button onPress={onOpen} className="ml-2 bg-blue-400 text-white rounded px-7 py-1 mt-2.5 focus:outline-none hover:bg-blue-600" color="primary">Update plan</Button>
                        <Modal
                            placement="center"
                            size={"2xl"}
                            backdrop="opaque"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            classNames={{
                                backdrop: "bg-gradient-to-t from-zinc-500 to-zinc-900/10 backdrop-opacity-20"
                            }}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">
                                            <div className="flex flex-row justify-center items-center">Update your plan</div>
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="flex justify-center w-full">
                                                <Input
                                                    onChange={(e) => setUpdatedPlan({...updatedPlan, name: e.target.value})}
                                                    // placeholder={updatedPlan.name}
                                                    placeholder={plan.name}
                                                    type="text"
                                                    className="w-1/3"
                                                    />
                                            </div>
                                            <label htmlFor="update_exercise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">
                                                Choose the exercise you want to update</label>
                                            <div className="flex flex-col mx-auto gap-4">
                                                <Select
                                                    items={plan?.exercises}
                                                    onChange={handleOnChange}
                                                    label="Select exercise"
                                                    className="max-w-xs"
                                                >
                                                    {(ex : Exercise) => <SelectItem value={ex.name} key={ex.name}>
                                                        {ex.name}
                                                    </SelectItem>}
                                                </Select>
                                                <Input onChange={(e) => setSelectedProperty({...selectedProperty, reps:e.target.value})} type="text" value={(selectedProperty?.reps)?.toString()}/>
                                                <Input onChange={(e) => setSelectedProperty({...selectedProperty, sets:e.target.value})} type="text" value={(selectedProperty?.sets)?.toString()}/>
                                                <Input onChange={(e) => setSelectedProperty({...selectedProperty, weight:e.target.value})} type="text" value={(selectedProperty?.weight)?.toString()}/>
                                                {selectedProperty && <Button onClick={() => handleDeleteExercise(selectedProperty?.forExercise)}>Delete {selectedProperty?.forExercise}</Button>}
                                            </div>


                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button onClick={handleUpdate} color="success" className="text-white shadow-lg shadow-indigo-500/20" onPress={onClose}>
                                                Update
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
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


