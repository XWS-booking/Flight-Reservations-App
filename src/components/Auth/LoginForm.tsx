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
import { yupResolver } from "@hookform/resolvers/yup";
import { useApplicationStore } from "../../store/application.store";
import {
  LOGIN_DEFAULT_VALUES,
  LOGIN_VALIDATION_SCHEMA,
} from "../../utils/auth.constants";

export type FormValues = {
  email: string;
  password: string;
};
interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const LoginForm = ({ isOpen, onOpen, onClose }: Props) => {
  let login = useApplicationStore((state) => state.login);
  let user = useApplicationStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
  });

  const handleOnSubmit = (values: FormValues) => {
    login(values);
    console.log(user);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mx={4} mb={6}>
            <FormControl isInvalid={errors.email != null} h={"100px"} mb={"2"}>
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
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              onClick={handleSubmit(handleOnSubmit)}
              mt={"4"}
              fontWeight={"bold"}
              bg={"#003b95"}
              _hover={{
                bg: "#136ed1",
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
  );
};
