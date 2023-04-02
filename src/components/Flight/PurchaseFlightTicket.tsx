import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useApplicationStore } from '../../store/application.store'
import { Flight } from '../../store/flight-store/types/flight.type'
import { Counter } from '../Counter/Counter'

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    flight: Flight
    handlePurchase: (flightId: string, quantity: number) => Promise<void>
}

export const PurchaseFlightTicket = ({ isOpen, onOpen, onClose, flight, handlePurchase }: Props) => {


    const [quantity, setQuantity] = useState<number>(0)

    const handleClick = async () => {
        await handlePurchase(flight.id, quantity)
        setQuantity(0)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Purchase flight ticket</ModalHeader>
                <ModalCloseButton onClick={() => setQuantity(0)} />
                <ModalBody width='100%' display='flex' flexDirection='column' alignItems='center' gap={'10px'}>
                    <Text fontSize={18} fontWeight={500}>{flight.departure} - {flight.destination}</Text>
                    <Text fontSize={16}>{format(new Date(flight.date), 'dd-MM-yyyy HH:MM').toString()}</Text>
                    <Counter quantity={quantity} setQuantity={setQuantity} maxQuantity={flight.freeSeats}></Counter>
                    <Text fontSize={16}>{quantity*flight.price} RSD</Text>
                </ModalBody>
                <ModalFooter width='100%' display='flex' justifyContent='center'>
                    <Button bg={'#003b95'} color={'#fff'} _hover={{ bg: '#136ed1' }} width='80%' onClick={() => handleClick()}>Purchase ticket</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}
