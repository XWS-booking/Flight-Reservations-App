import {
  Box,
  Button,
  Text,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LOGIN_VALIDATION_SCHEMA } from "../auth.constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApplicationStore } from "../../../store/application.store";
export type FormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const defaultValues: FormValues = {
    email: "",
    password: "",
  };
  let login = useApplicationStore((state) => state.login);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
  });

  const handleOnSubmit = (values: FormValues) => {
    login(values);
    console.log(values);
  };

  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      direction={"column"}
      bgGradient={"linear(to-r, #8A2387, #E94057, #F27121)"}
    >
      <Box
        m={"auto"}
        pt={"12"}
        pb={"24"}
        px={"8"}
        w={"25rem"}
        bgColor={"white"}
        rounded={"md"}
        boxShadow={"2px 3px 20px 2px rgba(0,0,0,0.66)"}
      >
        <Button
          onClick={onOpen}
          mt={"4"}
          fontWeight={"bold"}
          bg={"#cd3765"}
          _hover={{
            bg: "#ea4551",
          }}
          w="100%"
          mx={"auto"}
          color={"white"}
        >
          Login
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mx={4} mb={6}>
                <FormControl
                  isInvalid={errors.email != null}
                  h={"100px"}
                  mb={"2"}
                >
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...register("email")} />
                  {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.password != null} h={"100px"}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...register("password")} />
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  onClick={handleSubmit(handleOnSubmit)}
                  mt={"4"}
                  fontWeight={"bold"}
                  bg={"#cd3765"}
                  _hover={{
                    bg: "#ea4551",
                  }}
                  w="100%"
                  mx={"auto"}
                  color={"white"}
                >
                  Login
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};
