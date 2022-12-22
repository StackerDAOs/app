import React from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { Box, Icon, HStack, Stack, Spinner, Text } from 'ui';
import { useAccount, useAuth } from 'ui/components';
import { Card } from 'ui/components/cards';
import { AppLayout } from '@components/layout';
import { getTeams } from 'api/teams';
import { PlusIcon } from 'ui/components/icons';

export default function Index() {
  const { isSignedIn } = useAuth();
  const { stxAddress } = useAccount();

  const { data, isLoading } = useQuery(
    ['teams', 1, 5],
    () => getTeams(stxAddress, 5, 1),
    {
      enabled: isSignedIn,
      keepPreviousData: true,
    },
  );

  const viewPath = (team: any) => {
    if (team?.active) {
      return `/${team?.slug}`;
    }
    if (!team?.active && !!team?.bootstrap_tx_id && !!team?.activation_tx_id) {
      return `/${team?.slug}`;
    }
    return `/create/${team?.slug}`;
  };

  return (
    <Stack align='center' justify='center' h='75vh'>
      <Stack>
        <Card bg='dark.900' border='1px solid' borderColor='dark.500' w='35vw'>
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
          <Stack spacing={{ base: '0', md: '1' }} justify='center'>
            <Stack spacing='3'>
              {isLoading && (
                <HStack justify='center' cursor='default'>
                  <Spinner />
                </HStack>
              )}
              {data?.length === 0 && (
                <HStack justify='center' cursor='default' h='10vh'>
                  <Text fontSize='md' fontWeight='light' color='gray'>
                    No Teams found
                  </Text>
                </HStack>
              )}
              {data?.map((team: any, i: number) => (
                <Link href={viewPath(team)}>
                  <Box
                    key={team.name}
                    cursor='pointer'
                    _hover={{ bg: 'dark.800' }}
                    _first={{ my: '0' }}
                  >
                    <HStack
                      justify='space-between'
                      py={{ base: '3', md: '3' }}
                      px={{ base: '6', md: '6' }}
                    >
                      <Text fontSize='md' fontWeight='light' color='gray'>
                        {i + 1}. {team?.name}
                      </Text>
                      <HStack spacing='2'>
                        {team?.active ? (
                          <Text
                            fontSize='sm'
                            fontWeight='medium'
                            color='green.500'
                          >
                            Active
                          </Text>
                        ) : (
                          <Text
                            fontSize='sm'
                            fontWeight='medium'
                            color='yellow.500'
                          >
                            Pending
                          </Text>
                        )}
                      </HStack>
                    </HStack>
                  </Box>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}

Index.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;
