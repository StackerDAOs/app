import { Box, SimpleGrid } from 'ui';
import * as React from 'react';
import { GetStartedButton } from '@components/buttons';

interface CardGridProps {
  cardGridProps: any;
}

export const CardGrid = (props: CardGridProps) => {
  const { cardGridProps } = props;
  return (
    <Box>
      <SimpleGrid columns={1} spacing={20}>
        {cardGridProps.map((x: any, index: any) => (
          <Box py={{ base: '2', md: '4' }} key={index}>
            {x}
          </Box>
        ))}
        <Box
          borderRadius='lg'
          p={{ base: '4', md: '6' }}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <GetStartedButton />
        </Box>
      </SimpleGrid>
    </Box>
  );
};
