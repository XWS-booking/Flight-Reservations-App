import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { LOGIN_VALIDATION_SCHEMA } from "../auth.constants"
import {yupResolver} from "@hookform/resolvers/yup"
export type FormValues = {
    email: string,
    password: string
}

export const LoginPage = () => {
    const defaultValues: FormValues = {
        email: "", 
        password: ""
    }

    const {register, handleSubmit,  formState: { errors, isValid}} = useForm<FormValues>({
        defaultValues,
        resolver: yupResolver(LOGIN_VALIDATION_SCHEMA)
    })


    const handleOnSubmit = (values: FormValues) => {
        console.log(values)
    }


    return (
        <Flex
        w={'100%'}
        direction={'column'}
        >
            <FormControl isInvalid={errors.email != null}>
                <FormLabel>Email</FormLabel>
                <Input type='email'{...register('email')}/>
                {
                    errors.email && (
                        <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                    )
                }
            </FormControl>
            <FormControl isInvalid={errors.password != null}>
                <FormLabel>Password</FormLabel>
                <Input type='password'{...register('password')}/>
                {
                    errors.password && (
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    )
                }
            </FormControl>
            <Button onClick={handleSubmit(handleOnSubmit)}>
                Login
            </Button>
        </Flex>
    )
}