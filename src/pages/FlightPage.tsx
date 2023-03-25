import { Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState} from 'react'
import { useApplicationStore } from '../store/application.store';
import "../styles/pagination.css"
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns'
import { SearchFlight } from '../components/Flight/SearchFlight';


export const FlightPage = () => {

    const getFlights = useApplicationStore(state => state.getFlights)
    const totalCount = useApplicationStore(state => state.totalCount)
    const getFlightsRes = useApplicationStore(state => state.getFlightsRes)

    const [data, setData] = useState({
        id: "",
        date: new Date("0001-01-01T00:00:00Z"),
        departure: "",
        destination: "",
        seats: 0,
        price: 0,
    })
   
    useEffect(()=>{
        getFlights(data, 1, 2)
    }, [])


    const handlePageClick = (event: any) => {
        getFlights(data, event.selected + 1, 2)
      };

    return (
        <>
        <SearchFlight setData={setData}></SearchFlight>
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Flights</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Departure</Th>
                        <Th>Destination</Th>
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
                                <Td>{item.departure}</Td>
                                <Td>{item.destination}</Td>
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
function lala() {
    throw new Error('Function not implemented.');
}

