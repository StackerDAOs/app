import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import {
  ArrowRight,
  BitcoinIcon,
  ChevronDown,
  EngineGearsIcon,
  RegulationIcon,
} from 'ui/components/icons';
import { MainNavbar, Footer } from '@components/navigation';

const features = [
  {
    name: 'Powered by Bitcoin',
    icon: BitcoinIcon,
    description:
      'Leverage cryptos most secure, decentralized, and valuable network for security and capital. Native Bitcoin fundraising coming soon.',
  },
  {
    name: 'Decentralized, composable, and powerful',
    icon: EngineGearsIcon,
    description:
      ' Execute voter approved on-chain proposals automatically, easily interact with and integrate other applications, and do almost anything an individual wallet can do.',
  },
  {
    name: 'Quick Legal Setup',
    icon: RegulationIcon,
    description:
      'Form a legal entity with a few clicks, generate form legal docs, and receive compliance assistance. Coming soon.',
  },
];

export default function Web() {
  const ref = React.useRef(null);
  const handleScrollTo = () => {
    const current = ref?.current as any;
    current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
      <Box as='section'>
        <MainNavbar />
        <Stack
          justify='center'
          h='100vh'
          as='section'
          backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
          opacity='1'
        >
          <Box as='section' py='6' px='12'>
            <Stack spacing='6' align='flex-start'>
              <Stack spacing='0'>
                <Heading
                  m='0'
                  fontSize={{ base: '5xl', sm: '7xl', lg: '8xl' }}
                  fontWeight='thin'
                  letterSpacing='tight'
                >
                  Ownership &amp; Action.
                </Heading>
                <Text
                  m='-20px 0 0 0 !important'
                  fontSize={{ base: '5xl', sm: '7xl', lg: '8xl' }}
                  fontWeight='black'
                  bgGradient='linear(to-b, primary.900, primary-accent.900)'
                  bgClip='text'
                >
                  Together.
                </Text>
              </Stack>
              <Text
                color='light.500'
                fontWeight='light'
                fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                maxW='4xl'
                letterSpacing='tight'
              >
                Create and manage compliant web3 organizations that govern
                protocols, invest, fund causes, and more.{' '}
                <Text as='span' fontWeight='semibold'>
                  Together
                </Text>
                .
              </Text>
              <ButtonGroup spacing='8'>
                <Link href='/get-started' passHref>
                  <Button size='lg' variant='default' px='8'>
                    Get started
                  </Button>
                </Link>
                <Button
                  onClick={handleScrollTo}
                  size='lg'
                  variant='link'
                  px='8'
                  rightIcon={<ChevronDown />}
                >
                  Learn more
                </Button>
              </ButtonGroup>
            </Stack>
          </Box>
        </Stack>
        <Box as='section' py='24' bgGradient='linear(to-b, dark.700, dark.900)'>
          <Stack spacing={{ base: '12', md: '16' }} px='12'>
            <Stack
              spacing={{ base: '4', md: '5' }}
              align='center'
              textAlign='center'
            >
              <Stack spacing='3'>
                <Heading
                  as='h1'
                  size='3xl'
                  fontWeight='black'
                  lineHeight='1.2'
                  letterSpacing='tight'
                >
                  Easily build and manage your own Club, Team, or DAO
                </Heading>
              </Stack>
            </Stack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing='6'>
              {features.map((feature) => (
                <Stack
                  key={feature.name}
                  spacing={{ base: '4', md: '5' }}
                  align='center'
                  textAlign='center'
                >
                  <Icon as={feature.icon} boxSize='10' color='primary.500' />
                  <Stack spacing={{ base: '1', md: '2' }}>
                    <Text
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontWeight='semibold'
                    >
                      {feature.name}
                    </Text>
                    <Text fontSize='lg' color='gray' letterSpacing='tight'>
                      {feature.description}
                    </Text>
                  </Stack>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
        <Box bg='dark.900' ref={ref}>
          <Box as='section' pt='24' pb='12' overflow='hidden'>
            <Box py='3' px='12'>
              <Flex
                align='flex-start'
                direction={{ base: 'column', lg: 'row' }}
                justify='space-between'
              >
                <Stack flex='1' maxW={{ lg: 'lg' }} pt='6' spacing='6'>
                  <Heading
                    as='h1'
                    color='primary.900'
                    size='4xl'
                    mt='12'
                    fontWeight='black'
                  >
                    Clubs
                  </Heading>
                  <Text
                    color='light.500'
                    fontWeight='light'
                    fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                    maxW='5xl'
                    letterSpacing='tight'
                  >
                    Membership gated DAOs to raise funds, govern, and take
                    action. Perfect for investment DAOs, impact DAOs, service
                    DAOs, and more.
                  </Text>
                  <ButtonGroup spacing='6'>
                    <Button
                      as='a'
                      href='https://form.typeform.com/to/zfYJYLgV'
                      target='_blank'
                      rel='noreferrer'
                      variant='default'
                      size='lg'
                      fontWeight='medium'
                    >
                      Get in touch
                    </Button>
                    <Link href='/clubs'>
                      <Button
                        variant='link'
                        size='lg'
                        fontWeight='medium'
                        rightIcon={<ArrowRight />}
                      >
                        More details
                      </Button>
                    </Link>
                  </ButtonGroup>
                </Stack>
                <Box boxSize={{ base: '20', lg: '8' }} />
                <Image
                  pos='relative'
                  marginEnd={{ base: '0', lg: '-20rem' }}
                  w='65rem'
                  src='/images/clubs-hero.png'
                  alt='Screenshot for Form builder'
                />
              </Flex>
            </Box>
          </Box>
          <Box as='section' pt='24' pb='12' overflow='hidden'>
            <Box py='3' px='12'>
              <Flex
                align='flex-start'
                direction={{ base: 'column', lg: 'row' }}
                justify='space-between'
              >
                <Stack flex='1' maxW={{ lg: 'lg' }} pt='6' spacing='6'>
                  <Heading
                    as='h1'
                    color='secondary.900'
                    size='4xl'
                    mt='12'
                    fontWeight='black'
                  >
                    Teams
                  </Heading>
                  <Text
                    color='light.500'
                    fontWeight='light'
                    fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                    maxW='5xl'
                    letterSpacing='tight'
                  >
                    Multisig tool for working groups to manage assets and smart
                    contracts. Perfect for companies, projects, subDAOs, and
                    early DAOs progressively decentralizing.
                  </Text>
                  <ButtonGroup spacing='6'>
                    <Button
                      as='a'
                      href='https://teams.stackerdaos.com/create'
                      variant='default'
                      size='lg'
                      fontWeight='medium'
                    >
                      Create Team
                    </Button>
                    <Link href='/teams'>
                      <Button
                        variant='link'
                        size='lg'
                        fontWeight='medium'
                        rightIcon={<ArrowRight />}
                      >
                        More details
                      </Button>
                    </Link>
                  </ButtonGroup>
                </Stack>
                <Box boxSize={{ base: '20', lg: '8' }} />
                <Image
                  pos='relative'
                  marginEnd={{ base: '0', lg: '-20rem' }}
                  w='62.5rem'
                  src='/images/teams-hero.png'
                  alt='Screenshot for Form builder'
                />
              </Flex>
            </Box>
          </Box>
          <Box as='section' pt='24' pb='12' overflow='hidden'>
            <Box py='3' px='12'>
              <Flex
                align='flex-start'
                direction={{ base: 'column', lg: 'row' }}
                justify='space-between'
              >
                <Stack flex='1' maxW={{ lg: 'lg' }} pt='6' spacing='6'>
                  <Heading
                    as='h1'
                    color='light.900'
                    size='4xl'
                    mt='12'
                    fontWeight='black'
                  >
                    <Text
                      as='span'
                      fontWeight='light'
                      bgGradient='linear(to-br, #624AF2 5%, #27cb9f 100%)'
                      bgClip='text'
                      letterSpacing='tight'
                      pr='1'
                    >
                      Stacker
                    </Text>
                    DAOs
                  </Heading>
                  <Text
                    color='light.500'
                    fontWeight='light'
                    fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                    maxW='5xl'
                    letterSpacing='tight'
                  >
                    Permissionless DAOs to govern open communities and networks.
                    Perfect for protocol DAOs, NFT communities, ecosystem DAOs,
                    and more.
                  </Text>
                  <ButtonGroup spacing='6'>
                    <Button
                      variant='default'
                      size='lg'
                      fontWeight='medium'
                      as='a'
                      href='https://form.typeform.com/to/zfYJYLgV'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Get in touch
                    </Button>
                    <Link href='/daos'>
                      <Button
                        variant='link'
                        size='lg'
                        fontWeight='medium'
                        rightIcon={<ArrowRight />}
                      >
                        More details
                      </Button>
                    </Link>
                  </ButtonGroup>
                </Stack>
                <Box boxSize={{ base: '20', lg: '8' }} />
                <Image
                  pos='relative'
                  marginEnd={{ base: '0', lg: '-20rem' }}
                  w='62.5rem'
                  src='/images/proposal-hero.png'
                  alt='Screenshot for Form builder'
                />
              </Flex>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </motion.div>
  );
}
