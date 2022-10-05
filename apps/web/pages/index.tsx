import Link from 'next/link';
import { Box, Button, Heading, HStack, Stack, Text } from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container, SectionHeader } from 'ui/components/layout';
import { MainLayout } from '@components/layout';
import { useClubs } from 'ui/hooks';
import { size } from 'lodash';
import { Wrapper } from '@components/containers';
// import { ClubsTable } from '@components/tables';
import { ArrowRight } from 'ui/components/icons';

export default function Web() {
  const { isLoading, data } = useClubs();

  if (isLoading) {
    return null;
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
                  {/* <ClubsTable color='light.900' size='md' clubs={data} /> */}
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
        <Container maxW='3xl'>
          <Stack
            spacing='6'
            h='calc(100vh - 5vh)'
            justify='center'
            align='center'
          >
            <Stack spacing='6' align='flex-start'>
              <HStack m='0'>
                <Text fontSize='lg' fontWeight='light' color='light.500'>
                  Protocol built with Stacks
                </Text>
              </HStack>
              <Stack spacing='0' mt='0 !important'>
                <Heading
                  fontSize={{ base: '4em', md: '6em', lg: '8em' }}
                  fontWeight='black'
                  color='dark.800'
                  style={{
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextStrokeColor: '#624AF2',
                  }}
                >
                  Clubs
                  <Text
                    as='span'
                    mx='5'
                    fontWeight='thin'
                    bgGradient='linear(to-b, primary.900 65%, dark.500 100%)'
                    bgClip='text'
                  >
                    powered by Bitcoin
                  </Text>
                </Heading>
              </Stack>
              <Text
                fontSize={{ base: '2em', md: '2em', lg: '2em' }}
                fontWeight='thin'
                color='light.500'
                maxW='2xl'
              >
                Invest, fund causes, build products, and more. Together.{' '}
              </Text>
              <Link href='/create'>
                <Button
                  variant='inverted'
                  size='lg'
                  borderRadius='3xl'
                  bg='primary.900'
                  borderColor='dark.500'
                  color='light.900'
                  fontSize='xl'
                  fontWeight='regular'
                  rightIcon={<ArrowRight />}
                  _hover={{
                    color: 'light.900',
                    bg: 'primary.900',
                    opacity: 0.9,
                  }}
                >
                  Start your club
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </motion.div>
  );
}

Web.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
