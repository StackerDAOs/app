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
} from 'ui';

import { LightningBolt, LogoIcon } from 'ui/components/icons';

export const MainNavbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as='section'>
      <Box as='nav' bg='dark.900'>
        <Container py={{ base: '4', lg: '5' }} maxW='6xl'>
          <HStack spacing='10' justify='space-between'>
            <Link href='/'>
              <LogoIcon
                alt='logo'
                url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
                cursor='pointer'
                height='35px'
              />
            </Link>
            {isDesktop ? (
              <ButtonGroup variant='link' spacing='8'>
                <Link href='/teams'>
                  <Button variant='link'>Teams</Button>
                </Link>
                <Link href='/clubs'>
                  <Button variant='link'>Investment Clubs</Button>
                </Link>
                <Link href='/daos'>
                  <Button variant='link'>DAOs</Button>
                </Link>
              </ButtonGroup>
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
