import {Box, Button, Flex, Input} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom';
import { useApplicationStore } from '../../store/application.store'


type Inputs = {
    id: number
    date: Date
    departure: string
    destination: string
    seats: number
    price: number
};

export const SearchFlight = (props: any) => {

    const getFlights = useApplicationStore(state => state.getFlights)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        await getFlights(data, 1, 2)
        props.sendData(data) 
    }

    return (
        <Box padding="10">
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection='row'>
            <Input {...register("date", { required: false })} placeholder='Flight date' type='date'></Input>
            <Input {...register("departure", { required: false })} placeholder='Flight departure'></Input>
            <Input {...register("destination", { required: false })} placeholder='Flight destination'></Input>
            <Input {...register("seats", { required: false })} placeholder='Minimum seats' type='number'></Input>
            <Button type="submit" mb={'15px'} width="200px">Search</Button>
            </Flex>
        </Form>
        </Box>
    )
}
