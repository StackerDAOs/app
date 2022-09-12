import { Container as ChakraContainer, Stack } from '@chakra-ui/react';
import type { ContainerProps } from '@chakra-ui/react';

export const Container = (props: ContainerProps) => {
  return (
    <ChakraContainer maxW='6xl' {...props}>
      <Stack spacing={{ base: '8', lg: '6' }}>
        <Stack w='auto'>{props.children}</Stack>
      </Stack>
    </ChakraContainer>
  );
};
