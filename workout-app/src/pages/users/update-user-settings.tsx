import {useForm} from "react-hook-form";
import {UpdateUserQuery, UserSettingsFunction} from "@/types";
import {yupResolver} from "@hookform/resolvers/yup";
import {useContext} from "react";
import {UserSettingsContext} from "@/components/contexts/UserSettingsContext";
import {updateUserSchema} from "@/validators/users/updateUserValidator";

export default function UpdateUserSettingsPage(){

    const {register, handleSubmit, formState: {errors}}
        = useForm<UpdateUserQuery>({
        mode:"onSubmit",
        resolver: yupResolver(updateUserSchema)
    })

    const context = useContext(UserSettingsContext);


    return (
        <>
            <h1>Update User Page</h1>

            <input placeholder="Enter Email" type="text" {...register("email")}/>
            {errors.email && (<div>{errors.email?.message as string}</div>)}<br/>

            <button onClick={
                () => { handleSubmit(
                    data =>
                    {
                     context?.dispatch({type: UserSettingsFunction.CHANGE_EMAIL, payload: {email:data.email}})
                     alert("Update completed successfully")
                    }
                )();
                }}>Submit</button>

        </>
    )
}