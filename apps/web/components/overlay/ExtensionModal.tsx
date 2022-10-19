import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Stack,
  useDisclosure,
} from 'ui';

export const ExtensionModal = (props: any) => {
  const { title, children } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button variant='link' size='sm' onClick={onOpen}>
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
        <ModalOverlay />
        <ModalContent bg='dark.900' borderColor='dark.500' borderWidth='1px'>
          <ModalBody>
            <Stack spacing='0'>
              <Stack
                px={{ base: '6', md: '6' }}
                py={{ base: '6', md: '6' }}
                spacing='2'
                align='center'
              >
                {children}
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant='link' color='gray' onClick={onClose} isFullWidth>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
