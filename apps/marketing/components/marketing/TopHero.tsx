import Link from 'next/link';
import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from 'ui';
import { ArrowRight } from 'ui/components/icons';

export const TopHero = (props: any) => {
  const { topHeroProps } = props;
  return (
    <Container>
      <Stack spacing='6' h='calc(100vh - 5vh)' justify='center' align='center'>
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
              bgGradient={topHeroProps.color1}
              bgClip='text'
              style={{
                WebkitTextStrokeWidth: '1px',
                WebkitTextStrokeColor: '#121416',
              }}
            >
              {topHeroProps.space}
              <Text
                as='span'
                mx='5'
                fontWeight='thin'
                bgGradient={topHeroProps.color2}
                bgClip='text'
                style={{
                  WebkitTextStrokeWidth: '0px',
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
                  bg={topHeroProps.primary900}
                  borderColor='dark.500'
                  color='light.900'
                  fontSize='xl'
                  fontWeight='medium'
                  _active={{
                    color: 'light.900',
                    bg: topHeroProps.primary900,
                    opacity: 0.9,
                  }}
                  _hover={{
                    color: 'light.900',
                    bg: topHeroProps.primary900,
                    opacity: 0.9,
                  }}
                >
                  {topHeroProps.button}
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
  );
};
