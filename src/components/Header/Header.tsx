import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GiCommercialAirplane } from "react-icons/gi";
import React from "react";
import { CreateFlight } from "../Flight/CreateFlight";
import { LoginForm } from "../Auth/LoginForm";

export const Header = () => {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  return (
    <>
      <Box width="100%" bg={"#003b95"} p={"10px 25px"}>
        <Flex
          w={"100%"}
          h={"40px"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Text color={"white"} fontWeight="700">
            Flight.com
          </Text>
          <Flex gap="15px">
            <Link onClick={onOpenLogin} color={"white"}>
              Login
            </Link>
            <Link color={"white"}>Register</Link>
          </Flex>
        </Flex>
        <Divider></Divider>
        <Flex m={"20px 0"}>
          <Button onClick={onOpenAdd}>
            <GiCommercialAirplane></GiCommercialAirplane>
            Create flight
          </Button>
        </Flex>
      </Box>
      <CreateFlight
        isOpen={isOpenAdd}
        onOpen={onOpenAdd}
        onClose={onCloseAdd}
      ></CreateFlight>
      <LoginForm
        isOpen={isOpenLogin}
        onOpen={onOpenLogin}
        onClose={onCloseLogin}
      />
    </>
  );
};
