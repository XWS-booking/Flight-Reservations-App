import { Box, Button, Flex, Img, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'

export const HomePage = () => {
    const navigate = useNavigate()
    return (
        <>
            <Img src='/landing.jpg' h={'400px'}></Img>
            <Flex>
                <Flex boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'} w={'30%'} borderRadius='20px' m={'30px'} p={'50px'}>
                    <Box>
                        <Text fontWeight={700} fontSize='20'>Fly to your dream destination</Text>
                        <Text>Find inspiration, compare and reserve your flight with flexibility</Text>
                        <Button mt={'25px'} onClick={() => navigate('/flights')}>Search flights</Button>
                    </Box>
                    <Box>
                        <Img src='https://r-xx.bstatic.com/xdata/images/xphoto/500x500/184698944.jpeg?k=7652b7b65903f21464b812d3eca387f9a7e0241b1df0b4ebe981ba95df4b254c&o=%22' w={150} h={150} />
                    </Box>
                </Flex>
                <Flex boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'} w={'30%'} borderRadius='20px' m={'30px'} p={'30px'}>
                    <Box zIndex={100} position='absolute' color='white' width='250px' padding='20px'>
                        <Text fontWeight={700} fontSize='20'>Work and travel, now possible!</Text>
                        <Text>Take your work with you and change your surroundings</Text>
                    </Box>
                    <Box>
                        <Img src='https://r-xx.bstatic.com/xdata/images/xphoto/714x300/184699273.jpeg?k=503e088a7d417c30217b5109dda404d2c2050001588cf7a45fca63e3363573de&o=' w={'100%'} h={'100%'} />
                    </Box>
                </Flex>
                <Flex boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'} w={'30%'} borderRadius='20px' m={'30px'} p={'50px'}>
                    <Box>
                        <Text fontWeight={700} fontSize='20'>Reserve your flight today</Text>
                        <Text>Check available resorts and flights for your vacation</Text>
                    </Box>
                    <Box>
                        <Img src='/vacation.jpg' w={300} h={150} />
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}
