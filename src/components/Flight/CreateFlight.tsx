import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useApplicationStore } from '../../store/application.store'
import { Flight } from '../../store/flight-store/types/flight.type'

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
    const getFlights = useApplicationStore(state => state.getFlights)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
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
        }, 1, 2)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Create new flight</ModalHeader>
                <ModalCloseButton />
                <ModalBody width='100%' display='flex' flexDirection='column' alignItems='center'>
                    <Input {...register("date", { required: true })} placeholder='Flight date' type='datetime-local' mb={'15px'} width='80%'></Input>
                    <Input {...register("departure", { required: true })} placeholder='Flight departure' mb={'15px'} width='80%'></Input>
                    <Input {...register("destination", { required: true })} placeholder='Flight destination' mb={'15px'} width='80%'></Input>
                    <Input {...register("seats", { required: true })} placeholder='Maximum seats' type='number' mb={'15px'} width='80%'></Input>
                    <Input {...register("price", { required: true })} placeholder='Price' type='number' mb={'15px'} width='80%'></Input>
                </ModalBody>
                <ModalFooter width='100%' display='flex' justifyContent='center'>
                    <Button bg={'#003b95'} color={'#fff'} _hover={{ bg: '#136ed1' }} width='80%' onClick={handleSubmit(onSubmit)}>Create flight</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}
