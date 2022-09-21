import React from 'react';
import { motion, FADE_IN_VARIANTS } from 'ui/animation';
import { AppNavbar } from '../navigation';

export const AppLayout = ({ header, children }: any) => (
  <motion.div
    variants={FADE_IN_VARIANTS}
    initial={FADE_IN_VARIANTS.hidden}
    animate={FADE_IN_VARIANTS.enter}
    exit={FADE_IN_VARIANTS.exit}
    transition={{ duration: 0.75, type: 'linear' }}
  >
    <AppNavbar />
    {header}
    {children}
  </motion.div>
);
