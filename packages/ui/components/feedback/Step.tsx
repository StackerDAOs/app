import { Box, BoxProps, Stack, Text } from '@chakra-ui/react';

interface StepProps extends BoxProps {
  title?: string;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const Step = (props: StepProps) => {
  const { title, description, isActive, isCompleted, ...boxProps } = props;
  return (
    <Box
      flex='1'
      borderTopWidth={{ base: '0', md: '5px' }}
      borderLeftWidth={{ base: '5px', md: '0' }}
      borderColor={isActive || isCompleted ? '#624AF2' : 'inherit'}
      {...boxProps}
    >
      <Stack spacing='0.5'>
        <Text color='emphasized' fontWeight='medium'>
          {title}
        </Text>
        <Text color='muted'>{description}</Text>
      </Stack>
    </Box>
  );
};
