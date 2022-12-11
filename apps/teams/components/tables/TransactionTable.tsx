import Link from 'next/link';
import {
  HStack,
  Icon,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Avatar from 'boring-avatars';
import { truncateAddress } from '@stacks-os/utils';
import { ExternalLinkIcon } from 'ui/components/icons';
import { getExplorerLink } from 'utils';

type Transaction = {
  creator: string;
  txId: string;
  status: string;
  blockHeight: string;
};

interface TransactionTableProps extends TableProps {
  transactions: Transaction[];
}

export const TransactionTable = (props: TransactionTableProps) => {
  const { transactions } = props;
  const statusLabel = (status: string) => {
    switch (status) {
      case 'success':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  return (
    <Table {...props}>
      <Thead>
        <Tr bg='dark.700' borderColor='dark.500'>
          <Th>Creator</Th>
          <Th>TX</Th>
          <Th>Status</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {transactions?.length > 0 ? (
          transactions?.map((transaction) => (
            <Tr key={transaction.txId}>
              <Td>
                <HStack spacing='2'>
                  <Avatar
                    size={15}
                    name={transaction.creator}
                    variant='beam'
                    colors={['#eb00ff', '#7301fa', '#624AF2']}
                  />
                  <Text fontWeight='medium'>
                    {truncateAddress(transaction.creator)}
                  </Text>
                </HStack>
              </Td>

              <Td>
                <Text fontWeight='medium'>
                  {truncateAddress(transaction.txId)}
                </Text>
              </Td>
              <Td>
                <Text
                  fontWeight='medium'
                  color={
                    transaction.status === 'success'
                      ? 'primary.500'
                      : 'yellow.500'
                  }
                >
                  {statusLabel(transaction.status)}
                </Text>
              </Td>
              <Td>
                <HStack>
                  <Link
                    href={getExplorerLink(transaction.txId)}
                    target='_blank'
                  >
                    <Text color='gray' fontWeight='medium'>
                      View on explorer
                    </Text>
                  </Link>
                  <Icon as={ExternalLinkIcon} color='gray' />
                </HStack>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={5}>
              <Text textAlign='center' color='gray'>
                No transactions found
              </Text>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};
