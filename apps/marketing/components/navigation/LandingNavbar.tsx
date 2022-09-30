import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  IconButton,
  useBreakpointValue,
  Heading,
} from 'ui';

import { LightningBolt, LogoIcon } from 'ui/components/icons';

export const LandingNavbar = (props) => {
  const { title } = props;
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as='section'>
      <Box as='nav' bg='bg-surface' boxShadow='sm-dark'>
        <Container py={{ base: '4', lg: '5' }} maxW='7xl'>
          <HStack spacing='10' justify='space-between'>
            <Link href='/'>
              <LogoIcon
                alt='logo'
                url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
                cursor='pointer'
                height='35px'
              />
            </Link>
            <Heading
              as='h2'
              size='md'
              fontWeight='thin'
              maxW='48rem'
              mx='auto'
              lineHeight='1.2'
              letterSpacing='tight'
            >
              {title}
            </Heading>
            {isDesktop ? (
              <Button
                mt='8'
                minW='14rem'
                colorScheme='blue'
                size='lg'
                height='14'
                px='8'
                fontSize='md'
                fontWeight='bold'
              >
                Get Started for free
              </Button>
            ) : (
              <IconButton
                variant='ghost'
                icon={<LightningBolt fontSize='1.25rem' />}
                aria-label='Open Menu'
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
