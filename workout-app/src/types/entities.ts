
    export interface CreateExercise {
        name: string,
        photo: string,
        category: string
    }

    export interface CreateProperty {
        forExercise : string;
        sets : string | number;
        reps : string | number;
        weight : string | number;
    }



    export interface Exercise {
        exerciseId : string | number;
        name: string,
        photo: string,
        category: string
    }

    export enum ExerciseStatus {
        CREATE ="create",
        UPDATE = "update",
        DELETE = "delete"
    }

    export interface Plan {
        planId : string | number,
        identity: string | number,
        name: string,
        user: object,
        exercises: Exercise[]
        properties: Property[]
    }

    export interface Property {
        propertyId: string | number;
        forExercise : string;
        sets : string | number;
        reps : string | number;
        weight : string | number;
    }