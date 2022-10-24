import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  HStack,
  VStack,
  IconButton,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
} from 'ui';
import { Nav } from '@components/containers';
import { ThreeBars, LogoIcon } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { appUrl } from 'utils';

export const MainNavbar = (props: any) => {
  const { shouldSwitchNav } = props;
  const router = useRouter();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const currentPath = (path: string) => {
    switch (path) {
      case '/clubs':
        return {
          getStarted: `${appUrl.clubs}/create`,
          docs: 'https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/clubs',
        };

      case '/teams':
        return {
          getStarted: `${appUrl.teams}/create`,
          docs: 'https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/teams',
        };
      case '/daos':
        return {
          getStarted: appUrl.daos,
          docs: 'https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/stackerdao',
        };
      default:
        return null;
    }
  };
  const selectedPath = currentPath(router.pathname);

  return (
    <Nav bg='dark.900'>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 1, type: 'linear' }}
      >
        <HStack justify='space-between'>
          {isDesktop ? (
            <>
              <Link href='/'>
                <LogoIcon
                  alt='logo'
                  url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/logo-with-name.png'
                  cursor='pointer'
                  height='50px'
                />
              </Link>
              {shouldSwitchNav ? (
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 1, type: 'linear' }}
                >
                  <ButtonGroup variant='link' spacing='6'>
                    <Button
                      as='a'
                      target='_blank'
                      href={selectedPath?.docs}
                      variant='link'
                      size='lg'
                      fontWeight='semibold'
                    >
                      Docs
                    </Button>

                    <Button
                      as='a'
                      href={`${selectedPath?.getStarted}`}
                      variant='default'
                    >
                      Get started
                    </Button>
                  </ButtonGroup>
                </motion.div>
              ) : (
                <ButtonGroup variant='link' spacing='8'>
                  <Link href='/clubs'>
                    <Button variant='link' size='lg' fontWeight='semibold'>
                      Clubs
                    </Button>
                  </Link>
                  <Link href='/teams'>
                    <Button variant='link' size='lg' fontWeight='semibold'>
                      Teams
                    </Button>
                  </Link>
                  <Link href='/daos'>
                    <Button variant='link' size='lg' fontWeight='semibold'>
                      DAOs
                    </Button>
                  </Link>
                </ButtonGroup>
              )}
            </>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Open Menu'
                icon={<ThreeBars fontSize='1.25rem' />}
                variant='ghost'
              />
              <MenuList bg='dark.500' border='none' alignItems='right'>
                <VStack alignItems='left'>
                  <Link href='/teams'>
                    <Button variant='link'>Teams</Button>
                  </Link>
                  <Link href='/clubs'>
                    <Button variant='link'>Clubs</Button>
                  </Link>
                </VStack>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </motion.div>
    </Nav>
  );
};
