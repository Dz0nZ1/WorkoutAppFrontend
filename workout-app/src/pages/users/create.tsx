import {useForm} from "react-hook-form";
import {usersRequest} from "@/data";
import {CreateUserQuery} from "@/types";

export default  function CreateUserPage(){

    const {register, handleSubmit, formState: {errors}}
        = useForm<CreateUserQuery>({
                mode:"onSubmit"
            })


    return (
        <>
            <h1>Create User Page</h1>
            <input placeholder="Enter First Name" type="text" {...register("firstName", {
                required:
                "Field First name is required",
                validate: (value : string) => {
                    if (value.length < 2) {
                        return "First name must have at least 2 chars"
                    }
                }
                }
            )
            }/>
            {errors.firstName && (<div>{errors.firstName?.message as string}</div>)}<br/>

            <input placeholder="Enter Last Name" type="text" {...register("lastName", {
                required:
                "Field Last name is required",
                validate: (value: string) => {
                    if(value.length < 2) {
                        return "First name must have at least 2 chars"
                    }
                }
            })}/>
            {errors.lastName && (<div>{errors.lastName?.message as string}</div>)}<br/>

            <input placeholder="Enter Email" type="text" {...register("email", {
                required:
                "Field email is required",
                validate: (value : string) => {
                    if(value.length < 2) {
                        return "Email must have at least 2 chars"
                    }
                }
            })}/>
            {errors.email && (<div>{errors.email?.message as string}</div>)}<br/>

            <input placeholder="Enter Password" type="text" {...register("password", {
                required:
                "Field password is required",
                validate: (value: string) => {
                    if(value.length < 2) {
                        return "Email must have at least 2 chars"
                    }
                }
            })}/>
            {errors.password && (<div>{errors.password?.message as string}</div>)}<br/><br/>


            <button onClick={() => { handleSubmit(data => {usersRequest.create(data); alert("Registration completed successfully")})();
                console.log(errors)}}>Submit</button>

        </>
    )
}