import {
  AccordionItem,
  AccordionButton,
  Button,
  CircularProgress,
  Icon,
  HStack,
  Spinner,
  Text,
} from 'ui';
import { CheckCircle } from 'ui/components/icons';

export const CustomAccordianItem = (props: any) => {
  const { title, isPending, hasCompleted, progressValue, children } = props;

  if (hasCompleted) {
    return (
      <AccordionItem p='2' bg='dark.700' borderColor='transparent'>
        <HStack align='center' justify='space-between'>
          <HStack align='center'>
            <Icon as={CheckCircle} fontSize='xl' color='primary.900' />
            <Text textAlign='left' fontSize='lg' fontWeight='regular'>
              <Text as='span' fontWeight='black'>
                {title}
              </Text>
            </Text>
          </HStack>
          <Button variant='dark'>View details</Button>
        </HStack>
      </AccordionItem>
    );
  }

  if (isPending) {
    return (
      <AccordionItem p='2' bg='dark.700' borderColor='transparent'>
        <HStack align='center' justify='flex-start'>
          <Spinner size='sm' color='primary.900' mr='2' />
          <Text textAlign='left' fontSize='lg' fontWeight='regular'>
            <Text as='span' fontWeight='black'>
              {title}
            </Text>{' '}
          </Text>
        </HStack>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem p='2' bg='dark.500'>
      <AccordionButton px='0'>
        <HStack align='center' justify='flex-start'>
          <CircularProgress
            value={progressValue}
            color='primary.900'
            size='32px'
          />
          <Text textAlign='left' fontSize='lg' fontWeight='regular'>
            <Text as='span' fontWeight='black'>
              {title}
            </Text>{' '}
          </Text>
        </HStack>
      </AccordionButton>
      {children}
    </AccordionItem>
  );
};
