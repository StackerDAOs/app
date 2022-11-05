import {
  Box,
  BoxProps,
  Icon,
  Stack,
  Square,
  Text,
  useBreakpointValue,
} from 'ui';
import { InfoIcon } from 'ui/components/icons';

interface BannerProps extends BoxProps {
  icon?: any;
  message: string;
}

export const Banner = (props: BannerProps) => {
  const { icon, message, ...rest } = props;
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box as='section' {...rest}>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={{ base: '3', md: '2' }}
      >
        <Stack
          spacing='4'
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
        >
          {!isMobile && (
            <Square size='10' bg='dark.500' borderRadius='md'>
              <Icon as={icon} color='primary.900' boxSize='6' />
            </Square>
          )}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '0.5', md: '1.5' }}
            pe={{ base: '4', sm: '0' }}
          >
            <Text fontWeight='light'>{message}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

Banner.defaultProps = {
  icon: InfoIcon,
};
