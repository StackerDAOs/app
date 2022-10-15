import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  VStack,
  IconButton,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  Stack,
} from 'ui';
import { LightningBolt } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const MainNavbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as='section'>
      <HStack justify='flex-end'>
        {isDesktop ? (
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 1, type: 'linear' }}
          >
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
          </motion.div>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Open Menu'
              icon={<LightningBolt fontSize='1.25rem' />}
              variant='ghost'
            />
            <MenuList bg='dark.500' border='none' alignItems='right'>
              <VStack alignItems='left'>
                <Link href='/teams'>Teams</Link>
                <Link href='/clubs'>Investment Clubs</Link>
                <Link href='/daos'>DAOs</Link>
              </VStack>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Box>
  );
};
