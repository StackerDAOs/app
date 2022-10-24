import React from 'react';
import { Box, BoxProps } from 'ui';

export const Nav = (props: BoxProps) => (
  <Box
    as='nav'
    position='fixed'
    w='100%'
    py='3'
    px='12'
    zIndex='2'
    {...props}
  />
);
