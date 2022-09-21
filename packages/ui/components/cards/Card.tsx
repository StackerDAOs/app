import { Box, BoxProps } from '@chakra-ui/react';

export const Card = (props: BoxProps) => (
  <Box
    bg='dark.800'
    borderRadius='lg'
    border='1px solid'
    borderColor='dark.500'
    {...props}
  />
);
