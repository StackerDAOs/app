import Link from 'next/link';
import { Button, Heading, Stack, Text } from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { AppLayout } from '@components/layout';
import { Wrapper } from '@components/containers';
import { ConnectButton } from 'ui/components/buttons';
import { useAuth } from 'ui/components';

export default function Web() {
  const { isSignedIn } = useAuth();

  return (
    <Wrapper m='0 auto' align='center'>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='flex-start'
        >
          {isSignedIn ? (
            <Stack align='center' textAlign='center' spacing='3'>
              <Stack spacing='1'>
                <Heading size='md' fontWeight='light'>
                  No teams selected{' '}
                </Heading>
                <Text color='gray' maxW='md'>
                  Add or select from the list of teams to get started.
                </Text>
              </Stack>
              <Link href='/create'>
                <Button variant='default'>Create a Team</Button>
              </Link>
            </Stack>
          ) : (
            <Stack align='center' textAlign='center' spacing='3'>
              <Stack spacing='1'>
                <Heading size='md' fontWeight='light'>
                  Connect your wallet to select a Team
                </Heading>
                <Text color='gray' maxW='md'>
                  Add, select, and search for teams.
                </Text>
              </Stack>
              <ConnectButton
                variant='default'
                size='md'
                _hover={{ opacity: 0.9 }}
                _active={{ opacity: 1 }}
              />
            </Stack>
          )}
        </Stack>
      </motion.div>
    </Wrapper>
  );
}

Web.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;
