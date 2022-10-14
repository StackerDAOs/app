import React from 'react';
import Link from 'next/link';
import { GetStartedButton } from '@components/buttons';
import { Button, ButtonGroup, HStack, Text } from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

export const LandingNavbar = (props: any) => {
  const { navTitle } = props;
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
        <HStack>
          <ButtonGroup spacing='2' id='group'>
            <Button variant='link'>
              <Link href='/'>Docs</Link>
            </Button>
            <GetStartedButton />
          </ButtonGroup>
        </HStack>
      </HStack>
    </motion.div>
  );
};
