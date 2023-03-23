import * as yup from "yup"


export const LOGIN_VALIDATION_SCHEMA = yup.object({
    email: yup.string().required().email(),
    password: yup.string().min(8)
})