import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useApplicationStore } from '../../store/application.store'

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

type Inputs = {
    id: number
    date: Date
    departure: string
    destination: string
    seats: number
    price: number
};

export const CreateFlight = ({ isOpen, onOpen, onClose }: Props) => {

    const createFlight = useApplicationStore(state => state.createFlight)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        await createFlight(data)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new flight</ModalHeader>
                <ModalCloseButton />
                <ModalBody width='100%' display='flex' flexDirection='column' alignItems='center'>
                    <Input {...register("date", { required: true })} placeholder='Flight date' type='datetime-local' mb={'15px'} width='80%'></Input>
                    <Input {...register("departure", { required: true })} placeholder='Flight departure' mb={'15px'} width='80%'></Input>
                    <Input {...register("destination", { required: true })} placeholder='Flight destination' mb={'15px'} width='80%'></Input>
                    <Input {...register("seats", { required: true })} placeholder='Maximum seats' type='number' mb={'15px'} width='80%'></Input>
                    <Input {...register("price", { required: true })} placeholder='Price' type='number' mb={'15px'} width='80%'></Input>
                </ModalBody>
                <ModalFooter width='100%' display='flex' justifyContent='center'>
                    <Button width='80%' onClick={handleSubmit(onSubmit)}>Create flight</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}
