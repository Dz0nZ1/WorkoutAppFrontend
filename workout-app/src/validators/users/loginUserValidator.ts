import * as yup from 'yup'

export const loginUserSchema = yup.object().shape({
    email: yup.string().email().label("Email").required(),
    password: yup.string().label("Password").required()
}).required()