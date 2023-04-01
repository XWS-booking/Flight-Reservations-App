import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useTab, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useApplicationStore } from '../../store/application.store'
import { Flight } from '../../store/flight-store/types/flight.type'
import { CREATE_FLIGHT_VALIDATION_SCHEMA } from '../../utils/flight.constants'
import { ResponseStatus } from '../../store/flight-store/flight.store'
import { displayToast } from '../../utils/toast.caller'

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

type Inputs = {
    id: string
    date: Date
    departure: string
    destination: string
    seats: number
    price: number
    freeSeats: number
};

export const CreateFlight = ({ isOpen, onOpen, onClose }: Props) => {

    const createFlight = useApplicationStore(state => state.createFlight)
    const createFlightRes = useApplicationStore(state => state.addFlightRes)
    const getFlights = useApplicationStore(state => state.getFlights)
    const toast = useToast()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(CREATE_FLIGHT_VALIDATION_SCHEMA)
    });
    const onSubmit: SubmitHandler<Inputs> = async data => {
        await createFlight(data)
        onClose()
        await getFlights({
            id: "",
            date: new Date("0001-01-01T00:00:00Z"),
            departure: "",
            destination: "",
            seats: 0,
            price: 0,
            freeSeats: 0
        }, 1, 4)
    }

    useEffect(() => {
        if (createFlightRes.status === ResponseStatus.Success) {
            displayToast(toast, 'Flight created successfully!', 'success');
            return
        } else if (createFlightRes.status === ResponseStatus.Error) {
            displayToast(toast, 'Something went wrong!', 'error');
            return
        }
    }, [createFlightRes.status])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Create new flight</ModalHeader>
                <ModalCloseButton />
                <ModalBody width='100%' display='flex' flexDirection='column' alignItems='center'>
                    <Input {...register("date", { required: true })} placeholder='Flight date' type='datetime-local' mb={'15px'} width='80%'></Input>
                    {errors.date && <Text color={'red'} mt='-10px'>Date is required</Text>}
                    <Input {...register("departure", { required: true })} placeholder='Flight departure' mb={'15px'} width='80%'></Input>
                    {errors.departure && <Text color={'red'} mt='-10px'>Departure is required</Text>}
                    <Input {...register("destination", { required: true })} placeholder='Flight destination' mb={'15px'} width='80%'></Input>
                    {errors.destination && <Text color={'red'} mt='-10px'>Destination is required</Text>}
                    <Input {...register("seats", { required: true, valueAsNumber: true })} placeholder='Maximum seats' type='number' mb={'15px'} width='80%'></Input>
                    {errors.seats && <Text color={'red'} mt='-10px'>{errors.seats.message}</Text>}
                    <Input {...register("price", { required: true, valueAsNumber: true })} placeholder='Price' type='number' mb={'15px'} width='80%'></Input>
                    {errors.price && <Text color={'red'} mt='-10px'>{errors.price.message}</Text>}
                </ModalBody>
                <ModalFooter width='100%' display='flex' justifyContent='center'>
                    <Button bg={'#003b95'} color={'#fff'} _hover={{ bg: '#136ed1' }} width='80%' onClick={handleSubmit(onSubmit)}>Create flight</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}
