import React from 'react';
import { Stack } from 'ui';
import { useSteps } from 'ui/store';
import { motion, SLIDE_UP_VARIANTS } from 'ui/animation';
import { Step } from 'ui/components/feedback';

interface Props {
  children: React.ReactNode;
}
export const LaunchLayout = ({ children }: Props) => {
  const { maxSteps, currentStep } = useSteps();
  return (
    <motion.div
      variants={SLIDE_UP_VARIANTS}
      initial={SLIDE_UP_VARIANTS.hidden}
      animate={SLIDE_UP_VARIANTS.enter}
      exit={SLIDE_UP_VARIANTS.exit}
      transition={{ duration: 0.8, type: 'linear' }}
    >
      <Stack spacing='0' direction={{ base: 'column', md: 'row' }}>
        {[...Array(maxSteps)].map((step, id) => (
          <Step
            key={step}
            cursor='pointer'
            isActive={currentStep === id}
            isCompleted={currentStep > id}
          />
        ))}
      </Stack>
      {children}
    </motion.div>
  );
};
