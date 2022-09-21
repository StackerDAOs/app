import { Button, Text } from '@chakra-ui/react';
import { useAuth } from '@micro-stacks/react';
import { ButtonProps } from './types';
import { useRouter } from 'next/router';

interface ConnectButtonProps extends ButtonProps {
  redirectOnConnect?: string;
}

export const ConnectButton = (props: ConnectButtonProps) => {
  const router = useRouter();
  const { isSignedIn, openAuthRequest, signOut } = useAuth();
  const text = isSignedIn ? 'Disconnect' : props?.children || 'Connect';
  const variant = isSignedIn ? 'inverted' : 'default';

  const handleClick = () => {
    if (isSignedIn) {
      signOut();
    } else if (props.redirectOnConnect) {
      openAuthRequest({
        onFinish: () => router.push(props.redirectOnConnect || ''),
      });
    } else {
      openAuthRequest();
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      <Text>{text}</Text>
    </Button>
  );
};
