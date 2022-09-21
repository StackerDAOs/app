import React from 'react';
import Link from 'next/link';
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
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

type ClubsTableProps = {
  clubs: any[] | undefined;
};

export const ClubsTable = (props: TableProps & ClubsTableProps) => {
  const { clubs } = props;

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
                Club name
              </Th>
              <Th
                fontSize='md'
                bg='transparent'
                border='none'
                textTransform='none'
                fontWeight='light'
                color='light.900'
              >
                Total deposits
              </Th>
              <Th
                fontSize='md'
                bg='transparent'
                border='none'
                textTransform='none'
                fontWeight='light'
                color='light.900'
              >
                Members
              </Th>
            </Tr>
          </Thead>
          <Tbody color='light.900'>
            {clubs?.map((club: any) => (
              <Link href={`/d/${club.slug}`} key={club.id}>
                <Tr key={club.name} cursor='pointer'>
                  <Td fontSize='md' borderColor='dark.500'>
                    <HStack spacing='2' align='center'>
                      <HStack align='baseline'>
                        <Text color='light.900' fontWeight='medium'>
                          {club.name}
                        </Text>
                      </HStack>
                    </HStack>
                  </Td>
                  <Td fontSize='md' borderColor='dark.500'>
                    900 STX
                  </Td>
                  <Td fontSize='md' borderColor='dark.500'>
                    5
                  </Td>
                </Tr>
              </Link>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};
