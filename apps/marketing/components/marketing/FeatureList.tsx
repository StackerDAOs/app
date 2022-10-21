import {
  Box,
  Heading,
  Icon,
  SimpleGrid,
  Square,
  Stack,
  Text,
  useBreakpointValue,
} from 'ui';
import { GetStartedButton } from '@components/buttons';
import * as React from 'react';

export const FeatureList = (props: any) => {
  const { featureListProps } = props;
  return (
    <Stack spacing={{ base: '12', md: '16' }}>
      <Stack spacing={{ base: '4', md: '5' }} align='center' textAlign='center'>
        <Box borderRadius='lg' w='full'>
          <Stack spacing='3'>
            <Heading size={useBreakpointValue({ base: 'lg', md: '3xl' })}>
              Complete suite of powerful DAO tools or Powerful suite of Web3
              collaborative Tools
            </Heading>
          </Stack>
        </Box>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing='12'>
        {featureListProps.map((feature: any) => (
          <Box bg='dark.500' py='10' borderRadius='lg'>
            <Stack
              key={feature.name}
              spacing={{ base: '4', md: '5' }}
              align='center'
              textAlign='center'
              p='6'
            >
              <Square
                size={{ base: '10', md: '12' }}
                bg='accent'
                color='inverted'
                borderRadius='lg'
              >
                <Icon as={feature.icon} boxSize={{ base: '10', md: '20' }} />
              </Square>
              <Stack spacing={{ base: '1', md: '2' }}>
                <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight='medium'>
                  {feature.name}
                </Text>
                <Text>{feature.description}</Text>
              </Stack>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
      <Box
        borderRadius='lg'
        p={{ base: '4', md: '6' }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <GetStartedButton
          maxW='14rem'
          bg='light.900'
          color='dark.500'
          height='14'
          px='8'
          fontSize='md'
          fontWeight='bold'
          borderRadius='9999px'
        />
      </Box>
    </Stack>
  );
};
