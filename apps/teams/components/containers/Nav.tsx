import React from 'react';
import { Box, BoxProps } from 'ui';

export const Nav = (props: BoxProps) => (
  <Box as='nav' position='fixed' w='100%' p='3' px='9' zIndex='2' {...props} />
);
