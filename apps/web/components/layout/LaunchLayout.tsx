import React from 'react';
import { motion, SLIDE_UP_VARIANTS } from 'ui/animation';

interface Props {
  children: React.ReactNode;
}
export const LaunchLayout = ({ children }: Props) => (
  <motion.div
    variants={SLIDE_UP_VARIANTS}
    initial={SLIDE_UP_VARIANTS.hidden}
    animate={SLIDE_UP_VARIANTS.enter}
    exit={SLIDE_UP_VARIANTS.exit}
    transition={{ duration: 0.8, type: 'linear' }}
  >
    {children}
  </motion.div>
);
