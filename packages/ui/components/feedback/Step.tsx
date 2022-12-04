import { Divider, HStack, StackProps } from '@chakra-ui/react';
import { StepCircle } from './StepCircle';

interface StepProps extends StackProps {
  isCompleted: boolean;
  isActive: boolean;
  isLastStep: boolean;
}

export const Step = (props: StepProps) => {
  const { isActive, isCompleted, isLastStep, ...stackProps } = props;

  return (
    <HStack flex={isLastStep ? '0' : '1'} spacing='3' {...stackProps}>
      <StepCircle isActive={isActive} isCompleted={isCompleted} />
      {!isLastStep && (
        <Divider
          orientation='horizontal'
          borderWidth='1px'
          borderColor={isCompleted ? 'primary.900' : 'dark.500'}
        />
      )}
    </HStack>
  );
};
