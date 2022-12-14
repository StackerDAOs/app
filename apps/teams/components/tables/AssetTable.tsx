import React from 'react';
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

type Asset = {
  name: string;
  symbol: string;
  address: string;
  amount: string;
};

interface AssetTableProps extends TableProps {
  assets: Asset[] | undefined;
}

export const AssetTable = (props: AssetTableProps) => {
  const { assets } = props;

  return (
    <Table {...props}>
      <Thead>
        <Tr bg='dark.700' borderColor='dark.500'>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th>Address</Th>
          <Th>Amount</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {assets && assets?.length > 0 ? (
          assets?.map((asset) => (
            <Tr key={asset.symbol}>
              <Td>
                <HStack spacing='2'>
                  <Avatar
                    size={15}
                    name={asset.address}
                    variant='beam'
                    colors={['#eb00ff', '#7301fa', '#624AF2']}
                  />
                  <Text fontWeight='medium'>
                    {truncateAddress(asset.address)}
                  </Text>
                </HStack>
              </Td>

              <Td>
                <Text fontWeight='medium'>{truncateAddress(asset.name)}</Text>
              </Td>
              <Td>
                <Text fontWeight='medium'>{asset.symbol}</Text>
              </Td>
              <Td>
                <Text fontWeight='medium'>{asset.name}</Text>
              </Td>
              <Td>
                <HStack>
                  <Link href={getExplorerLink(asset.address)} target='_blank'>
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
                No assets found
              </Text>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};
