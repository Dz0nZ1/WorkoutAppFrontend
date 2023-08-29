import * as yup from 'yup';

export const updateUserSchema = yup.object().shape({
    email: yup.string().email().required().label("Email"),
})