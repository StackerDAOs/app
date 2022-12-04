import {
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
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
const transactions = [
  {
    id: '1',
    creator: 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE',
    status: 'confirmed',
    txId: '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
    timestamp: 'christian@chakra-ui.com',
  },
  {
    id: '2',
    creator: 'SP5XKKN4RPV69NN1PHFDNX3TYKXT7A1PVDQ1AR8TC',
    status: 'pending',
    txId: '0x1ceb5cb57c4d4e2b98b2632202',
    timestamp: 'kent@chakra-ui.com',
  },
  {
    id: '3',
    creator: 'SP1YV3VC6GM1WF215SDHP0MESQ3BNXHB1N8TPG9G1',
    status: 'pending',
    txId: '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
    timestamp: 'prosper@chakra-ui.com',
  },
  {
    id: '4',
    creator: 'SP4YV3VC6GM1WF215SDHP0MESQ3BNXHB1N8TPG9G1',
    status: 'confirmed',
    txId: '0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f',
    timestamp: 'ryan@chakra-ui.com',
  },
  {
    id: '5',
    creator: 'SP2YV3VC6GM1WF215SDHP0MESQ3BNXHB1N8TPG9G1',
    status: 'confirmed',
    txId: '0x8f8221afbb33998d8584a2b05749ba73c37a938a',
    timestamp: 'segun@chakra-ui.com',
  },
];

export const TransactionTable = (props: TableProps) => (
  <Table {...props}>
    <Thead>
      <Tr bg='dark.700' borderColor='dark.500'>
        <Th>Name</Th>
        <Th>Transaction ID</Th>
        <Th>Status</Th>
        <Th>Timestamp</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      {transactions.map((transaction) => (
        <Tr key={transaction.id}>
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
            <Text fontWeight='medium'>{truncateAddress(transaction.txId)}</Text>
          </Td>
          <Td>
            <Text fontWeight='medium'>{transaction.timestamp}</Text>
          </Td>
          <Td>
            <Badge
              size='sm'
              fontWeight='medium'
              color={
                transaction.status === 'confirmed' ? 'primary.900' : 'light.900'
              }
              bg='dark.500'
              alignSelf='start'
              py='1'
              px='3'
              borderRadius='3xl'
            >
              {transaction.status}
            </Badge>
          </Td>
          <Td>
            <HStack>
              <Text color='gray' fontWeight='medium'>
                View on explorer
              </Text>
              <Icon as={ExternalLinkIcon} color='gray' />
            </HStack>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
