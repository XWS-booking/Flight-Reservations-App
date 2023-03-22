import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Flex
    w='100%'
    h='100%'
    >
        <Outlet/>

    </Flex>
  );
}

export default App;
