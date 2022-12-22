import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonGroup,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
} from 'ui';
import { Nav } from '@components/containers';
import { LogoIcon, ArrowRight } from 'ui/components/icons';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

const pathUrl = {
  clubs:
    'https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/clubs',
  teams: 'https://teams.stackerdaos.com',
  daos: 'https://app.stackerdaos.com',
};

export const MainNavbar = (props: any) => {
  const { shouldSwitchNav } = props;
  const router = useRouter();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const currentPath = (path: string) => {
    switch (path) {
      case '/clubs':
        return {
          getStarted: 'https://form.typeform.com/to/zfYJYLgV',
          create: 'https://form.typeform.com/to/zfYJYLgV',
          docs: 'https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/clubs',
        };

      case '/teams':
        return {
          getStarted: pathUrl.teams,
          create: 'https://teams.stackerdaos.com/create',
          docs: 'https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/teams',
        };
      case '/daos':
        return {
          getStarted: pathUrl.daos,
          create: 'https://form.typeform.com/to/zfYJYLgV',
          docs: 'https://stackerdaos.gitbook.io/stackerdao-labs-wiki/stackerdao-labs-offerings/products-stackerdao-clubs-teams/stackerdao',
        };
      default:
        return null;
    }
  };
  const selectedPath = currentPath(router.pathname);

  const products = [
    {
      title: 'Clubs',
      href: pathUrl.clubs,
      icon: ArrowRight,
      active: false,
    },
    {
      title: 'Teams',
      href: pathUrl.teams,
      icon: ArrowRight,
      active: true,
    },
    {
      title: 'StackerDAOs',
      href: pathUrl.daos,
      icon: ArrowRight,
      active: true,
    },
  ];

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
                <HStack justify='space-between' spacing='8'>
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
                  <Popover trigger='click' placement='bottom' gutter={12}>
                    {({ isOpen }) => (
                      <>
                        <PopoverTrigger>
                          <Button
                            variant='default'
                            color={isOpen ? 'primary.900' : 'dark.900'}
                          >
                            Launch app
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          width='xs'
                          p='5'
                          borderColor='dark.500'
                          borderWidth='1px'
                          bg='dark.900'
                          maxWidth='78.5%'
                          _focus={{ outline: 'none' }}
                        >
                          <Stack>
                            {products.map((product) => (
                              <Link
                                key={product.title}
                                href={product.active ? product.href : '#'}
                              >
                                <Stack
                                  spacing='4'
                                  direction='row'
                                  justify='space-between'
                                  p='2'
                                  _hover={
                                    product.active
                                      ? {
                                          cursor: 'pointer',
                                          bg: 'dark.800',
                                          color: 'primary.900',
                                        }
                                      : { cursor: 'default' }
                                  }
                                >
                                  <HStack spacing='6' justify='space-between'>
                                    <Text fontWeight='medium'>
                                      {product.title}
                                    </Text>
                                    {!product.active && (
                                      <Text
                                        fontSize='sm'
                                        fontWeight='medium'
                                        color='yellow.500'
                                      >
                                        Coming soon
                                      </Text>
                                    )}
                                  </HStack>
                                </Stack>
                              </Link>
                            ))}
                          </Stack>
                        </PopoverContent>
                      </>
                    )}
                  </Popover>
                </HStack>
              )}
            </>
          ) : null}
        </HStack>
      </motion.div>
    </Nav>
  );
};
