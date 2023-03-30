import {Box, Button, Flex, Input} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { useApplicationStore } from '../../store/application.store'
import { Role } from '../../store/auth-store/model/enums/role.enum';
import { Flight } from '../../store/flight-store/types/flight.type';

interface Props {
   sendData: (flight: Flight) => void
}


export const SearchFlight = ({sendData}: Props) => {

    const getFlights = useApplicationStore(state => state.getFlights)
    const updateGetFlightResState = useApplicationStore(state => state.updateGetFlightResState)
    const user = useApplicationStore(state => state.user)

    const [flight, setFlight] = useState({
        id: "",
        date: new Date("0001-01-01T00:00:00Z"),
        departure: "",
        destination: "",
        freeSeats: 0,
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

    const handleFreeSeatsInputChange = (event: any) => {
        setFlight({...flight, 
           freeSeats: parseInt(event.target.value)});
      };
    
    const onSubmit = async () => {
        await updateGetFlightResState()
        await getFlights(flight, 1, 4)
        sendData(flight)
    }

    return (
        <>
        {
            (user?.role === Role.REGULAR || user == null) &&
        <Box padding="10">
        <Form onSubmit={onSubmit}>
            <Flex flexDirection='row'>
            <Input name="date" onChange={handleDateInputChange} placeholder='Flight date' type='date'></Input>
            <Input name="departure" onChange={handleDepartureInputChange} placeholder='Flight departure'></Input>
            <Input name="destination" onChange={handleDestinationInputChange} placeholder='Flight destination'></Input>
            <Input name="freeSeats"  onChange={handleFreeSeatsInputChange} placeholder='Minimum free seats' type='number' min='0'></Input>
            <Button type="submit" mb={'15px'} width="200px">Search</Button>
            </Flex>
        </Form>
        </Box>
        }  </>
    )
}
