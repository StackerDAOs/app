import React from 'react';
import { Button, Stack, Text, useToast } from '@chakra-ui/react';
import { ButtonProps } from './types';
import { signIn } from 'next-auth/react';
import { useOpenSignMessage, useAccount } from 'ui/components';

interface SignMessageProps extends ButtonProps {
  message?: string;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
}

export const SignMessageButton = (props: SignMessageProps) => {
  const { message = 'Sign this message', onSuccess, onError } = props;
  const { stxAddress } = useAccount();
  const { openSignMessage } = useOpenSignMessage();
  const toast = useToast();

  const handleSignMessage = React.useCallback(async () => {
    try {
      const { signature, publicKey }: any = await openSignMessage({
        message,
      });
      const response = await signIn('credentials', {
        address: stxAddress,
        signature: signature,
        publicKey: publicKey,
        redirect: false,
      });
      handleResult(response);
    } catch (error) {
      toast({
        duration: 5000,
        position: 'bottom-right',
        isClosable: true,
        render: () => (
          <Stack
            direction='row'
            p='4'
            spacing='3'
            bg='light.900'
            borderRadius='lg'
          >
            <Stack spacing='2.5'>
              <Stack spacing='1'>
                <Text fontSize='md' color='dark.900' fontWeight='medium'>
                  Something went wrong
                </Text>
              </Stack>
            </Stack>
          </Stack>
        ),
      });
    }
  }, []);

  const handleResult = React.useCallback(
    async (response: any) => {
      response?.status === 200 ? onSuccess?.(response) : onError?.(response);
    },
    [props],
  );

  return (
    <Button {...props} onClick={handleSignMessage}>
      <Text>Continue</Text>
    </Button>
  );
};
