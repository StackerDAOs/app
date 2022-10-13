import React from 'react';
import {
  Box,
  BoxProps,
  Circle,
  createIcon,
  Icon,
  Stack,
  StackProps,
  SimpleGrid,
  useId,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  useStyleConfig,
} from '@chakra-ui/react';

interface RadioCardGroupProps<T> extends Omit<StackProps, 'onChange'> {
  name?: string;
  value?: T;
  defaultValue?: string;
  onChange?: (value: T) => void;
}

export const RadioCardGroup = <T extends string>(
  props: RadioCardGroupProps<T>,
) => {
  const { children, name, defaultValue, value, onChange, ...rest } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange,
  });

  const cards = React.useMemo(
    () =>
      React.Children.toArray(children)
        .filter<React.ReactElement<RadioCardProps>>(React.isValidElement)
        .map((card) => {
          return React.cloneElement(card, {
            radioProps: getRadioProps({
              value: card.props.value,
            }),
          });
        }),
    [children, getRadioProps],
  );

  return <Stack {...getRootProps(rest)}>{cards}</Stack>;
};

interface RadioCardProps extends BoxProps {
  value: string;
  radioProps?: UseRadioProps;
}

export const RadioCard = (props: RadioCardProps) => {
  const { radioProps, children, ...rest } = props;
  const { getInputProps, getCheckboxProps, getLabelProps, state } =
    useRadio(radioProps);
  const id = useId(undefined, 'radio-button');

  const styles = useStyleConfig('RadioCard', props);
  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();
  const labelProps = getLabelProps();
  return (
    <Box
      as='label'
      cursor='pointer'
      borderRadius='lg'
      borderWidth='1px'
      bg={state.isChecked ? 'dark.500' : 'dark.900'}
      borderColor={state.isChecked ? 'primary.900' : 'dark.500'}
      {...labelProps}
      sx={{
        '.focus-visible + [data-focus]': {
          boxShadow: 'outline',
          zIndex: 1,
        },
      }}
    >
      <input {...inputProps} aria-labelledby={id} />
      <Box sx={styles} {...checkboxProps} {...rest}>
        <Stack direction='row'>
          <Box flex='1'>{children}</Box>
        </Stack>
      </Box>
    </Box>
  );
};

export const CheckIcon = createIcon({
  displayName: 'CheckIcon',
  viewBox: '0 0 12 10',
  path: (
    <polyline
      fill='none'
      strokeWidth='2px'
      stroke='currentColor'
      strokeDasharray='16px'
      points='1.5 6 4.5 9 10.5 1'
    />
  ),
});
