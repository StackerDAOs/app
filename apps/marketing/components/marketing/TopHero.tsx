import Link from 'next/link';
import {
  Button,
  ButtonGroup,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from 'ui';
import { ArrowRight } from 'ui/components/icons';

export const TopHero = (props: any) => {
  const { topHeroProps } = props;
  return (
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
            color={topHeroProps.color}
            fontWeight='black'
            fontSize={{ base: '7xl', md: '7xl' }}
            bgGradient='linear(to-br, secondary.900 65%, dark.500 100%)'
            bgClip='text'
          >
            {topHeroProps.title}
          </Text>
        </Heading>
        <Stack spacing='0'>
          <Text
            fontSize='2xl'
            fontWeight='light'
            color='text-default'
            maxW='lg'
          >
            {topHeroProps.description}
          </Text>
        </Stack>
        <ButtonGroup>
          <Link href={topHeroProps.link}>
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
              {topHeroProps.linkText}
            </Button>
          </Link>
        </ButtonGroup>
      </Stack>
    </SimpleGrid>
  );
};
