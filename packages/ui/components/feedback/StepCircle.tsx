import { Circle, SquareProps } from '@chakra-ui/react';

interface RadioCircleProps extends SquareProps {
  isCompleted: boolean;
  isActive: boolean;
}

export const StepCircle = (props: RadioCircleProps) => {
  const { isCompleted, isActive } = props;
  return (
    <Circle
      size='6'
      bg={isCompleted ? 'primary.900' : isActive ? 'dark.800' : 'dark.900'}
      borderWidth={isCompleted ? '0' : isActive ? '2px' : '1px'}
      borderColor={isActive ? 'primary.900' : 'dark.500'}
      {...props}
    />
  );
};
