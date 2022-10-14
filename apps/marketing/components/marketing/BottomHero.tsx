import * as React from 'react';
import { Box, Heading, Stack, Text, useBreakpointValue } from 'ui';
import { GetStartedButton } from '@components/buttons';

interface BottomHeroProps {
  bottomHeroProps: any;
  bottomHeroImage: any;
}

export const BottomHero = (props: BottomHeroProps) => {
  const { bottomHeroImage, bottomHeroProps } = props;
  return (
    <Box position='relative' height={{ lg: 'xl' }}>
      <Stack py={{ base: '16', md: '50' }} height='full'>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '16' }}
          align={{ lg: 'center' }}
          height='full'
        >
          <Stack spacing={{ base: '8', md: '12' }}>
            <Stack spacing='4'>
              <Stack
                spacing={{ base: '4', md: '6' }}
                maxW={{ md: 'xl', lg: 'xl', xl: 'xl' }}
              >
                <Heading size={useBreakpointValue({ base: 'md', md: 'xl' })}>
                  {bottomHeroProps.heading}
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'xl' }}>
                  {bottomHeroProps.description}
                </Text>
              </Stack>
            </Stack>
            <Stack direction={{ base: 'column', md: 'row' }} spacing='3'>
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
            </Stack>
          </Stack>
          <Box
            pos={{ lg: 'absolute' }}
            right='0'
            bottom='0'
            w={{ base: 'full', lg: '40%' }}
            height={{ base: '96', lg: 'full' }}
            sx={{
              clipPath: { lg: 'polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)' },
            }}
          >
            {bottomHeroImage}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
