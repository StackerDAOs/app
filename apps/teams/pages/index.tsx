import React from 'react';
import Link from 'next/link';
import { Box, Button, Icon, HStack, Stack, Text } from 'ui';
import { useAccount, useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { AppLayout } from '@components/layout';
import { getTeams } from 'api/teams';
import { PlusIcon } from 'ui/components/icons';

export default function Index() {
  const [teams, setTeams] = React.useState<any>([]);
  const { isSignedIn } = useAuth();
  const { stxAddress } = useAccount();

  React.useEffect(() => {
    const fetch = async () => {
      const data = await getTeams(stxAddress);
      setTeams(data);
    };
    fetch();
  }, [isSignedIn, stxAddress]);

  return (
    <Stack align='center' justify='center' h='75vh'>
      <Card bg='dark.900' border='1px solid' borderColor='dark.500' w='25vw'>
        <Box
          py={{ base: '3', md: '3' }}
          px={{ base: '6', md: '6' }}
          bg='dark.700'
          borderTopLeftRadius='lg'
          borderTopRightRadius='lg'
        >
          <HStack justify='space-between'>
            <Text fontSize='md' fontWeight='medium' color='light.900'>
              Teams
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
            {teams?.length === 0 && (
              <HStack justify='center' cursor='default'>
                <Text fontSize='md' fontWeight='light' color='gray'>
                  No Teams found
                </Text>
              </HStack>
            )}
            {teams?.map((team: any, i: number) => (
              <HStack key={team.name} justify='space-between' cursor='default'>
                <Text fontSize='md' fontWeight='light' color='gray'>
                  {i + 1}. {team?.name}
                </Text>
                <Link href={`/${team?.slug}`}>
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
  );
}

Index.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;
