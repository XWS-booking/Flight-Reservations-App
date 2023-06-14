import {
  Box,
  Button,
  ModalOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { displayToast } from "../../utils/toast.caller";
import { useState } from "react";
import { useApplicationStore } from "../../store/application.store";
import { ApiKeyResponse } from "../../store/auth-store/model/api-key.response";

export type FormValues = {
  email: string;
  password: string;
};
interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ApiKeyForm = ({ isOpen, onOpen, onClose }: Props) => {
  let generateApiKey = useApplicationStore((state) => state.generateApiKey);
  const [permanent, setPermanent] = useState(true);
  const toast = useToast();
  const validateGeneration = (apiKeyGenerated: boolean, apiKey: string) => {
    if (!apiKeyGenerated) {
      displayToast(toast, "Login failed!", "error");
      return;
    }
    displayToast(
      toast,
      "Successfully generated api key! Your api key is: \n" + apiKey,
      "success"
    );
    onClose();
  };
  const handleOnSubmit = async () => {
    console.log(permanent);
    const apiKeyRes: ApiKeyResponse = await generateApiKey(permanent);
    validateGeneration(apiKeyRes.generatedApiKey, apiKeyRes.apiKey);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Generate your api key!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mx={4} mb={6}>
            <Checkbox
              checked={permanent}
              onChange={(event) => {
                setPermanent(event.target.checked);
              }}
            >
              Permanent
            </Checkbox>
            <Button
              onClick={() => handleOnSubmit()}
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
              Generate
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
