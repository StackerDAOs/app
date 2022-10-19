import React from 'react';
import { Container, Stack } from 'ui';

export const Wrapper = ({ children }: any) => (
  <Container
    maxW={{ base: '5xl', xl: '7xl' }}
    px={{ base: '8', xl: '8' }}
    py='2'
  >
    <Stack spacing={{ base: '8', lg: '6' }}>
      <Stack w='auto'>{children}</Stack>
    </Stack>
  </Container>
);
