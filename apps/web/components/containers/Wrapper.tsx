import React from 'react';
import { Container, Stack } from 'ui';

export const Wrapper = ({ children }: any) => (
  <Container maxW='5xl' px='8'>
    <Stack spacing={{ base: '8', lg: '6' }}>
      <Stack w='auto'>{children}</Stack>
    </Stack>
  </Container>
);
