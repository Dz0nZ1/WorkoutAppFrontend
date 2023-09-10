import * as yup from 'yup';

export const registerUserSchema = yup.object().shape({
    firstName: yup.string().required().label("First name"),
    lastName: yup.string().required().label("Last name"),
    email: yup.string().email().required().label("Email"),
    password: yup.string().required().label("Password"),
}).required();