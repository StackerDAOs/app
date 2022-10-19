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
        {cardGridProps.map((x: any) => (
          <Box py={{ base: '2', md: '4' }} key={x.title}>
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
          <GetStartedButton
            maxW='14rem'
            bg='light.900'
            color='dark.500'
            height='14'
            px='8'
            fontSize='md'
            fontWeight='bold'
            borderRadius='9999px'
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};
