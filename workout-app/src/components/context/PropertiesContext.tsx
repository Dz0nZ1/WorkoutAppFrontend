'use client'
import {createContext, Dispatch, SetStateAction, useState, ReactNode} from "react";


export type Properties = {
    forPlan: string,
    sets: number,
    reps: number,
    weight: number
}

export interface PropertiesContextInterface {
    properties: Properties,
    setProperties: Dispatch<SetStateAction<Properties>>
}

const defaultState = {
    properties: {
        forPlan: '',
        sets: 0,
        reps: 0,
        weight: 0
    },
    setProperties: (properties : Properties) => {}
} as PropertiesContextInterface


export const PropertiesContext = createContext<PropertiesContextInterface>(defaultState)

type PropertiesProvideProps = {
    children: ReactNode
}

export default function PropertiesProvider({children} : PropertiesProvideProps){
    const [properties, setProperties] = useState<Properties>(
        {
            forPlan: "",
            sets: 0,
            reps: 0,
            weight: 0
        }
    );

    return(
        <PropertiesContext.Provider value={{properties, setProperties}}>
            {children}
        </PropertiesContext.Provider>
    )
}