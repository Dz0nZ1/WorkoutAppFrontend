import { useState } from "react";
import {Button, Input} from "@nextui-org/react";

const SingleWorkout = (props: any) => {
    const [properties, setProperties] = useState({});

    const addToPlanHandler = () => {
        props.triggerUpdatePropertyList(properties);
    };

    return (
        <>
            <p className="mb-1">{props.ex.name}</p>
            <li key={props.index} className="mb-2 flex flex-row w-full gap-x-7">
                <Input
                    type="number"
                    name="sets"
                    placeholder="sets"
                    // className="border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                    onChange={(e) =>
                        setProperties((prevProp) => {
                            return { ...prevProp, sets: e.target.value };
                        })
                    }
                />
                <Input
                    type="number"
                    name="reps"
                    placeholder="reps"
                    // className="border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                    onChange={(e) =>
                        setProperties((prevProp) => {
                            return { ...prevProp, reps: e.target.value };
                        })
                    }
                />
                <Input
                    type="number"
                    name="weight"
                    placeholder="weight"
                    // className="border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                    onChange={(e) =>
                        setProperties((prevProp) => {
                            return { ...prevProp, weight: e.target.value };
                        })
                    }
                />
                <Button
                    onClick={addToPlanHandler}
                    className="ml-2 bg-blue-400 text-white rounded px-3 py-1 mt-2.5 focus:outline-none hover:bg-blue-600"
                >
                    Add
                </Button>
            </li>
        </>
    );
};

export default SingleWorkout;