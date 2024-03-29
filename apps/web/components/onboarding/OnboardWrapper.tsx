import React from 'react';
import { Box, Stack } from 'ui';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';

type OnboardWrapperProps = {
  children: React.ReactNode;
};

export const OnboardWrapper = ({ children }: OnboardWrapperProps) => {
  const backgroundImage =
    'repeating-radial-gradient(circle at 0 0, transparent 0, #111111 11px), repeating-linear-gradient(#111111, #121416)';
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 0.8, type: 'linear' }}
    >
      <Box h={{ base: '720px' }}>
        <Stack
          display='flex'
          justify='center'
          h='calc(100vh - 7px)'
          backgroundImage={backgroundImage}
          opacity='1'
        >
          {children}
        </Stack>
      </Box>
    </motion.div>
  );
};
