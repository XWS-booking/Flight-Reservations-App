import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useApplicationStore } from '../../store/application.store'
import { Flight } from '../../store/flight-store/types/flight.type'
import { Counter } from '../Counter/Counter'

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    flight: Flight
    handlePurchase: (flightId: string, quantity: number) => void
}

export const PurchaseFlightTicket = ({ isOpen, onOpen, onClose, flight, handlePurchase }: Props) => {


    const [quantity, setQuantity] = useState<number>(1)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Purchase flight ticket</ModalHeader>
                <ModalCloseButton />
                <ModalBody width='100%' display='flex' flexDirection='column' alignItems='center' gap={'10px'}>
                    <Text fontSize={18} fontWeight={500}>{flight.departure} - {flight.destination}</Text>
                    <Text fontSize={16}>{format(new Date(flight.date), 'dd-MM-yyyy HH:MM').toString()}</Text>
                    <Counter quantity={quantity} setQuantity={setQuantity} maxQuantity={flight.freeSeats ?? 0}></Counter>
                </ModalBody>
                <ModalFooter width='100%' display='flex' justifyContent='center'>
                    <Button bg={'#003b95'} color={'#fff'} _hover={{ bg: '#136ed1' }} width='80%' onClick={() => handlePurchase(flight.id, quantity)}>Purchase ticket</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >

    )
}
