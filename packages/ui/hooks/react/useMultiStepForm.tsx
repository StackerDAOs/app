import React, { ReactElement } from 'react';

export const useMultiStepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  const next = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((currentStepIndex) => currentStepIndex + 1);
    }
  };

  const back = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((currentStepIndex) => currentStepIndex - 1);
    }
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  const isFirstStep = currentStepIndex === 0;
  const canGoToNextStep = currentStepIndex < steps.length - 1;
  const isLastStep = currentStepIndex === steps.length - 1;
  const isActiveStep = (step: number) => currentStepIndex === step;

  return {
    currentStepIndex,
    steps,
    step: steps[currentStepIndex],
    isFirstStep,
    canGoToNextStep,
    isLastStep,
    isActiveStep,
    next,
    back,
    goTo,
  };
};
