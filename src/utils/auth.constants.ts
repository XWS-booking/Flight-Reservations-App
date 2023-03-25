import * as yup from "yup"

export const LOGIN_VALIDATION_SCHEMA = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
})

export const REGISTER_VALIDATION_SCHEMA = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    name: yup.string().required(),
    surname: yup.string().required()
})


export const LOGIN_DEFAULT_VALUES = {
    email: "",
    password: ""
}

export const REGISTER_DEFAULT_VALUES = {
    email: "",
    password: "",
    name: "",
    surname: ""
}

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
}