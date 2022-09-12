import { ButtonGroup, Heading, HStack, Image, Stack, Text } from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { Container } from 'ui/components/layout';
import { ConnectButton } from 'ui/components/buttons';

export default function Web() {
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.75, type: 'linear' }}
    >
      <Container display='flex' alignItems='center' h='100vh' maxW='3xl'>
        <Stack spacing='4'>
          <HStack>
            <Text fontSize='md' fontWeight='light' color='white'>
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
            fontWeight='light'
            letterSpacing='tight'
            color='white'
          >
            Investment Clubs powered by
            <Text
              color='blue'
              fontWeight='black'
              fontSize='8xl'
              bgGradient='linear(to-br, #F2A900 15%, #FFC431 50%)'
              bgClip='text'
            >
              Bitcoin
            </Text>
          </Heading>
          <Text fontSize='lg' fontWeight='light' color='gray'>
            Launch an investment club in a few clicks for just the cost of gas.
            Creating an investing DAO has never been easier.
          </Text>
          <ButtonGroup>
            <ConnectButton
              variant='inverted'
              size='lg'
              redirectOnConnect='/create'
            >
              Connect wallet
            </ConnectButton>
          </ButtonGroup>
        </Stack>
      </Container>
    </motion.div>
  );
}
