import React from 'react';
import {
  Heading,
  HStack,
  Stack,
  Table,
  TableContainer,
  Thead,
  Th,
  TableProps,
  Tbody,
  Td,
  Text,
  Tr,
} from 'ui';
import { ustxToStx, convertToken } from 'utils';
import { useVaultBalance } from 'ui/hooks';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { EmptyState } from '@components/misc';

type AssetTableProps = {
  type: string;
};

export const AssetTable = (props: TableProps & AssetTableProps) => {
  const { type } = props;

  const vaultBalance = useVaultBalance();

  const fungibleTokens: any = { ...vaultBalance?.data?.fungible_tokens };
  const nonFungibleTokens: any = {
    ...vaultBalance?.data?.balance?.non_fungible_tokens,
  };
  const fungibleTokensList: any = Object.keys(fungibleTokens).map((key) => {
    const tokenKey = key.split('::')[1];
    const tokenValue = fungibleTokens[key];
    return {
      name: tokenKey,
      balance: tokenValue?.balance,
      totalSent: tokenValue?.total_sent,
      totalReceived: tokenValue?.total_received,
    };
  });
  const nonFungibleTokensList = Object.keys(nonFungibleTokens).map((key) => {
    const tokenKey = key.split('::')[1];
    const tokenValue = nonFungibleTokens[key];
    return {
      name: tokenKey,
      balance: tokenValue?.balance,
      totalSent: tokenValue?.total_sent,
      totalReceived: tokenValue?.total_received,
    };
  });

  const stacks: any = {
    contractAddress: null,
    name: 'Stacks',
    symbol: 'STX',
    balance: vaultBalance?.data?.stx?.balance,
    totalSent: vaultBalance?.data?.stx?.total_sent,
    totalReceived: vaultBalance?.data?.stx?.total_received,
  };
  console.log(vaultBalance?.data?.stx?.balance);
  const withStacks = fungibleTokensList.concat(stacks);

  const listItems =
    type === 'fungible'
      ? fungibleTokensList.concat(withStacks)
      : nonFungibleTokensList;

  if (vaultBalance.isLoading) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.25, type: 'linear' }}
      >
        <Stack spacing='0'>
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '6', md: '6' }}
            spacing='2'
          >
            <EmptyState align='center' textAlign='center' spacing='3'>
              <Stack spacing='1'>
                <Heading size='md' fontWeight='light'>
                  Loading tokens...
                </Heading>
              </Stack>
            </EmptyState>
          </Stack>
        </Stack>
      </motion.div>
    );
  }

  if (listItems.length === 0) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.25, type: 'linear' }}
      >
        <Stack spacing='0'>
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '6', md: '6' }}
            spacing='2'
          >
            <EmptyState align='center' textAlign='center' spacing='3'>
              <Stack spacing='1'>
                <Heading size='md' fontWeight='light'>
                  No assets found
                </Heading>
              </Stack>
            </EmptyState>
          </Stack>
        </Stack>
      </motion.div>
    );
  }

  if (vaultBalance?.isError) {
    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 0.25, type: 'linear' }}
      >
        <Stack spacing='0'>
          <Stack
            px={{ base: '6', md: '6' }}
            py={{ base: '6', md: '6' }}
            spacing='2'
          >
            <EmptyState align='center' textAlign='center' spacing='3'>
              <Stack spacing='1'>
                <Heading size='md' fontWeight='light'>
                  Error loading vault
                </Heading>
              </Stack>
            </EmptyState>
          </Stack>
        </Stack>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 1, type: 'linear' }}
    >
      <TableContainer
        bg='dark.900'
        borderWidth='1px'
        borderColor='dark.500'
        borderRadius='lg'
      >
        <Table {...props}>
          <Thead color='light.900'>
            <Tr>
              <Th
                fontSize='md'
                bg='transparent'
                border='none'
                textTransform='none'
                fontWeight='light'
                color='light.900'
              >
                Name
              </Th>
              <Th
                fontSize='md'
                bg='transparent'
                border='none'
                textTransform='none'
                fontWeight='light'
                color='light.900'
              >
                Balance
              </Th>
              <Th
                fontSize='md'
                bg='transparent'
                border='none'
                textTransform='none'
                fontWeight='light'
                color='light.900'
              >
                Total sent
              </Th>
              <Th
                fontSize='md'
                bg='transparent'
                border='none'
                textTransform='none'
                fontWeight='light'
                color='light.900'
              >
                Total received
              </Th>
            </Tr>
          </Thead>
          <Tbody color='light.900'>
            {listItems.map((item: any) => {
              const { contractAddress, name, decimals } = item;
              let { balance, totalSent, totalReceived } = item;
              console.log({ item, balance, totalSent, totalReceived });
              switch (name) {
                case 'Stacks':
                  balance = ustxToStx(item.balance);
                  totalSent = ustxToStx(item.totalSent);
                  totalReceived = ustxToStx(item.totalReceived);
                  break;

                default:
                  if (contractAddress) {
                    balance = convertToken(item.balance, decimals);
                    totalSent = convertToken(item.totalSent, decimals);
                    totalReceived = convertToken(item.totalReceived, decimals);
                    break;
                  }
              }
              return (
                <Tr key={item.name}>
                  <Td fontSize='md' border='none'>
                    <HStack spacing='2' align='center'>
                      <HStack align='baseline'>
                        <Text color='light.900' fontWeight='medium'>
                          {item.name.toUpperCase()}
                        </Text>
                      </HStack>
                    </HStack>
                  </Td>
                  <Td fontSize='md' border='none'>
                    {balance}
                  </Td>
                  <Td fontSize='md' border='none'>
                    {totalSent}
                  </Td>
                  <Td fontSize='md' border='none'>
                    {totalReceived}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};
