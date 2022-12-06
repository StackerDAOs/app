import React from 'react';
import { Container } from 'ui';

export const Wrapper = ({ children }: any) => (
  <Container flex='inherit' maxW={{ base: '4xl', xl: '5xl' }} pt='3' pb='6'>
    {children}
  </Container>
);
