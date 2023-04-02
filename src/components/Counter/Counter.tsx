import { Button, Flex, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

interface Props {
    quantity: number
    setQuantity: (val: number) => void
    maxQuantity: number
}

export const Counter = ({ quantity, setQuantity, maxQuantity }: Props) => {

    const handleChange = (val: number) => {
        if (quantity + val <= 0)
            return setQuantity(0)
        if (quantity + val > maxQuantity)
            return setQuantity(maxQuantity)
        setQuantity(quantity + val)
    }
    return (
        <Flex >
            <Button onClick={() => handleChange(-1)}>
                <AiOutlineMinus fontSize={18} />
            </Button>
            <Input bg={'white'} width='55px' value={quantity} onChange={(e) => handleChange(parseInt(e.target.value))} />
            <Button onClick={() => handleChange(1)}>
                <AiOutlinePlus fontSize={18} />
            </Button>
        </Flex >
    )
}
