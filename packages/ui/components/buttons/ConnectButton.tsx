import { Button, Text } from '@chakra-ui/react';
import { useAuth } from '@micro-stacks/react';
import { ButtonProps } from './types';

export const ConnectButton = (props: ButtonProps) => {
  const { isSignedIn, openAuthRequest, signOut } = useAuth();
  const text = isSignedIn ? 'Disconnect' : props?.children || 'Connect';

  const handleClick = () => {
    if (isSignedIn) {
      signOut();
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
