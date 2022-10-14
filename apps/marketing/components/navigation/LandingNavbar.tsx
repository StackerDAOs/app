import React from 'react';
import Link from 'next/link';
import { GetStartedButton } from '@components/buttons';
import { Button, ButtonGroup, HStack, Text, useBreakpointValue } from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const LandingNavbar = (props: any) => {
  const { navTitle } = props;
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 1, type: 'linear' }}
    >
      <HStack justify='space-between' id='hstack'>
        <Text fontSize='xl' fontWeight='light' color='text-default' maxW='lg'>
          {navTitle}
        </Text>
        {isDesktop ? (
          <HStack>
            <ButtonGroup spacing='2' id='group'>
              <Button variant='link'>
                <Link href='/'>Docs</Link>
              </Button>
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
            </ButtonGroup>
          </HStack>
        ) : (
          <HStack>
            <ButtonGroup spacing='2'>
              <Button variant='link'>
                <Link href='/'>Docs</Link>
              </Button>
              <GetStartedButton
                size='sm'
                bg='light.900'
                color='dark.500'
                fontWeight='bold'
                borderRadius='9999px'
              />
            </ButtonGroup>
          </HStack>
        )}
      </HStack>
    </motion.div>
  );
};
