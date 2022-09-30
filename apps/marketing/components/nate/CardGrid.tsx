import { Box, Stack, Container, Text, SimpleGrid, Button } from 'ui';
import * as React from 'react';

interface CardGridProps {
  cardGridProps: any;
  getStartedButton: any;
}

export const CardGrid = (props: CardGridProps) => {
  const { cardGridProps, getStartedButton } = props;
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
        {cardGridProps.map((x: any, index: any) => (
          <Box
            borderRadius='lg'
            as='section'
            py={{ base: '2', md: '4' }}
            key={index}
          >
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
          {getStartedButton}
        </Box>
      </SimpleGrid>
    </Box>
  );
};
