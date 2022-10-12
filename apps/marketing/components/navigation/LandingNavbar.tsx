import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  useBreakpointValue,
  Text,
  Flex,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

import { LightningBolt, LogoIcon } from 'ui/components/icons';

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
          TEAMS
        </Text>
        <HStack>
          {isDesktop ? (
            <ButtonGroup spacing='2' id='group'>
              <Button variant='link'>
                <Link href='/'>Docs</Link>
              </Button>
              <Button variant='default'>Get Started</Button>
            </ButtonGroup>
          ) : (
            <IconButton
              variant='ghost'
              icon={<LightningBolt fontSize='1.25rem' />}
              aria-label='Open Menu'
            />
          )}
        </HStack>
      </HStack>
    </motion.div>
  );
};
