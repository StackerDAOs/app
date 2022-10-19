import Link from 'next/link';
import {
  Box,
  Button,
  HStack,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Square,
  Text,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { LightningBolt, LogoIcon } from 'ui/components/icons';
import { MainNavbar, Footer } from '@components/navigation';
import { Nav } from '@components/containers';

const features = [
  {
    name: 'Native Bitcoin',
    description:
      'Chakra UI Pro has 210+ componentsto help you develop your project faster.',
    icon: LightningBolt,
  },
  {
    name: 'Cant be evil. Not dont be evil',
    description:
      'Effortlessly create your next production-ready experience with Chakra UI Pro components.',
    icon: LightningBolt,
  },
  {
    name: 'Flexible, modular, and customizable',
    description:
      'All components support a light and a dark color mode out of the box.',
    icon: LightningBolt,
  },
];

export default function Web() {
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
      <Box as='section'>
        <Nav bg='dark.900'>
          <HStack justify='space-between' h='40px'>
            <Link href='/'>
              <LogoIcon
                alt='logo'
                url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
                cursor='pointer'
                height='35px'
              />
            </Link>
            <Box as='section' w='100%'>
              <MainNavbar />
            </Box>
          </HStack>
        </Nav>
        <Box
          as='section'
          py='8rem'
          backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
          opacity='1'
        >
          <Box as='section' color='white' h='calc(100vh - 55vh)'>
            <Box
              maxW={{ base: 'xl', md: '5xl' }}
              mx='auto'
              px={{ base: '2', md: '4' }}
            >
              <Heading
                as='h1'
                size='3xl'
                fontWeight='black'
                maxW='48rem'
                mx='auto'
                lineHeight='1.2'
                letterSpacing='tight'
                bg='light.900'
                bgClip='text'
                textAlign='center'
              >
                Web3 primitives to raise funds, govern, and take action.
              </Heading>
              <Heading
                as='h1'
                size='3xl'
                fontWeight='black'
                maxW='48rem'
                mx='auto'
                lineHeight='1.2'
                letterSpacing='tight'
                bgGradient='linear(to-b, light.900 65%, dark.500 100%)'
                bgClip='text'
                textAlign='center'
              >
                Together.
              </Heading>
            </Box>
            <Stack
              justify='center'
              direction={{ base: 'column', md: 'row' }}
              mt='10'
              mb='20'
              spacing='4'
            >
              <Button
                as='a'
                href='https://form.typeform.com/to/zfYJYLgV'
                target='_blank'
                rel='noreferrer'
                size='lg'
                variant='inverted'
                px='8'
              >
                Join our beta
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box as='section' py='24' bgGradient='linear(to-b, dark.900, dark.800)'>
          <Box
            maxW={{ base: 'xl', md: '7xl' }}
            mx='auto'
            px={{ base: '6', md: '8' }}
          >
            <Stack spacing={{ base: '12', md: '16' }}>
              <Stack
                spacing={{ base: '4', md: '5' }}
                align='center'
                textAlign='center'
              >
                <Stack spacing='3'>
                  <Heading
                    as='h1'
                    size='2xl'
                    fontWeight='thin'
                    maxW='48rem'
                    mx='auto'
                    lineHeight='1.2'
                    letterSpacing='tight'
                  >
                    Transform any wallet into a powerful web3 investment club
                  </Heading>
                </Stack>
                <Text
                  color='text-muted'
                  fontSize={{ base: 'lg', md: 'xl' }}
                  maxW='3xl'
                >
                  A bundle of 210+ ready-to-use, responsive and accessible
                  components with clever structured sourcode files.
                </Text>
              </Stack>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} columnGap={8}>
                {features.map((feature) => (
                  <Stack
                    key={feature.name}
                    spacing={{ base: '4', md: '5' }}
                    align='center'
                    textAlign='center'
                  >
                    <Square
                      size={{ base: '10', md: '12' }}
                      bg='accent'
                      color='inverted'
                      borderRadius='lg'
                    >
                      <Icon
                        as={feature.icon}
                        boxSize={{ base: '5', md: '6' }}
                      />
                    </Square>
                    <Stack spacing={{ base: '1', md: '2' }}>
                      <Text
                        fontSize={{ base: 'lg', md: 'xl' }}
                        fontWeight='medium'
                      >
                        {feature.name}
                      </Text>
                      <Text color='muted'>{feature.description}</Text>
                    </Stack>
                  </Stack>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        </Box>
        <Box
          backgroundImage='linear-gradient(#171717 1px, transparent 1px), linear-gradient(to right, #171717 1px, #111111 1px)'
          backgroundSize='20px 20px'
        >
          <Box as='section' pt='24' pb='12' overflow='hidden'>
            <Box
              maxW={{ base: 'xl', md: '7xl' }}
              mx='auto'
              px={{ base: '6', md: '8' }}
            >
              <Flex
                align='flex-start'
                direction={{ base: 'column', lg: 'row' }}
                justify='space-between'
                mb='20'
              >
                <Box flex='1' maxW={{ lg: 'lg' }} pt='6'>
                  <Heading as='h1' size='3xl' mt='8' fontWeight='black'>
                    Teams
                  </Heading>
                  <Text color='gray' mt='5' fontSize='xl'>
                    Primitive for groups, companies, nonprofits, subDAOs, and
                    early DAOs to manage resources and smart contracts.
                  </Text>
                  <Button
                    mt='8'
                    minW='14rem'
                    colorScheme='blue'
                    size='lg'
                    height='14'
                    px='8'
                    fontSize='md'
                    fontWeight='bold'
                  >
                    Get Started for free
                  </Button>
                </Box>
                <Box boxSize={{ base: '20', lg: '8' }} />
                <Image
                  pos='relative'
                  marginEnd={{ base: '0', lg: '-16rem' }}
                  w='60rem'
                  src='/images/teams.png'
                  alt='Screenshot for Form builder'
                />
              </Flex>
            </Box>
          </Box>
          <Box as='section' pt='24' pb='12' overflow='hidden'>
            <Box
              maxW={{ base: 'xl', md: '7xl' }}
              mx='auto'
              px={{ base: '6', md: '8' }}
            >
              <Flex
                align='flex-start'
                direction={{ base: 'column', lg: 'row-reverse' }}
                justify='space-between'
                mb='20'
              >
                <Box flex='1' maxW={{ lg: 'lg' }} pt='6'>
                  <Heading as='h1' size='3xl' mt='8' fontWeight='black'>
                    Clubs
                  </Heading>
                  <Text color='gray' mt='5' fontSize='xl'>
                    Membership gated primitive to raise funds, govern, and take
                    action.
                  </Text>
                  <Button
                    mt='8'
                    minW='14rem'
                    colorScheme='blue'
                    size='lg'
                    height='14'
                    px='8'
                    fontSize='md'
                    fontWeight='bold'
                  >
                    Get Started for free
                  </Button>
                </Box>
                <Box boxSize={{ base: '20', lg: '8' }} />
                <Image
                  pos='relative'
                  marginStart={{ base: '0', lg: '-16rem' }}
                  marginEnd={{ base: '-16rem', lg: '0' }}
                  w='60rem'
                  src='/images/clubs.png'
                  alt='Screenshot for Form builder'
                />
              </Flex>
            </Box>
          </Box>
          <Box as='section' pt='24' pb='12' overflow='hidden'>
            <Box
              maxW={{ base: 'xl', md: '7xl' }}
              mx='auto'
              px={{ base: '6', md: '8' }}
            >
              <Flex
                align='flex-start'
                direction={{ base: 'column', lg: 'row' }}
                justify='space-between'
                mb='20'
              >
                <Box flex='1' maxW={{ lg: 'lg' }} pt='6'>
                  <Heading as='h1' size='3xl' mt='8' fontWeight='black'>
                    DAOs
                  </Heading>
                  <Text color='gray' mt='5' fontSize='xl'>
                    Primitive for groups, companies, nonprofits, subDAOs, and
                    early DAOs to manage resources and smart contracts.
                  </Text>
                  <Button
                    mt='8'
                    minW='14rem'
                    colorScheme='blue'
                    size='lg'
                    height='14'
                    px='8'
                    fontSize='md'
                    fontWeight='bold'
                  >
                    Get Started for free
                  </Button>
                </Box>
                <Box boxSize={{ base: '20', lg: '8' }} />
                <Image
                  pos='relative'
                  marginEnd={{ base: '0', lg: '-16rem' }}
                  w='60rem'
                  src='/images/teams.png'
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
