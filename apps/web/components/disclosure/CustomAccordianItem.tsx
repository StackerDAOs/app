import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  CircularProgress,
  Icon,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from 'ui';
import { CheckCircle, InfoIcon } from 'ui/components/icons';
import {
  DepositButton,
  DeployBootstrapButton,
  InitializeClubButton,
  DeployNFTButton,
  DeployGovernanceTokenButton,
  DeployVaultButton,
  DeployICButton,
  DeploySubmissionButton,
  DeployVotingButton,
} from 'ui/components/buttons';
import { useDAO } from 'ui/hooks';
import { findExtension } from 'utils';

export const CustomAccordianItem = (props: any) => {
  const { title, isPending, hasCompleted, progressValue, children } = props;
  const dao = useDAO();
  const hasExtension = (extension: string) =>
    findExtension(dao.data?.extensions, extension);
  const nftExtension = findExtension(dao.data?.extensions, 'NFT Membership');
  const governanceExtension = findExtension(
    dao.data?.extensions,
    'Governance Token',
  );
  const vaultExtension = findExtension(dao.data?.extensions, 'Vault');
  const investmentClubExtension = findExtension(
    dao.data?.extensions,
    'Investment Club',
  );
  const votingExtension = findExtension(dao.data?.extensions, 'Voting');
  const onFinish = () => {
    console.log('onFinish');
  };
  if (hasCompleted) {
    return (
      <>
        <AccordionItem p='2' bg='dark.700' borderColor='transparent'>
          <HStack align='center' justify='flex-start'>
            <Icon as={CheckCircle} fontSize='xl' color='primary.900' />
            <Text textAlign='left' fontSize='lg' fontWeight='regular'>
              <Text as='span' fontWeight='black'>
                {title}
              </Text>
            </Text>
          </HStack>
        </AccordionItem>
      </>
    );
  }

  if (isPending) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <AccordionItem p='2' bg='dark.500'>
        <AccordionButton px='0'>
          <HStack align='center' justify='flex-start'>
            <CircularProgress
              value={progressValue}
              color='primary.900'
              size='32px'
            ></CircularProgress>
            <Text textAlign='left' fontSize='lg' fontWeight='regular'>
              <Text as='span' fontWeight='black'>
                {title}
              </Text>{' '}
            </Text>
          </HStack>
        </AccordionButton>
        {children}
      </AccordionItem>
    </>
  );
};
