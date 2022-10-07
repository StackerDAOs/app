import {
  Circle,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from 'ui';
import { ButtonProps } from '../../buttons/types';
import { LightningBolt } from 'ui/components/icons';
import { SignMessageButton } from 'ui/components/buttons';

interface ConnectButtonProps extends ButtonProps {
  icon?: JSX.Element | any;
  title: string;
  description: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const SignMessageModal = (props: ConnectButtonProps) => {
  const {
    icon = LightningBolt,
    title,
    description,
    isOpen,
    onOpen,
    onClose,
    ...rest
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg='dark.900' borderColor='dark.500' borderWidth='1px'>
        <ModalBody>
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '6', md: '6' }}
            spacing='2'
            align='center'
          >
            <Circle bg='dark.500' size='14' mb='3'>
              <Icon as={icon} boxSize='8' color='primary.900' />
            </Circle>
            <Stack spacing='3'>
              <Heading mt='0 !important' size='md' fontWeight='medium'>
                {title}
              </Heading>
            </Stack>
            <Text
              fontSize='md'
              fontWeight='thin'
              color='text-muted'
              textAlign='center'
            >
              Clicking continue will initiate a message signing request. This
              authenticates you with StackerDAO Labs and enables you to vote.
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <SignMessageButton
            message='Welcome to StackerDAO Labs'
            onSuccess={() => alert('success')}
            onError={() => onClose()}
            variant='default'
            isFullWidth
          >
            Continue
          </SignMessageButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
