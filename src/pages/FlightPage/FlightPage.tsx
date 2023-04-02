import { Button, Flex, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useApplicationStore } from '../../store/application.store';
import "../../styles/pagination.css"
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns'
import { SearchFlight } from '../../components/Flight/SearchFlight';
import { BsFillTrash3Fill, BsFillCartPlusFill } from 'react-icons/bs'
import { Flight } from '../../store/flight-store/types/flight.type';
import { Role } from '../../store/auth-store/model/enums/role.enum';
import { PurchaseFlightTicket } from '../../components/Flight/PurchaseFlightTicket';
import { displayToast } from '../../utils/toast.caller';
import { ResponseStatus } from '../../store/flight-store/flight.store';

export const FlightPage = () => {

    const getFlights = useApplicationStore(state => state.getFlights)
    const spinner = useApplicationStore(state => state.spinner)
    const totalCount = useApplicationStore(state => state.totalCount)
    const flights = useApplicationStore(state => state.flights)
    const deleteFlight = useApplicationStore(state => state.deleteFlight)
    const deleteFlightRes = useApplicationStore(state => state.deleteFlightRes)
    const purchaseFlightTicket = useApplicationStore(state => state.purchaseFlightTicket)
    const purchaseRes = useApplicationStore(state => state.purchaseTicketRes)
    const user = useApplicationStore(state => state.user)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [data, setData] = useState({
        id: "",
        date: new Date("0001-01-01T00:00:00Z"),
        departure: "",
        destination: "",
        freeSeats: 0,
        seats: 0,
        price: 0,
    })

    useEffect(() => {
        getFlights(data, 1, 4)
    }, [])

    useEffect(() => {
        if (purchaseRes.status === ResponseStatus.Success) {
            displayToast(toast, "Purchase successful!", 'success')
            return
        }

        if (purchaseRes.status === ResponseStatus.Error) {
            displayToast(toast, "Something went wrong", 'error')
            return
        }
    }, [purchaseRes.status])


    useEffect(() => {
        if (deleteFlightRes.status === ResponseStatus.Success) {
            displayToast(toast, "Flight deleted successful!", 'success')
            return
        }
        if (deleteFlightRes.status === ResponseStatus.Error) {
            displayToast(toast, "Something went wrong", 'error')
            return
        }
    }, [deleteFlightRes.status])


    const sendData = (flight: Flight) => {
        setData(flight)
        setCurrentPage(1)
    };

    const handlePageClick = async (event: any) => {

        await getFlights(data, event.selected + 1, 4)
        setCurrentPage(event.selected + 1)
    };

    const handleDeleteFlight = async (id: string) => {
        await deleteFlight(id)
        await getFlights(data, currentPage, 4)
    }

    const handlePurchase = async (flightId: string, quantity: number) => {
        await purchaseFlightTicket(flightId, quantity)
        onClose()
        await getFlights(data, currentPage, 4)
    }

    const handleSelectFlight = (flight: Flight) => {
        setSelectedFlight(flight)
        onOpen()
    }

    const [selectedFlight, setSelectedFlight] = useState<Flight>(data)

    return (
        <>
            <SearchFlight sendData={sendData}></SearchFlight>
            <TableContainer flex={1}>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Flights</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Departure</Th>
                            <Th>Destination</Th>
                            <Th>Maximum Seats</Th>
                            <Th>Free Seats</Th>
                            <Th>Ticket price</Th>
                            <Th>Total price</Th>
                            {
                                user?.role === Role.REGULAR || user?.role === Role.REGULAR &&
                                <Th></Th>
                            }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {flights &&
                            flights.map((item: Flight) => (
                                <Tr key={item.id}>
                                    <Td>{format(new Date(item.date), 'dd-MM-yyyy HH:MM').toString()}</Td>
                                    <Td>{item.departure}</Td>
                                    <Td>{item.destination}</Td>
                                    <Td>{item.seats}</Td>
                                    <Td>{item.freeSeats}</Td>
                                    <Td>{item.price} RSD</Td>
                                    <Td>{item.seats * item.price} RSD</Td>
                                    {
                                        user?.role === Role.ADMINISTRATOR &&
                                        <Td>
                                            <Button onClick={() => handleDeleteFlight(item.id)}>
                                                <BsFillTrash3Fill color='red' />
                                            </Button>
                                        </Td>
                                    }
                                    {
                                        user?.role === Role.REGULAR &&
                                        <Td>
                                            <Button onClick={() => handleSelectFlight(item)}>
                                                <BsFillCartPlusFill fontSize={20} color='green' />
                                            </Button>
                                        </Td>
                                    }
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <PurchaseFlightTicket isOpen={isOpen} onOpen={onOpen} onClose={onClose} flight={selectedFlight} handlePurchase={handlePurchase} />

            {spinner == true &&
                <Flex justifyContent='center'>
                    <Spinner size='xl' />
                </Flex>
            }
            <Flex flexDirection='column' justifyContent='column' padding='15px 20px' boxSizing='border-box' width='100%' height='100%' mt={'auto'}>
                <ReactPaginate
                    activeClassName={'item active '}
                    forcePage={currentPage - 1}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    marginPagesDisplayed={2}
                    nextClassName={"item next "}
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageCount={Math.ceil(totalCount / 4)}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel="<" />
            </Flex>
        </>
    )
}

