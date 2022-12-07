import React from 'react';
import Link from 'next/link';
import { Button, Box, Icon, Heading, HStack, Stack, Text } from 'ui';
import { AppLayout } from '@components/layout';
import { Card } from 'ui/components/cards';
import { ConnectButton } from 'ui/components/buttons';
import { useAccount, useAuth } from 'ui/components';
import { getClubs } from 'api/clubs';
import { PlusIcon } from 'ui/components/icons';

export default function Web() {
  const [clubs, setClubs] = React.useState<any>([]);
  const { stxAddress } = useAccount();
  const { isSignedIn } = useAuth();

  React.useEffect(() => {
    const fetch = async () => {
      const data = await getClubs(stxAddress);
      setClubs(data);
    };
    fetch();
  }, [stxAddress]);

  if (isSignedIn) {
    return (
      <Stack align='center' spacing='3' h='75vh' justify='center' bg='dark.900'>
        <Stack spacing='4' align='center'>
          <Card
            bg='dark.900'
            border='1px solid'
            borderColor='dark.500'
            w='25vw'
          >
            <Box
              py={{ base: '3', md: '3' }}
              px={{ base: '6', md: '6' }}
              bg='dark.700'
              borderTopLeftRadius='lg'
              borderTopRightRadius='lg'
            >
              <HStack justify='space-between'>
                <Text fontSize='md' fontWeight='medium' color='light.900'>
                  My Clubs
                </Text>
                <Link href='/create'>
                  <Icon
                    as={PlusIcon}
                    _hover={{ cursor: 'pointer', color: 'light.500' }}
                  />
                </Link>
              </HStack>
            </Box>
            <Stack
              spacing={{ base: '0', md: '1' }}
              justify='center'
              py={{ base: '3', md: '3' }}
              px={{ base: '6', md: '6' }}
            >
              <Stack spacing='3'>
                {clubs?.length === 0 && (
                  <HStack justify='center' cursor='default'>
                    <Text fontSize='md' fontWeight='light' color='gray'>
                      No Clubs found
                    </Text>
                  </HStack>
                )}
                {clubs?.map((club: any, i: number) => (
                  <HStack justify='space-between' cursor='default'>
                    <Text fontSize='md' fontWeight='light' color='gray'>
                      {i + 1}. {club?.name}
                    </Text>
                    <Link href={`/${club?.slug}`}>
                      <Button variant='link' size='sm'>
                        View
                      </Button>
                    </Link>
                  </HStack>
                ))}
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack align='center' spacing='3' h='75vh' justify='center' bg='dark.900'>
      <Stack align='center' textAlign='center' spacing='3'>
        <Stack spacing='1'>
          <Heading size='md' fontWeight='light'>
            Connect your wallet
          </Heading>
          <Text color='gray' maxW='md'>
            Add, view, and manage your Club.
          </Text>
        </Stack>
        <ConnectButton
          variant='default'
          size='md'
          _hover={{ opacity: 0.9 }}
          _active={{ opacity: 1 }}
        />
      </Stack>
    </Stack>
  );
}

Web.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;
