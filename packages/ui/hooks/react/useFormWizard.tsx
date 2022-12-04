import React, { ReactElement } from 'react';

// create type with react element as steps and title as a string
type FormWizardProps = {
  title: string;
  component: ReactElement;
};

export const useFormWizard = (steps: FormWizardProps[]) => {
  const [formValues, setFormValues] = React.useState({});
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  const setStep = React.useCallback(
    (step: unknown) => {
      const newStep = step instanceof Function ? step(currentStepIndex) : step;
      if (newStep >= 0) {
        setCurrentStepIndex(newStep);
        return;
      }
      throw new Error('Step not valid');
    },
    [currentStepIndex],
  );

  const updateFormValues = (values: any) => {
    setFormValues({ ...formValues, ...values });
  };

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
    setStep,
    formValues,
    updateFormValues,
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
