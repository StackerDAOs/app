import create from 'zustand';

interface StepStore {
  maxSteps: number;
  currentStep: number;
  setStep: (step: number) => void;
}

const initialState = {
  maxSteps: 4,
  currentStep: 0,
};

export const useSteps = create<StepStore>((set) => ({
  ...initialState,
  setStep: (currentStep) => {
    set((state) => ({
      ...state,
      currentStep,
    }));
  },
}));
