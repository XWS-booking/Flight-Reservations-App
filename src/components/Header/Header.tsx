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
import { CreateFlight } from "../Flight/CreateFlight";
import { LoginForm } from "../Auth/LoginForm";
import { RegistrationForm } from "../Auth/RegistrationForm";
import { useApplicationStore } from "../../store/application.store";
import { Role } from "../../store/auth-store/model/enums/role.enum";
import { TiTicket } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

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
  const {
    isOpen: isOpenRegistration,
    onOpen: onOpenRegistration,
    onClose: onCloseRegistration,
  } = useDisclosure();

  const user = useApplicationStore((state) => state.user);
  const logout = useApplicationStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <Box width="100%" bg={"#003b95"} p={"10px 25px"}>
        <Flex
          w={"100%"}
          h={"40px"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Link href="/">
            <Text color={"white"} fontWeight="700">
              Flight.com
            </Text>
          </Link>
          <Flex gap="15px">
            {user == null && (
              <Link onClick={onOpenLogin} color={"white"}>
                Login
              </Link>
            )}
            {user == null && (
              <Link color={"white"} onClick={onOpenRegistration}>
                Register
              </Link>
            )}

            {user != null && (
              <Link color={"white"} onClick={handleLogout}>
                Logout
              </Link>
            )}
          </Flex>
        </Flex>
        <Divider></Divider>
        <Flex m={"20px 0 10px 0"}>
          {user?.role === Role.ADMINISTRATOR && (
            <Button onClick={onOpenAdd}>
              <GiCommercialAirplane></GiCommercialAirplane>
              Create flight
            </Button>
          )}
          {user?.role === Role.REGULAR && (
            <Button gap="10px" onClick={() => navigate("/ticket-history")}>
              <TiTicket fontSize={20} />
              My tickets
            </Button>
          )}
        </Flex>
      </Box>
      <CreateFlight
        isOpen={isOpenAdd}
        onOpen={onOpenAdd}
        onClose={onCloseAdd}
      />
      <LoginForm
        isOpen={isOpenLogin}
        onOpen={onOpenLogin}
        onClose={onCloseLogin}
      />
      <RegistrationForm
        isOpen={isOpenRegistration}
        onOpen={onOpenRegistration}
        onClose={onCloseRegistration}
      />
    </>
  );
};
