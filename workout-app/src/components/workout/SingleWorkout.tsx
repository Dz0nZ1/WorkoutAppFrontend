import { useState } from "react";

const SingleWorkout = (props: any) => {
    const [properties, setProperties] = useState({});

    const addToPlanHandler = () => {
        props.triggerUpdatePropertyList(properties);
    };

    return (
        <li key={props.index} className="mb-2">
            {props.ex.name}
            <input
                type="number"
                name="sets"
                placeholder="sets"
                className="border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                onChange={(e) =>
                    setProperties((prevProp) => {
                        return { ...prevProp, sets: e.target.value };
                    })
                }
            />
            <input
                type="number"
                name="reps"
                placeholder="reps"
                className="border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                onChange={(e) =>
                    setProperties((prevProp) => {
                        return { ...prevProp, reps: e.target.value };
                    })
                }
            />
            <input
                type="number"
                name="weight"
                placeholder="weight"
                className="border border-blue-200 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
                onChange={(e) =>
                    setProperties((prevProp) => {
                        return { ...prevProp, weight: e.target.value };
                    })
                }
            />
            <button
                onClick={addToPlanHandler}
                className="ml-2 bg-blue-400 text-white rounded px-3 py-1 focus:outline-none hover:bg-blue-600"
            >
                Add to plan
            </button>
        </li>
    );
};

export default SingleWorkout;