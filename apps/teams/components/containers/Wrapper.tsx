import React from 'react';
import { Container, Stack } from 'ui';

export const Wrapper = ({ children }: any) => (
  <Container flex='inherit' maxW={{ base: '5xl', xl: '7xl' }} py='3'>
    <Stack spacing={{ base: '8', lg: '6' }}>
      <Stack w='auto'>{children}</Stack>
    </Stack>
  </Container>
);
