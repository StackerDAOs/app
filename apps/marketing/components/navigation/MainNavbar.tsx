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
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const MainNavbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 1, type: 'linear' }}
    >
      <Box as='section'>
        <HStack justify='flex-end'>
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
      </Box>
    </motion.div>
  );
};
