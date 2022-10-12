import {
  Box,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Square,
  Stack,
  Text,
  useBreakpointValue,
} from 'ui';
import * as React from 'react';

export const FeatureList = (props: any) => {
  const { featureListProps, getStartedButton } = props;
  return (
    <Box as='section'>
      {/* <Container py={{ base: '16', md: '24' }} maxW={{ base: 'xl', md: '3xl' }}> */}
      <Stack spacing={{ base: '12', md: '16' }}>
        <Stack
          spacing={{ base: '4', md: '5' }}
          align='center'
          textAlign='center'
        >
          <Box bg='dark.500' py='10' borderRadius='lg' w='full'>
            <Stack spacing='3'>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='semibold'
                color='accent'
                maxW='3xl'
              >
                The How
              </Text>
              <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>
                What can you expect?
              </Heading>
            </Stack>
          </Box>
          <Text color='muted' fontSize={{ base: 'lg', md: 'xl' }} maxW='3xl'>
            A no code platform that provides teams with the tools to manage and
            deploy their own smart contracts.
          </Text>
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
          {getStartedButton}
        </Box>
      </Stack>
      {/* </Container> */}
    </Box>
  );
};
