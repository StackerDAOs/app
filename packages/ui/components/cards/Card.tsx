import { Box, BoxProps } from '@chakra-ui/react';

export const Card = (props: BoxProps) => (
  <Box
    minH='35'
    bg='card-bg'
    borderRadius='lg'
    border='1px solid'
    borderColor='btn-border'
    {...props}
  />
);
