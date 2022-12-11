import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {
  isActive: boolean;
}

export const DotStep = (props: Props) => {
  const { isActive, ...boxProps } = props;
  return (
    <Box
      boxSize='2.5'
      bg={isActive ? 'primary.900' : 'dark.500'}
      borderRadius='full'
      transition='background 0.2s'
      {...boxProps}
    />
  );
};
