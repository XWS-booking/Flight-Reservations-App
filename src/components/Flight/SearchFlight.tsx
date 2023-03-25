import {Box, Button, Flex, Input} from '@chakra-ui/react'
import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useApplicationStore } from '../../store/application.store'
import { Flight } from '../../store/flight-store/types/flight.type';

interface Props {
   setData: (flight: Flight) => void
}


export const SearchFlight = ({setData}: Props) => {

    const getFlights = useApplicationStore(state => state.getFlights)

    const [flight, setFlight] = useState({
        id: "",
        date: new Date("0001-01-01T00:00:00Z"),
        departure: "",
        destination: "",
        seats: 0,
        price: 0,
    })

    const handleDateInputChange = (event: any) => {
        setFlight({...flight, 
           date: new Date(event.target.value)});
    };

    const handleDepartureInputChange = (event: any) => {
        setFlight({...flight, 
           departure: event.target.value});
    };
      
    const handleDestinationInputChange = (event: any) => {
        setFlight({...flight, 
           destination: event.target.value});
    };

    const handleSeatsInputChange = (event: any) => {
        setFlight({...flight, 
           seats: parseInt(event.target.value)});
      };
    
    const onSubmit = async () => {
        await getFlights(flight, 1, 2)
        setData(flight)
    }

    return (
        <Box padding="10">
        <Form onSubmit={onSubmit}>
            <Flex flexDirection='row'>
            <Input name="date" onChange={handleDateInputChange} placeholder='Flight date' type='date'></Input>
            <Input name="departure" onChange={handleDepartureInputChange} placeholder='Flight departure'></Input>
            <Input name="destination" onChange={handleDestinationInputChange} placeholder='Flight destination'></Input>
            <Input name="seats"  onChange={handleSeatsInputChange} placeholder='Minimum seats' type='number'></Input>
            <Button type="submit" mb={'15px'} width="200px">Search</Button>
            </Flex>
        </Form>
        </Box>
    )
}
