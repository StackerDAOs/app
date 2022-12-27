import { Circle, SquareProps } from '@chakra-ui/react';

interface RadioCircleProps extends SquareProps {
  iscompleted: boolean;
  isactive: boolean;
}

export const StepCircle = (props: RadioCircleProps) => {
  const { iscompleted: isCompleted, isactive: isActive } = props;
  return (
    <Circle
      size='4'
      bg={isCompleted ? 'primary.900' : isActive ? 'dark.500' : 'dark.900'}
      borderWidth={isCompleted ? '0' : isActive ? '2px' : '1px'}
      borderColor={isActive ? 'primary.900' : 'dark.500'}
      {...props}
    />
  );
};
