import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from 'ui';
import { useAccount } from 'ui/components';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { ConnectButton } from 'ui/components/buttons';
import { EmptyState } from '@components/misc';
import { MainLayout } from '@components/layout';
import { useClubs } from 'ui/hooks';
import { size } from 'lodash';
import { Wrapper } from '@components/containers';
import { ClubsTable } from '@components/tables';
import { ArrowRight } from 'ui/components/icons';

export default function DAOs() {
  const { stxAddress } = useAccount();
  const { isLoading, data } = useClubs();

  if (isLoading) {
    return null;
  }

  if (stxAddress && size(data) === 0) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Box
          backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
          opacity='1'
        >
          <Container h='full' maxW='5xl'>
            <SimpleGrid columns={1} spacing='3'>
              <Stack
                spacing='4'
                h='calc(100vh - 5vh)'
                justify='center'
                align='center'
                textAlign='center'
              >
                <Heading
                  size='3xl'
                  fontWeight='thin'
                  letterSpacing='tight'
                  color='white'
                >
                  <Text
                    color='blue'
                    fontWeight='black'
                    fontSize={{ base: '7xl', md: '8xl' }}
                    bgGradient='linear(to-br, bg-primary 65%, dark.500 100%)'
                    bgClip='text'
                  >
                    Investment Clubs
                  </Text>
                </Heading>

                <Stack spacing='0'>
                  <Text
                    fontSize='2xl'
                    fontWeight='light'
                    color='text-default'
                    maxW='lg'
                  >
                    Membership gated primitive to raise funds, govern, and take
                    action.
                  </Text>
                </Stack>
                <ButtonGroup>
                  <Link href='/create'>
                    <Button
                      variant='link'
                      color='primary.900'
                      fontWeight='light'
                      fontSize={{ base: '2xl', md: '3xl' }}
                      rightIcon={<Icon as={ArrowRight} />}
                      size='lg'
                      borderColor='transparent'
                      borderBottomWidth='1px'
                      borderRadius='none'
                      _hover={{
                        borderColor: 'primary.900',
                        borderBottomWidth: '1px',
                        borderRadius: 'none',
                      }}
                    >
                      Start your club
                    </Button>
                  </Link>
                </ButtonGroup>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>
      </motion.div>
    );
  }

  if (size(data) > 0) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.25, type: 'linear' }}
      >
        <Wrapper>
          <Stack spacing='6' my='16'>
            <SectionHeader
              mb='0'
              justify={{ base: 'flex-start', md: 'space-between' }}
              align={{ base: 'flex-start', md: 'space-between' }}
              color='light.900'
            >
              <Stack spacing='3' align='space-between'>
                <Heading mt='0 !important' size='lg' fontWeight='regular'>
                  DAOs
                </Heading>
              </Stack>
            </SectionHeader>
            <Stack spacing='8' pb='16'>
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.25, type: 'linear' }}
              >
                <Stack mt='2' spacing='3'>
                  <EmptyState align='center' textAlign='center' spacing='3'>
                    <Stack spacing='1'>
                      <Heading size='md' fontWeight='light'>
                        You do not have any DAOs yet
                      </Heading>
                      <Text color='gray' maxW='md'>
                        Organize your purpose-driven community and customize
                        your DAO across web3.
                      </Text>
                    </Stack>
                    <Button variant='primary'>Create a DAO</Button>
                  </EmptyState>
                </Stack>
              </motion.div>
            </Stack>
          </Stack>
          <Stack spacing='6' my='8'>
            <SectionHeader
              mb='0'
              justify={{ base: 'flex-start', md: 'space-between' }}
              align={{ base: 'flex-start', md: 'space-between' }}
              color='light.900'
            >
              <Stack spacing='3'>
                <Heading mt='0 !important' size='lg' fontWeight='regular'>
                  Clubs
                </Heading>
              </Stack>
              <Link href='/create'>
                <Button variant='default'>Start a new club</Button>
              </Link>
            </SectionHeader>
            <Stack spacing='8' pb='16'>
              <motion.div
                variants={FADE_IN_VARIANTS}
                initial={FADE_IN_VARIANTS.hidden}
                animate={FADE_IN_VARIANTS.enter}
                exit={FADE_IN_VARIANTS.exit}
                transition={{ duration: 0.25, type: 'linear' }}
              >
                <Stack mt='2' spacing='3'>
                  <ClubsTable color='light.900' size='md' clubs={data} />
                </Stack>
              </motion.div>
            </Stack>
          </Stack>
        </Wrapper>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
      <Box
        backgroundImage='repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #171717)'
        opacity='1'
      >
        <Container h='full' maxW='3xl'>
          <Stack
            spacing='6'
            h='calc(100vh - 5vh)'
            justify='center'
            align='center'
            textAlign='center'
          >
            <Stack spacing='3' align='center'>
              <HStack py='2' px='5'>
                <Text fontSize='lg' fontWeight='light' color='white'>
                  Protocol built with{' '}
                </Text>
                <Image
                  alt='Stacks Logo'
                  src='https://assets-global.website-files.com/618b0aafa4afde65f2fe38fe/618b0aafa4afde159efe39d4_Stacks%20logo.svg'
                  w='13'
                  h='13'
                />
              </HStack>
              <Heading
                size='2xl'
                fontWeight='thin'
                letterSpacing='tight'
                color='white'
              >
                DAOs powered by
                <Text
                  color='blue'
                  fontWeight='black'
                  fontSize={{ base: '7xl', md: '9xl' }}
                  bgGradient='linear(to-br, bg-primary 65%, dark.500 100%)'
                  bgClip='text'
                >
                  Bitcoin
                </Text>
              </Heading>
            </Stack>
            <Stack spacing='0'>
              <Text
                fontSize='2xl'
                fontWeight='light'
                color='text-default'
                maxW='lg'
              >
                Invest, fund causes, build products, and more.{' '}
                <Text as='span' fontWeight='black'>
                  Together.
                </Text>
              </Text>
            </Stack>
            <HStack align='space-between' justify='center'>
              <ConnectButton variant='default' size='lg'>
                Connect to get started
              </ConnectButton>
            </HStack>
          </Stack>
        </Container>
      </Box>
    </motion.div>
  );
}

DAOs.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
