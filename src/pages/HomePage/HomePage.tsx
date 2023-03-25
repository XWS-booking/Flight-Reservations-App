import { Box, Button, Flex, Img, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'

export const HomePage = () => {
    const navigate = useNavigate()
    return (
        <>
            <Img src='/landing.jpg' h={'500px'}></Img>
            <Flex>
                <Flex boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'} w={'30%'} borderRadius='20px' m={'30px'} p={'30px'}>
                    <Box>
                        <Text fontWeight={700} fontSize='20'>Letite do destinacije iz snova</Text>
                        <Text>Pronađite inspiraciju, uporedite i rezervišite letove uz veću fleksibilnost</Text>
                        <Button mt={'25px'} onClick={() => navigate('/flights')}>Pretrazite letove</Button>
                    </Box>
                    <Box>
                        <Img src='https://r-xx.bstatic.com/xdata/images/xphoto/500x500/184698944.jpeg?k=7652b7b65903f21464b812d3eca387f9a7e0241b1df0b4ebe981ba95df4b254c&o=%22' w={150} h={150} />
                    </Box>
                </Flex>
                <Flex boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'} w={'30%'} borderRadius='20px' m={'30px'} p={'30px'}>
                    <Box>
                        <Text fontWeight={700} fontSize='20'>Letite do destinacije iz snova</Text>
                        <Text>Pronađite inspiraciju, uporedite i rezervišite letove uz veću fleksibilnost</Text>
                        <Button mt={'25px'}>Pretrazite letove</Button>
                    </Box>
                    <Box>
                        <Img src='https://r-xx.bstatic.com/xdata/images/xphoto/500x500/184698944.jpeg?k=7652b7b65903f21464b812d3eca387f9a7e0241b1df0b4ebe981ba95df4b254c&o=%22' w={150} h={150} />
                    </Box>
                </Flex>
                <Flex boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'} w={'30%'} borderRadius='20px' m={'30px'} p={'30px'}>
                    <Box>
                        <Text fontWeight={700} fontSize='20'>Letite do destinacije iz snova</Text>
                        <Text>Pronađite inspiraciju, uporedite i rezervišite letove uz veću fleksibilnost</Text>
                        <Button mt={'25px'}>Pretrazite letove</Button>
                    </Box>
                    <Box>
                        <Img src='https://r-xx.bstatic.com/xdata/images/xphoto/500x500/184698944.jpeg?k=7652b7b65903f21464b812d3eca387f9a7e0241b1df0b4ebe981ba95df4b254c&o=%22' w={150} h={150} />
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}
