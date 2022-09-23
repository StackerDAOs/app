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

export default function Teams() {
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
                  fontSize={{ base: '7xl', md: '7xl' }}
                  bgGradient='linear(to-br, secondary.900 65%, dark.500 100%)'
                  bgClip='text'
                >
                  StackerDAO Teams
                </Text>
              </Heading>

              <Stack spacing='0'>
                <Text
                  fontSize='2xl'
                  fontWeight='light'
                  color='text-default'
                  maxW='lg'
                >
                  Primitive for groups, companies, nonprofits, subDAOs, and
                  early DAOs to manage resources and smart contracts.
                </Text>
              </Stack>
              <ButtonGroup>
                <Link href='/create'>
                  <Button
                    variant='link'
                    color='secondary.900'
                    fontWeight='light'
                    fontSize={{ base: '2xl', md: '3xl' }}
                    rightIcon={<Icon as={ArrowRight} />}
                    size='lg'
                    borderColor='transparent'
                    borderBottomWidth='1px'
                    borderRadius='none'
                    isDisabled
                    _hover={{
                      borderColor: 'secondary.900',
                      borderBottomWidth: '1px',
                      borderRadius: 'none',
                    }}
                  >
                    Coming soon
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

Teams.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
