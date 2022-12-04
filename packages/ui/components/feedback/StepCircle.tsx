import { Circle, Icon, SquareProps } from '@chakra-ui/react';
import { CheckIcon } from 'ui/components/icons';

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
    >
      {isCompleted ? (
        <Icon as={CheckIcon} color='inverted' boxSize='4' />
      ) : (
        <Circle bg={isActive ? 'accent' : 'border'} size='3' />
      )}
    </Circle>
  );
};
