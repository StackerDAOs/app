import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Square,
  Text,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { MainLayout } from '@components/layout';
import { LightningBolt, LogoIcon } from 'ui/components/icons';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

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
      <Box
        as='section'
        py='12.5rem'
        backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
        opacity='1'
      >
        <Box
          maxW={{ base: 'xl', md: '5xl' }}
          mx='auto'
          px={{ base: '6', md: '8' }}
        >
          <Box textAlign='center'>
            <Heading
              as='h1'
              size='3xl'
              fontWeight='thin'
              maxW='48rem'
              mx='auto'
              lineHeight='1.2'
              letterSpacing='tight'
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
              bgGradient='linear(to-br, bg-primary 65%, dark.500 100%)'
              bgClip='text'
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
      <Box as='section' py='24' bgGradient='linear(to-b, dark.700, dark.800)'>
        <Box
          maxW={{ base: 'xl', md: '6xl' }}
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
                    <Icon as={feature.icon} boxSize={{ base: '5', md: '6' }} />
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
      <Box bg='dark.900'>
        <Box as='section' pt='24' pb='12' overflow='hidden'>
          <Box
            maxW={{ base: 'xl', md: '6xl' }}
            mx='auto'
            px={{ base: '6', md: '8' }}
          >
            <Flex
              align='flex-start'
              direction={{ base: 'column', lg: 'row' }}
              justify='space-between'
              mb='20'
            >
              <Box flex='1' maxW={{ lg: '6xl' }} pt='6'>
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
            maxW={{ base: 'xl', md: '6xl' }}
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
        <Box as='section' pt='24' pb='12'>
          <Box
            maxW={{ base: 'xl', md: '6xl' }}
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
      <Container as='footer' role='contentinfo' maxW='6xl'>
        <Stack
          spacing='8'
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          py={{ base: '12', md: '16' }}
        >
          <Stack spacing={{ base: '6', md: '8' }} align='start'>
            <LogoIcon
              alt='logo'
              url='https://stackerdaos-assets.s3.us-east-2.amazonaws.com/app/stackerdaos-hiro-logo.png'
              cursor='pointer'
              height='35px'
            />
            <Text color='light.900'>
              Create beautiful websites remarkably fast.
            </Text>
          </Stack>
          <Stack
            direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
            spacing={{ base: '12', md: '8' }}
          >
            <Stack direction='row' spacing='8'>
              <Stack spacing='4' minW='36' flex='1'>
                <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                  Product
                </Text>
                <Stack spacing='3' shouldWrapChildren>
                  <Button variant='link'>Teams</Button>
                  <Button variant='link'>Investment Clubs</Button>
                  <Button variant='link'>DAOs</Button>
                </Stack>
              </Stack>
              <Stack spacing='4' minW='36' flex='1'>
                <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                  Resources
                </Text>
                <Stack spacing='3' shouldWrapChildren>
                  <Button variant='link'>Docs</Button>
                  <Button variant='link'>Github</Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing='4'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Stay up to date
              </Text>
              <Stack
                spacing='4'
                direction={{ base: 'column', sm: 'row' }}
                maxW={{ lg: '360px' }}
              >
                <Input placeholder='Enter your email' type='email' required />
                <Button variant='primary' type='submit' flexShrink={0}>
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          pt='8'
          pb='12'
          justify='space-between'
          direction={{ base: 'column-reverse', md: 'row' }}
          align='center'
        >
          <Text fontSize='sm' color='subtle'>
            &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
            reserved.
          </Text>
          <ButtonGroup variant='ghost'>
            <IconButton
              as='a'
              href='#'
              aria-label='Discord'
              icon={<FaDiscord fontSize='1.25rem' />}
            />
            <IconButton
              as='a'
              href='#'
              aria-label='GitHub'
              icon={<FaGithub fontSize='1.25rem' />}
            />
            <IconButton
              as='a'
              href='#'
              aria-label='Twitter'
              icon={<FaTwitter fontSize='1.25rem' />}
            />
          </ButtonGroup>
        </Stack>
      </Container>
    </motion.div>
  );
}

Web.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
