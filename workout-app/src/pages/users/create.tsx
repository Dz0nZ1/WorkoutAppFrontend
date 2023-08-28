import {useForm} from "react-hook-form";
import {usersRequest} from "@/data";
import {CreateUserQuery} from "@/types";
import {yupResolver} from "@hookform/resolvers/yup";
import {createUserSchema} from "@/validators/users/createUserValidator";

export default  function CreateUserPage(){

    const {register, handleSubmit, formState: {errors}}
        = useForm<CreateUserQuery>({
                mode:"onSubmit",
                resolver: yupResolver(createUserSchema)
            })


    return (
        <>
            <h1>Create User Page</h1>
            <input placeholder="Enter First Name" type="text" {...register("firstName")}/>
            {errors.firstName && (<div>{errors.firstName?.message as string}</div>)}<br/>

            <input placeholder="Enter Last Name" type="text" {...register("lastName")}/>
            {errors.lastName && (<div>{errors.lastName?.message as string}</div>)}<br/>

            <input placeholder="Enter Email" type="text" {...register("email")}/>
            {errors.email && (<div>{errors.email?.message as string}</div>)}<br/>

            <input placeholder="Enter Password" type="text" {...register("password")}/>
            {errors.password && (<div>{errors.password?.message as string}</div>)}<br/><br/>


            <button onClick={
                () => { handleSubmit(
                    data => {usersRequest.create(data); alert("Registration completed successfully")})();
                }}>Submit</button>

        </>
    )
}