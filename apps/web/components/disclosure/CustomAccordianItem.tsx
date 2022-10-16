import {
  AccordionItem,
  AccordionButton,
  Box,
  Button,
  CircularProgress,
  Icon,
  Heading,
  HStack,
  Spinner,
  Stack,
  Square,
  Text,
} from 'ui';
import { useDAO } from 'ui/hooks';
import { CheckCircle, InfoIcon } from 'ui/components/icons';
import { findExtension } from 'utils';
import { truncateAddress } from '@stacks-os/utils';
import { ExtensionModal } from '@components/overlay';

export const CustomAccordianItem = (props: any) => {
  const { title, isPending, hasCompleted, progressValue, children } = props;
  const dao = useDAO();
  const nftMembershipExtension = findExtension(
    dao.data?.extensions,
    'NFT Membership',
  );
  const governanceTokenExtension = findExtension(
    dao.data?.extensions,
    'Governance Token',
  );
  const vaultExtension = findExtension(dao.data?.extensions, 'Vault');
  const investmentClubExtension = findExtension(
    dao.data?.extensions,
    'Investment Club',
  );
  const submissionExtension = findExtension(dao.data?.extensions, 'Submission');
  const votingExtension = findExtension(dao.data?.extensions, 'Voting');

  const renderStep = (name: string) => {
    switch (name) {
      case 'Create an account':
        return (
          <>
            <Box py='8'>
              <Stack spacing={{ base: '8', md: '10' }} align='center'>
                <Stack spacing={{ base: '4', md: '6' }} textAlign='center'>
                  <Stack spacing='4'>
                    <Heading size='lg' fontWeight='black' color='light.900'>
                      {title}
                    </Heading>
                  </Stack>
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    maxW='2xl'
                    color='light.900'
                    fontWeight='light'
                  >
                    Deploying contracts can take ~ 10 minutes. In the meantime,
                    you can continue to the next step.
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Box
              borderWidth={{ base: '0', md: '1px' }}
              p={{ base: '0', md: '4' }}
              borderRadius='lg'
              bg='dark.700'
              borderColor='dark.500'
            >
              <Stack
                align='center'
                justify='space-between'
                direction={{ base: 'column', md: 'row' }}
                spacing='5'
              >
                <HStack spacing='3'>
                  <Square size='10' bg='dark.500' borderRadius='lg'>
                    <Icon as={InfoIcon} color='primary.900' boxSize='5' />
                  </Square>
                  <Box fontSize='sm'>
                    <Text color='light.900' fontWeight='medium'>
                      Core DAO
                    </Text>
                    <Text color='light.500'>
                      {truncateAddress(dao?.data?.contract_address)}
                    </Text>
                  </Box>
                </HStack>
                <Stack
                  spacing='3'
                  direction={{ base: 'column-reverse', md: 'row' }}
                >
                  <Button variant='primary' isDisabled>
                    Deployed
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </>
        );
      case 'Manage Membership':
        return (
          <>
            <Box py='8'>
              <Stack spacing={{ base: '8', md: '10' }} align='center'>
                <Stack spacing={{ base: '4', md: '6' }} textAlign='center'>
                  <Stack spacing='4'>
                    <Heading size='lg' fontWeight='black' color='light.900'>
                      {title}
                    </Heading>
                  </Stack>
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    maxW='2xl'
                    color='light.900'
                    fontWeight='light'
                  >
                    Deploying contracts can take ~ 10 minutes. In the meantime,
                    you can continue to the next step.
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Stack spacing='6'>
              <Box
                borderWidth={{ base: '0', md: '1px' }}
                p={{ base: '0', md: '4' }}
                borderRadius='lg'
                bg='dark.700'
                borderColor='dark.500'
              >
                <Stack
                  align='center'
                  justify='space-between'
                  direction={{ base: 'column', md: 'row' }}
                  spacing='5'
                >
                  <HStack spacing='3'>
                    <Square size='10' bg='dark.500' borderRadius='lg'>
                      <Icon as={InfoIcon} color='primary.900' boxSize='5' />
                    </Square>
                    <Box fontSize='sm'>
                      <Text color='light.900' fontWeight='medium'>
                        NFT Club Pass
                      </Text>
                      <Text color='light.500'>
                        {truncateAddress(
                          nftMembershipExtension?.contract_address,
                        )}
                      </Text>
                    </Box>
                  </HStack>
                  <Stack
                    spacing='3'
                    direction={{ base: 'column-reverse', md: 'row' }}
                  >
                    <Button variant='primary' isDisabled>
                      Deployed
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Box
                borderWidth={{ base: '0', md: '1px' }}
                p={{ base: '0', md: '4' }}
                borderRadius='lg'
                bg='dark.700'
                borderColor='dark.500'
              >
                <Stack
                  align='center'
                  justify='space-between'
                  direction={{ base: 'column', md: 'row' }}
                  spacing='5'
                >
                  <HStack spacing='3'>
                    <Square size='10' bg='dark.500' borderRadius='lg'>
                      <Icon as={InfoIcon} color='primary.900' boxSize='5' />
                    </Square>
                    <Box fontSize='sm'>
                      <Text color='light.900' fontWeight='medium'>
                        Governance Token
                      </Text>
                      <Text color='light.500'>
                        {truncateAddress(
                          governanceTokenExtension?.contract_address,
                        )}
                      </Text>
                    </Box>
                  </HStack>
                  <Stack
                    spacing='3'
                    direction={{ base: 'column-reverse', md: 'row' }}
                  >
                    <Button variant='primary' isDisabled>
                      Deployed
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </>
        );
      case 'Club and assets':
        return (
          <>
            <Box py='8'>
              <Stack spacing={{ base: '8', md: '10' }} align='center'>
                <Stack spacing={{ base: '4', md: '6' }} textAlign='center'>
                  <Stack spacing='4'>
                    <Heading size='lg' fontWeight='black' color='light.900'>
                      {title}
                    </Heading>
                  </Stack>
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    maxW='2xl'
                    color='light.900'
                    fontWeight='light'
                  >
                    Deploying contracts can take ~ 10 minutes. In the meantime,
                    you can continue to the next step.
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Stack spacing='6'>
              <Box
                borderWidth={{ base: '0', md: '1px' }}
                p={{ base: '0', md: '4' }}
                borderRadius='lg'
                bg='dark.700'
                borderColor='dark.500'
              >
                <Stack
                  align='center'
                  justify='space-between'
                  direction={{ base: 'column', md: 'row' }}
                  spacing='5'
                >
                  <HStack spacing='3'>
                    <Square size='10' bg='dark.500' borderRadius='lg'>
                      <Icon as={InfoIcon} color='primary.900' boxSize='5' />
                    </Square>
                    <Box fontSize='sm'>
                      <Text color='light.900' fontWeight='medium'>
                        Vault
                      </Text>
                      <Text color='light.500'>
                        {truncateAddress(vaultExtension?.contract_address)}
                      </Text>
                    </Box>
                  </HStack>
                  <Stack
                    spacing='3'
                    direction={{ base: 'column-reverse', md: 'row' }}
                  >
                    <Button variant='primary' isDisabled>
                      Deployed
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Box
                borderWidth={{ base: '0', md: '1px' }}
                p={{ base: '0', md: '4' }}
                borderRadius='lg'
                bg='dark.700'
                borderColor='dark.500'
              >
                <Stack
                  align='center'
                  justify='space-between'
                  direction={{ base: 'column', md: 'row' }}
                  spacing='5'
                >
                  <HStack spacing='3'>
                    <Square size='10' bg='dark.500' borderRadius='lg'>
                      <Icon as={InfoIcon} color='primary.900' boxSize='5' />
                    </Square>
                    <Box fontSize='sm'>
                      <Text color='light.900' fontWeight='medium'>
                        Investment Club
                      </Text>
                      <Text color='light.500'>
                        {truncateAddress(
                          investmentClubExtension?.contract_address,
                        )}
                      </Text>
                    </Box>
                  </HStack>
                  <Stack
                    spacing='3'
                    direction={{ base: 'column-reverse', md: 'row' }}
                  >
                    <Button variant='primary' isDisabled>
                      Deployed
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </>
        );
      case 'Proposal submissions & voting':
        return (
          <>
            <Box py='8'>
              <Stack spacing={{ base: '8', md: '10' }} align='center'>
                <Stack spacing={{ base: '4', md: '6' }} textAlign='center'>
                  <Stack spacing='4'>
                    <Heading size='lg' fontWeight='black' color='light.900'>
                      {title}
                    </Heading>
                  </Stack>
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    maxW='2xl'
                    color='light.900'
                    fontWeight='light'
                  >
                    Deploying contracts can take ~ 10 minutes. In the meantime,
                    you can continue to the next step.
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Stack spacing='6'>
              <Box
                borderWidth={{ base: '0', md: '1px' }}
                p={{ base: '0', md: '4' }}
                borderRadius='lg'
                bg='dark.700'
                borderColor='dark.500'
              >
                <Stack
                  align='center'
                  justify='space-between'
                  direction={{ base: 'column', md: 'row' }}
                  spacing='5'
                >
                  <HStack spacing='3'>
                    <Square size='10' bg='dark.500' borderRadius='lg'>
                      <Icon as={InfoIcon} color='primary.900' boxSize='5' />
                    </Square>
                    <Box fontSize='sm'>
                      <Text color='light.900' fontWeight='medium'>
                        Voting
                      </Text>
                      <Text color='light.500'>
                        {truncateAddress(votingExtension?.contract_address)}
                      </Text>
                    </Box>
                  </HStack>
                  <Stack
                    spacing='3'
                    direction={{ base: 'column-reverse', md: 'row' }}
                  >
                    <Button variant='primary' isDisabled>
                      Deployed
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Box
                borderWidth={{ base: '0', md: '1px' }}
                p={{ base: '0', md: '4' }}
                borderRadius='lg'
                bg='dark.700'
                borderColor='dark.500'
              >
                <Stack
                  align='center'
                  justify='space-between'
                  direction={{ base: 'column', md: 'row' }}
                  spacing='5'
                >
                  <HStack spacing='3'>
                    <Square size='10' bg='dark.500' borderRadius='lg'>
                      <Icon as={InfoIcon} color='primary.900' boxSize='5' />
                    </Square>
                    <Box fontSize='sm'>
                      <Text color='light.900' fontWeight='medium'>
                        Submission
                      </Text>
                      <Text color='light.500'>
                        {truncateAddress(submissionExtension?.contract_address)}
                      </Text>
                    </Box>
                  </HStack>
                  <Stack
                    spacing='3'
                    direction={{ base: 'column-reverse', md: 'row' }}
                  >
                    <Button variant='primary' isDisabled>
                      Deployed
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </>
        );
      default:
        return null;
    }
  };

  if (hasCompleted) {
    return (
      <AccordionItem p='2' bg='dark.900' borderColor='transparent'>
        <HStack align='center' justify='space-between'>
          <HStack align='center'>
            <Icon as={CheckCircle} fontSize='xl' color='primary.900' />
            <Text textAlign='left' fontSize='lg' fontWeight='regular'>
              <Text as='span' fontWeight='black'>
                {title}
              </Text>
            </Text>
          </HStack>
          <ExtensionModal title='View Details'>
            <Stack py={{ base: '3', md: '3' }} spacing='2'>
              {renderStep(title)}
            </Stack>
          </ExtensionModal>
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
    <AccordionItem p='2' bg='dark.700'>
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
