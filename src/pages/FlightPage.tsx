import { Box, Button, Flex, Img, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useApplicationStore } from '../store/application.store';
import "../styles/pagination.css"
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns'


export const FlightPage = () => {

    const getFlights = useApplicationStore(state => state.getFlights)
    const totalCount = useApplicationStore(state => state.totalCount)
    const getFlightsRes = useApplicationStore(state => state.getFlightsRes)
   
    useEffect(()=>{
        getFlights({id: 0, date: new Date("0001-01-01T00:00:00Z"), departure: "", destination: "", seats: 0, price: 0}, 1, 2)
    }, [])


    const handlePageClick = (event: any) => {
        getFlights({id: 0, date: new Date("0001-01-01T00:00:00Z"), departure: "", destination: "", seats: 0, price: 0}, event.selected + 1, 2)
      };

    return (
        <><TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Flights</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Start Location</Th>
                        <Th>End Location</Th>
                        <Th>Seats</Th>
                        <Th>Ticket price</Th>
                        <Th>Total price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {getFlightsRes &&
                        getFlightsRes.map((item: any) => (
                            <Tr key={item.id}>
                                <Td>{format(new Date(item.date), 'dd-MM-yyyy HH:MM').toString()}</Td>
                                <Td>{item.startLocation}</Td>
                                <Td>{item.endLocation}</Td>
                                <Td>{item.seats}</Td>
                                <Td>{item.price}</Td>
                                <Td>{item.seats * item.price}</Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
        <Flex flexDirection='column' justifyContent='column' padding='20' boxSizing='border-box' width='100%' height='100%'>
            <ReactPaginate
                activeClassName={'item active '}
                breakClassName={'item break-me '}
                breakLabel={'...'}
                containerClassName={'pagination'}
                disabledClassName={'disabled-page'}
                marginPagesDisplayed={2}
                nextClassName={"item next "}
                nextLabel=">"
                onPageChange={handlePageClick} 
                pageCount={Math.ceil(totalCount/2)}
                pageClassName={'item pagination-page '}
                pageRangeDisplayed={2}
                previousClassName={"item previous"}
                previousLabel="<"/>
        </Flex>
        </>
    )
}
