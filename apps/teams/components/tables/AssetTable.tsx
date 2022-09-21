import React from 'react';
import {
  HStack,
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

type AssetTableProps = {
  type: string;
};

export const AssetTable = (props: TableProps & AssetTableProps) => {
  const { type } = props;

  const { data } = useVaultBalance();

  const fungibleTokens: any = { ...data.fungible_tokens };
  const nonFungibleTokens: any = { ...data?.balance?.non_fungible_tokens };
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

  const listItems =
    type === 'fungible' ? fungibleTokensList : nonFungibleTokensList;

  // if (state.isLoading && isLoading) {
  //   return (
  //     <EmptyState
  //       heading={
  //         type === 'fungible' ? 'Loading assets...' : 'Loading assets...'
  //       }
  //     />
  //   );
  // }

  // if (listItems.length === 0) {
  //   return (
  //     <EmptyState
  //       heading={
  //         type === 'fungible' ? 'No coins found' : 'No collectibles found'
  //       }
  //     />
  //   );
  // }

  // if (isError) {
  //   return (
  //     <EmptyState
  //       heading={
  //         type === 'fungible' ? 'Error loading assets' : 'Error loading assets'
  //       }
  //     />
  //   );
  // }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 1, type: 'linear' }}
    >
      <TableContainer>
        <Table {...props} bg='transparent'>
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
                <Tr key={item.name} cursor='pointer'>
                  <Td fontSize='md' borderColor='dark.500'>
                    <HStack spacing='2' align='center'>
                      <HStack align='baseline'>
                        <Text color='light.900' fontWeight='medium'>
                          {item.name.toUpperCase()}
                        </Text>
                      </HStack>
                    </HStack>
                  </Td>
                  <Td fontSize='md' borderColor='dark.500'>
                    {balance}
                  </Td>
                  <Td fontSize='md' borderColor='dark.500'>
                    {totalSent}
                  </Td>
                  <Td fontSize='md' borderColor='dark.500'>
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
