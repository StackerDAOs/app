import React from 'react';
import { Box, BoxProps } from 'ui';

export const Nav = (props: BoxProps) => (
  <Box as='nav' w='100%' py='3' zIndex='2' {...props} />
);
