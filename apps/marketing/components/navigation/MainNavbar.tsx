import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
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
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Open Menu'
                icon={<LightningBolt fontSize='1.25rem' />}
                variant='ghost'
              />
              <MenuList bg='dark.900'>
                <Stack justify='right' spacing='3'>
                  <Link href='/teams'>
                    <Button variant='link'>Teams</Button>
                  </Link>
                  <Link href='/clubs'>
                    <Button variant='link'>Investment Clubs</Button>
                  </Link>
                  <Link href='/daos'>
                    <Button variant='link'>DAOs</Button>
                  </Link>
                </Stack>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Box>
    </motion.div>
  );
};
