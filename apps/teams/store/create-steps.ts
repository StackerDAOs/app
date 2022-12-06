import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type StepStore = {
  maxSteps: number;
  currentStep: number;
  setStep: (step: number) => void;
};

const initialState = {
  maxSteps: 6,
  currentStep: 1,
};

export const useSteps = create<StepStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setStep: (currentStep) => {
          set((state) => ({
            ...state,
            currentStep,
          }));
        },
      }),
      {
        name: 'create-club-steps',
      },
    ),
  ),
);
