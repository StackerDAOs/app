import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container } from 'ui/components/layout';
import { MainLayout } from '@components/layout';
import { ArrowRight } from 'ui/components/icons';

export default function Clubs() {
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
              h='calc(100vh - 10vh)'
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

Clubs.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
