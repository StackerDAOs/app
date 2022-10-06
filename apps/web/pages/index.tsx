import Link from 'next/link';
import { Box, Button, ButtonGroup, Heading, HStack, Stack, Text } from 'ui';
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
        <Container>
          <Stack
            spacing='6'
            h='calc(100vh - 5vh)'
            justify='center'
            align='center'
          >
            <Stack spacing='6' align='flex-start'>
              <HStack m='0' px='2'>
                <Text fontSize='lg' fontWeight='light' color='light.500'>
                  Protocol built with Stacks
                </Text>
              </HStack>
              <Stack spacing='0' mt='0 !important'>
                <Heading
                  fontSize={{ base: '4em', md: '6em', lg: '8em' }}
                  fontWeight='black'
                  bgGradient='linear(to-b, primary.900 65%, dark.500 100%)'
                  bgClip='text'
                  style={{
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextStrokeColor: '#121416',
                  }}
                >
                  Clubs
                  <Text
                    as='span'
                    mx='5'
                    fontWeight='thin'
                    bgGradient='linear(to-b, light.900 25%, primary.900 100%)'
                    bgClip='text'
                    style={{
                      WebkitTextStrokeWidth: '1px',
                      WebkitTextStrokeColor: '#121416',
                    }}
                  >
                    powered by Bitcoin
                  </Text>
                </Heading>
              </Stack>
              <Stack spacing='8'>
                <Text
                  fontSize={{ base: '1.5em', lg: '1.75em' }}
                  fontWeight='light'
                  color='light.900'
                  px='2'
                >
                  Invest, fund causes, build products, and more. Together.{' '}
                </Text>
                <ButtonGroup px='2' spacing='6'>
                  <Link href='/create'>
                    <Button
                      variant='inverted'
                      size='lg'
                      borderRadius='3xl'
                      bg='primary.900'
                      borderColor='dark.500'
                      color='light.900'
                      fontSize='xl'
                      fontWeight='medium'
                      _active={{
                        color: 'light.900',
                        bg: 'primary.900',
                        opacity: 0.9,
                      }}
                      _hover={{
                        color: 'light.900',
                        bg: 'primary.900',
                        opacity: 0.9,
                      }}
                    >
                      Create Club
                    </Button>
                  </Link>
                  <Button
                    variant='link'
                    size='lg'
                    color='light.900'
                    fontWeight='medium'
                    fontSize='xl'
                    rightIcon={<ArrowRight />}
                    _active={{
                      color: 'light.500',
                      opacity: 0.9,
                    }}
                    _hover={{
                      color: 'light.500',
                    }}
                  >
                    Read docs
                  </Button>
                </ButtonGroup>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </motion.div>
  );
}

Web.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
