import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useApplicationStore } from '../../store/application.store'
import { Flight } from '../../store/flight-store/types/flight.type'

export const TicketHistory = () => {
    const getUserTicketHistory = useApplicationStore(state => state.getUserTicketHistory)
    const tickets = useApplicationStore(state => state.userFlightTickets)


    const init = async () => {
        await getUserTicketHistory()
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>My ticket history</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Departure</Th>
                        <Th>Destination</Th>
                        <Th>Seats</Th>
                        <Th>Ticket price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tickets &&
                        tickets?.map((item: any) => (
                            <Tr key={item.ticket.id}>
                                <Td>{format(new Date(item.flight.date), 'dd-MM-yyyy HH:MM').toString()}</Td>
                                <Td>{item.flight.departure}</Td>
                                <Td>{item.flight.destination}</Td>
                                <Td>{item.flight.seats}</Td>
                                <Td>{item.flight.price} RSD</Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
