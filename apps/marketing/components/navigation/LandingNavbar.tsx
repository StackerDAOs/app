import React from 'react';
import Link from 'next/link';
import { GetStartedButton } from '@components/buttons';
import {
  Button,
  ButtonGroup,
  HStack,
  Text,
  useBreakpointValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
} from 'ui';
import { LightningBolt } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const LandingNavbar = (props: any) => {
  const { navTitle } = props;
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isDesktop ? (
        <motion.div
          variants={FADE_IN_VARIANTS}
          initial={FADE_IN_VARIANTS.hidden}
          animate={FADE_IN_VARIANTS.enter}
          exit={FADE_IN_VARIANTS.exit}
          transition={{ duration: 1, type: 'linear' }}
        >
          <HStack justify='space-between' id='hstack'>
            <Text
              fontSize='xl'
              fontWeight='light'
              color='text-default'
              maxW='lg'
            >
              {navTitle}
            </Text>
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
                  size='md'
                />
              </ButtonGroup>
            </HStack>
          </HStack>
        </motion.div>
      ) : (
        <HStack justify='space-between' id='hstack'>
          <motion.div
            variants={FADE_IN_VARIANTS}
            initial={FADE_IN_VARIANTS.hidden}
            animate={FADE_IN_VARIANTS.enter}
            exit={FADE_IN_VARIANTS.exit}
            transition={{ duration: 1, type: 'linear' }}
          >
            <Text
              fontSize='xl'
              fontWeight='light'
              color='text-default'
              maxW='lg'
            >
              {navTitle}
            </Text>
          </motion.div>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Open Menu'
              icon={<LightningBolt fontSize='1.25rem' />}
              variant='ghost'
            />
            <MenuList bg='dark.500' border='none' maxW='sm'>
              <VStack alignItems='right'>
                <Link href='/'>Docs</Link>
                <Link href='/'>Get Started</Link>
              </VStack>
            </MenuList>
          </Menu>
        </HStack>
      )}
    </>
  );
};
